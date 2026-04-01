// app/api/auth/session/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

function logErrorResponse(errorObj: unknown): void {
  const green = '\x1b[32m';
  const yellow = '\x1b[33m';
  const reset = '\x1b[0m';

  console.log(`${green}> ${yellow}Error Response Data:${reset}`);
  console.dir(errorObj, { depth: null, colors: true });
}

export async function GET() {
  try {
    const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

    if (!token) {
      return NextResponse.json({ success: false, message: "No token configured" }, { status: 500 });
    }

    const response = await axios.get("https://notehub-public.goit.study/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200 && response.data) {
      return NextResponse.json({ success: true, user: response.data }, { status: 200 });
    }

    return NextResponse.json({ success: false }, { status: 200 });

  } catch (error) {
    logErrorResponse(error);
    return NextResponse.json({ success: false }, { status: 200 });
  }
}