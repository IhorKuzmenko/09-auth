"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/api"; // <-- исправлено
import NotesList from "../../../components/NoteList/NoteList";
import type { Note } from "@/types/note";

export default function NotesPage() {
  const { data: notesResponse, isLoading, error } = useQuery<{ notes: Note[]; totalPages: number }, Error>({
    queryKey: ["notes"],
    queryFn: () => fetchNotes(1, 50), // page = 1, perPage = 50
  });

  const notes = notesResponse?.notes ?? [];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading notes</p>;

  return <NotesList notes={notes} />;
}