import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

interface CookieOptions {
  path?: string;
  maxAge?: number;
  expires?: Date;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "lax" | "strict" | "none";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiRes = await api.post("auth/login", body);

   
    const response = NextResponse.json(apiRes.data, { status: apiRes.status });

  
    const setCookieHeaders = apiRes.headers["set-cookie"];
    if (setCookieHeaders) {
      const cookieArray = Array.isArray(setCookieHeaders)
        ? setCookieHeaders
        : [setCookieHeaders];

      cookieArray.forEach((cookieStr) => {
        const [nameValue, ...rest] = cookieStr.split(";");
        const [name, value] = nameValue.split("=");

        const options: CookieOptions = {};

        rest.forEach((opt) => {
          const [k, v] = opt.trim().split("=");
          const key = k.toLowerCase();
          if (key === "path") options.path = v;
          else if (key === "max-age") options.maxAge = Number(v);
          else if (key === "expires") options.expires = new Date(v);
          else if (key === "httponly") options.httpOnly = true;
          else if (key === "secure") options.secure = true;
          else if (key === "samesite") options.sameSite = (v?.toLowerCase() as "lax" | "strict" | "none") || "lax";
        });

        response.cookies.set(name, value, options);
      });
    }

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
        { status: error.response?.status ?? 500 }
      );
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}