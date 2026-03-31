
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getNotes } from "@/lib/api/clientApi";

export default function FilterNotesPage() {
  const [filter, setFilter] = useState("");
  const { data: notes } = useQuery(["notes", filter], () => getNotes(filter));

  return (
    <div>
      <input value={filter} onChange={e => setFilter(e.target.value)} placeholder="Filter notes" />
      <ul>
        {notes?.data.map(note => <li key={note.id}>{note.title}</li>)}
      </ul>
    </div>
  );
}