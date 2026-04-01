import axios from 'axios';
import { cookies } from 'next/headers';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';

const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
});

export const getCookieHeader = async (): Promise<string> => {
  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');
};

// ====================== NOTES ======================
export const fetchNotes = async (
  page: number,
  perPage: number,
  search = '',
  tag?: string
): Promise<{ notes: Note[]; totalPages: number }> => {
  const cookieHeader = await getCookieHeader();
  const res = await serverApi.get('/notes', {
    params: { page, perPage, search, tag },
    headers: { cookie: cookieHeader },
  });
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieHeader = await getCookieHeader();
  const res = await serverApi.get(`/notes/${id}`, {
    headers: { cookie: cookieHeader },
  });
  return res.data;
};

// ====================== USERS ======================
export const getMe = async (): Promise<User> => {
  const cookieHeader = await getCookieHeader();
  const res = await serverApi.get<User>('/users/me', {
    headers: { cookie: cookieHeader },
  });
  return res.data;
};

// ====================== AUTH ======================

export const checkSession = async () => {
  const cookieHeader = await getCookieHeader();

  const res = await serverApi.get("/auth/session", {
    headers: {
      cookie: cookieHeader,
    },
  });

  return res;
};

export const refreshSession = async (refreshToken: string) => {
  const res = await serverApi.post(
    "/auth/refresh",
    {},
    {
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
    }
  );

  return res;
};

