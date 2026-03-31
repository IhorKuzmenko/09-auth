// lib/api/clientApi.ts
import axios from "axios";
import type { Note } from "../../types/note";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const clientApi = axios.create({ baseURL });

export const fetchNotesClient = async (
  page: number,
  perPage: number,
  search = "",
  tag?: string
): Promise<{ notes: Note[]; totalPages: number }> => {
  const response = await clientApi.get("/notes", {
    params: { page, perPage, search, tag },
  });
  return response.data;
};