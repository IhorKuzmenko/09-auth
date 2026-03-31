import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const hasCookie = request.cookies.getAll().length > 0;

  const isAuth =
    request.nextUrl.pathname.startsWith("/sign-in") ||
    request.nextUrl.pathname.startsWith("/sign-up");

  const isPrivate =
    request.nextUrl.pathname.startsWith("/profile") ||
    request.nextUrl.pathname.startsWith("/notes");

  if (!hasCookie && isPrivate) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (hasCookie && isAuth) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}