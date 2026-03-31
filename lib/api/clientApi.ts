
import axios from "axios";
import type { Note } from "../../types/note";

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