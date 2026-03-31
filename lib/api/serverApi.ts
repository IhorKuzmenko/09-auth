// lib/api/serverApi.ts
import axios from "axios";
import { cookies } from "next/headers";
import type { Note } from "../../types/note";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const serverApi = axios.create({ baseURL });

// Получаем cookie для серверного запроса
export const getCookieHeader = async (): Promise<string> => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  return allCookies.map((c: { name: string; value: string }) => `${c.name}=${c.value}`).join("; ");
};

// ------------------------------
// Notes
export const fetchNotesServer = async (
  page: number,
  perPage: number,
  search = "",
  tag?: string
): Promise<{ notes: Note[]; totalPages: number }> => {
  const cookieHeader = await getCookieHeader();
  const response = await serverApi.get("/notes", {
    params: { page, perPage, search, tag },
    headers: { cookie: cookieHeader },
  });
  return response.data;
};

// ------------------------------
// Session
export const refreshSession = async (refreshToken: string) => {
  const response = await serverApi.post(
    "/auth/refresh",
    { refreshToken },
    {
      headers: { cookie: `refreshToken=${refreshToken}` },
    }
  );
  return response.data; // { accessToken, refreshToken }
};