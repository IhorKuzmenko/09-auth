// lib/api.ts
import axios from "axios";
import type { Note, CreateNoteRequest } from "../types/note";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  withCredentials: true,
});

export const login = (data: { email: string; password: string }) =>
  api.post("/auth/login", data);

export const register = (data: { email: string; password: string }) =>
  api.post("/auth/register", data);

export const logout = () => api.post("/auth/logout");

export const checkSession = () => api.get("/auth/session");

export const getMe = () => api.get("/users/me");

export const updateMe = (data: { username: string }) =>
  api.patch("/users/me", data);

const BASE_URL = "https://notehub-public.goit.study/api";
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${token}` },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (page: number, perPage: number, search = "", tag?: string) => {
  const response = await publicApi.get<FetchNotesResponse>("/notes", {
    params: { page, perPage, search, tag },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await publicApi.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (note: CreateNoteRequest): Promise<Note> => {
  const response = await publicApi.post<Note>("/notes", note);
  return response.data;
};


export const deleteNote = async (id: string): Promise<void> => {
  await publicApi.delete(`/notes/${id}`);
};