import type { Metadata } from "next";
import { fetchNotes } from "@/lib/api/api";
import NotesClient from "./Notes.client";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const tagFromUrl = slug[0];
  const finalTag = tagFromUrl === "all" ? "All notes" : tagFromUrl;

  const title = `NoteHub - ${finalTag} notes`;
  const description = `Перегляд нотаток за фільтром: ${finalTag}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://08-zustand-orpin-two.vercel.app/notes/filter/${tagFromUrl}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `NoteHub - ${finalTag} notes`,
        },
      ],
    },
  };
}

export default async function FilteredNotesPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  const tagFromUrl = slug[0];
  const finalTag = tagFromUrl === "all" ? undefined : tagFromUrl;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", finalTag],
    queryFn: () => fetchNotes(1, 12, "", finalTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={finalTag} />
    </HydrationBoundary>
  );
}