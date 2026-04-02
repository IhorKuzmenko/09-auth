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

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  let isAuthenticated = false;
  let response = NextResponse.next();

  if (accessToken) {
    try {
      await getMe();
      isAuthenticated = true;
    } catch {
      // токен протух — нічого не робимо
    }
  }

 
  if (!isAuthenticated && refreshToken) {
    try {
      const res = await refreshSession(refreshToken);

      const setCookie = res.headers["set-cookie"];

      if (setCookie) {
        const cookiesArray = Array.isArray(setCookie)
          ? setCookie
          : [setCookie];

        response = NextResponse.next();

        cookiesArray.forEach((cookie) => {
          response.headers.append("set-cookie", cookie);
        });

        isAuthenticated = true;
      }
    } catch {
      // refresh не вдався
    }
  }

  if (isPrivateRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }


  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}