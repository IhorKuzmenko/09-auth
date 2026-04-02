import { api } from "@/lib/api/api"; // 
import { cookies } from "next/headers";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";

export const getCookieHeader = async (): Promise<string> => {
  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
};

// ====================== NOTES ======================

export const fetchNotes = async (
  page: number,
  perPage: number,
  search = "",
  tag?: string
): Promise<{ notes: Note[]; totalPages: number }> => {
  const cookieHeader = await getCookieHeader();

  const res = await api.get("/notes", {
    params: { page, perPage, search, tag },
    headers: { cookie: cookieHeader },
  });

  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieHeader = await getCookieHeader();

  const res = await api.get(`/notes/${id}`, {
    headers: { cookie: cookieHeader },
  });

  return res.data;
};

// ====================== USERS ======================

export const getMe = async (): Promise<User> => {
  const cookieHeader = await getCookieHeader();

  const res = await api.get<User>("/users/me", {
    headers: { cookie: cookieHeader },
  });

  return res.data;
};

// ====================== AUTH ======================

export const checkSession = async () => {
  const cookieHeader = await getCookieHeader();

  return api.get("/auth/session", {
    headers: { cookie: cookieHeader },
  });
};

// 👉 можно оставить, но аккуратно оформить
export const refreshSession = async (refreshToken: string) => {
  return api.post(
    "/auth/refresh",
    {},
    {
      headers: {
        cookie: `refreshToken=${refreshToken}`, // ✅ привели к одному стилю
      },
    }
  );
};