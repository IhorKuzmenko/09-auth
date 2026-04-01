// lib/api/clientApi.ts
import { api } from "./api";
import type { Note } from "../../types/note";
import type { User } from "../../types/user";

// Тип ответа для списка нот
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

// ------------------------------
// Notes
export const fetchNotesClient = async (
  page: number,
  perPage: number,
  search = "",
  tag?: string
): Promise<FetchNotesResponse> => {
  const response = await api.get("/notes", {
    params: { page, perPage, search, tag },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get(`/notes/${id}`);
  return response.data;
};

// ------------------------------
// Auth
export const login = async (data: { email: string; password: string }) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const register = async (data: { email: string; password: string }) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const checkSession = async () => {
  const response = await api.get("/auth/session");
  return response.data;
};

export const getMe = async (): Promise<User> => {
  const response = await api.get("/users/me");
  return response.data;
};