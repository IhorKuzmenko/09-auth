import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { parse } from "cookie";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const apiRes = await api.post("auth/login", body);

    const setCookie = apiRes.headers["set-cookie"];

    if (setCookie) {
      const cookieStore = await cookies(); 

      const parsedCookies = parse(setCookie.join(";"));

      if (parsedCookies.accessToken) {
        cookieStore.set("accessToken", parsedCookies.accessToken, {
          httpOnly: true,
          path: "/",
        });
      }

      if (parsedCookies.refreshToken) {
        cookieStore.set("refreshToken", parsedCookies.refreshToken, {
          httpOnly: true,
          path: "/",
        });
      }
    }

    return NextResponse.json(apiRes.data);
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data || "Request failed" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}