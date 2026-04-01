// proxy.ts  (в корені проєкту)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getMe } from "@/lib/api/serverApi";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isPrivateRoute = 
    pathname.startsWith("/profile") || 
    pathname.startsWith("/notes");

  const isAuthRoute = 
    pathname === "/sign-in" || 
    pathname === "/sign-up";

  // Якщо користувач заходить на приватний маршрут
  if (isPrivateRoute) {
    try {
      await getMe();           // перевіряємо чи авторизований через серверний запит
      return NextResponse.next();
    } catch {
      // Не авторизований → перенаправляємо на логін
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  // Якщо авторизований користувач заходить на сторінки логіну/реєстрації
  if (isAuthRoute) {
    try {
      await getMe();
      // Вже авторизований → перенаправляємо на профіль
      return NextResponse.redirect(new URL("/profile", request.url));
    } catch {
      // Не авторизований → дозволяємо зайти
      return NextResponse.next();
    }
  }

  // Для всіх інших сторінок — нічого не робимо
  return NextResponse.next();
}