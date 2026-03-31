// proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { refreshSession } from "@/lib/api/serverApi";

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isAuth =
    request.nextUrl.pathname.startsWith("/sign-in") ||
    request.nextUrl.pathname.startsWith("/sign-up");

  const isPrivate =
    request.nextUrl.pathname.startsWith("/profile") ||
    request.nextUrl.pathname.startsWith("/notes");

  // 1️⃣ Спроба поновлення сесії
  if (!accessToken && refreshToken) {
    try {
      const tokens = await refreshSession(refreshToken);
      const response = NextResponse.next();

      // Оновлюємо куки
      response.cookies.set("accessToken", tokens.accessToken, { httpOnly: true, path: "/" });
      response.cookies.set("refreshToken", tokens.refreshToken, { httpOnly: true, path: "/" });

      return response;
    } catch {
      // refreshToken не дійсний
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  // 2️⃣ Редірект неавтентифікованих користувачів з приватних маршрутів
  if (!accessToken && isPrivate) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // 3️⃣ Редірект авторизованих користувачів з /sign-in або /sign-up
  if (accessToken && isAuth) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 4️⃣ Пропускаємо запит далі
  return NextResponse.next();
}