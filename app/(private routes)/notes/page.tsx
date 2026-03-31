"use client";

import { useQuery } from "@tanstack/react-query";
import { getNotes } from "@/lib/api/clientApi"; // метод для получения всех заметок
import NotesList from "@/components/NotesList/NotesList";

export default function NotesPage() {
  const { data: notes, isLoading, error } = useQuery(["notes"], getNotes);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading notes</p>;

  return <NotesList notes={notes.data} />;
}