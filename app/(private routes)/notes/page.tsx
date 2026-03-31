"use client";

import { useQuery } from "@tanstack/react-query";
import { getNotes } from "@/lib/api/clientApi";
import NotesList from "../../../components/NoteList/NoteList";
import type { Note } from "@/types/note";
import type { AxiosResponse } from "axios";

export default function NotesPage() {
  const { data: notesResponse, isLoading, error } = useQuery<
    AxiosResponse<{ data: Note[] }>,
    Error
  >({
    queryKey: ["notes"],
    queryFn: () => getNotes(),
  });

  const notes = notesResponse?.data.data ?? [];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading notes</p>;

  return <NotesList notes={notes} />;
}