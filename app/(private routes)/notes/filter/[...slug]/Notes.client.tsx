"use client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { fetchNotesClient, FetchNotesResponse } from "@/lib/api/clientApi"; 
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import { Pagination } from "@/components/Pagination/Pagination";
import Link from "next/link";
import css from "./Notes.module.css";

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const perPage = 12;

  const debounced = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value);
    setCurrentPage(1);
  }, 500);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    debounced(value);
  };

  // useQuery v5: queryKey readonly
  const query = useQuery<FetchNotesResponse, Error>({
    queryKey: ["notes", currentPage, debouncedSearch, tag] as const,
    queryFn: async () =>
      await fetchNotesClient(currentPage, perPage, debouncedSearch, tag),
    staleTime: 60_000,
  });

  const notes = query.data?.notes ?? [];
  const totalPages = query.data?.totalPages ?? 0;
  const { isLoading, isFetching, error } = query;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />

        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {(isLoading || isFetching) && (
        <p className={css.loading}>
          {isLoading ? "Loading notes..." : "Updating page..."}
        </p>
      )}

      {notes.length > 0 && <NoteList notes={notes} />}

      {notes.length === 0 && !isLoading && !error && (
        <p>No notes found for this filter</p>
      )}

      {error && <p className={css.error}>Error loading notes: {error.message}</p>}
    </div>
  );
}