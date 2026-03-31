"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import type { Note } from "@/types/note";

export default function FilterNotesPage() {
  const [filter, setFilter] = useState("");

  const { data: notesResponse, isLoading, error } = useQuery<{ notes: Note[]; totalPages: number }, Error>({
    queryKey: ["notes", filter],
    queryFn: () => fetchNotes(1, 50, filter), // например page=1, perPage=50
  });

  const notes = notesResponse?.notes;

  return (
    <div>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter notes"
      />

      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}

      <ul>
        {notes?.map((note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </div>
  );
}