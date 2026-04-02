// app/middleware/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getMe, refreshSession } from "@/lib/api/serverApi"; 

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isPrivateRoute =
    pathname.startsWith("/profile") ||
    pathname.startsWith("/notes");

  const isAuthRoute =
    pathname === "/sign-in" ||
    pathname === "/sign-up";

  let accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  let isAuthenticated = false;
  let response = NextResponse.next();

  // ----------------------
  // Проверка accessToken через getMe()
  // ----------------------
  if (accessToken) {
    try {
      await getMe(); // токен уже берется из cookies на сервере
      isAuthenticated = true;
    } catch {
      isAuthenticated = false; // токен не валидный
    }
  }

  // ----------------------
  // Попытка обновления через refreshToken
  // ----------------------
  if (!isAuthenticated && refreshToken) {
    try {
      const res = await refreshSession(refreshToken); // возвращает AxiosResponse
      const newAccessToken = res.data.accessToken;
      const newRefreshToken = res.data.refreshToken;

      if (newAccessToken) {
        accessToken = newAccessToken;
        isAuthenticated = true;

        // редирект, чтобы новые куки точно дошли до клиента
        response = NextResponse.redirect(request.url);

        // устанавливаем новые куки
        response.cookies.set("accessToken", newAccessToken, { httpOnly: true, path: "/" });
        if (newRefreshToken) {
          response.cookies.set("refreshToken", newRefreshToken, { httpOnly: true, path: "/" });
        }
      }
    } catch {
      // refresh не удался, оставляем пользователя неавторизованным
    }
  }

  // ----------------------
  // Редирект для приватных маршрутов
  // ----------------------
  if (isPrivateRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // ----------------------
  // Редирект для аутентификационных маршрутов
  // ----------------------
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}