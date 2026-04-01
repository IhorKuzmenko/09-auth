import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { refreshSession } from "@/lib/api/serverApi";
import { cookies } from "next/headers";

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies(); 

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isAuth =
    request.nextUrl.pathname.startsWith("/sign-in") ||
    request.nextUrl.pathname.startsWith("/sign-up");

  const isPrivate =
    request.nextUrl.pathname.startsWith("/profile") ||
    request.nextUrl.pathname.startsWith("/notes");

  
  if (!accessToken && refreshToken) {
    try {
      const tokens = await refreshSession(refreshToken);
      const response = NextResponse.next();

      response.cookies.set("accessToken", tokens.accessToken, {
        httpOnly: true,
        path: "/",
      });

      response.cookies.set("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        path: "/",
      });

      return response;
    } catch {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  
  if (!accessToken && isPrivate) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  
  if (accessToken && isAuth) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}