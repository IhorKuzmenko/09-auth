// lib/api/serverApi.ts
import axios from "axios";
import { cookies } from "next/headers";
import type { Note } from "../../types/note";
import type { User } from "../../types/user"; 

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";
export const serverApi = axios.create({ baseURL });

export const getCookieHeader = async (): Promise<string> => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  return allCookies.map(c => `${c.name}=${c.value}`).join("; ");
};

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

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieHeader = await getCookieHeader();
  const response = await serverApi.get(`/notes/${id}`, {
    headers: { cookie: cookieHeader },
  });
  return response.data;
};

export const checkSession = async () => {
  const cookieHeader = await getCookieHeader();
  return serverApi.get("/auth/session", { headers: { cookie: cookieHeader } });
};

export const getMe = async (): Promise<User> => {
  const cookieHeader = await getCookieHeader();
  const response = await serverApi.get("/users/me", { headers: { cookie: cookieHeader } });
  return response.data;
};

export const refreshSession = async (refreshToken: string) => {
  const response = await serverApi.post("/auth/refresh", { refreshToken }, {
    headers: { cookie: `refreshToken=${refreshToken}` },
  });
  return response.data;
};