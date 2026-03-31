"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getNotes } from "@/lib/api/clientApi";
import type { AxiosResponse } from "axios";

type Note = {
  id: string;
  title: string;
  content: string;
};

export default function FilterNotesPage() {
  const [filter, setFilter] = useState("");

  const { data: notesResponse } = useQuery<AxiosResponse<{ data: Note[] }>, Error>({
    queryKey: ["notes", filter],
    queryFn: () => getNotes(filter),
  });

  // достаем реальные данные
  const notes = notesResponse?.data.data;

  return (
    <div>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter notes"
      />
      <ul>
        {notes?.map((note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </div>
  );
}