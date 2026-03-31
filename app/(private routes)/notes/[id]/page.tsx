"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getNoteById } from "@/lib/api/clientApi";

interface Note {
  id: string;
  title: string;
  content: string;
}

export default function NoteDetailPage() {
  const { id } = useParams();

  const { data: noteResponse, isLoading } = useQuery<{ data: Note }>({
    queryKey: ["note", id],
    queryFn: () => getNoteById(id as string),
  });

  const note = noteResponse?.data;

  if (isLoading) return <p>Loading...</p>;
  if (!note) return <p>Note not found</p>;

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
    </div>
  );
}