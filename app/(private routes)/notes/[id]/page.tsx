import type { Metadata } from "next";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/api";
import NotePreview from "@/app/@modal/(.)notes/[id]/NotePreview.client";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);

    const title = `NoteHub - ${note.title}`;
    const description =
      note.content?.slice(0, 100) || "Перегляд нотатки в NoteHub";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://08-zustand-orpin-two.vercel.app/notes/${id}`,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: note.title,
          },
        ],
      },
    };
  } catch {
    return {
      title: "NoteHub - Нотатку не знайдено",
      description: "Цю нотатку не вдалося знайти або вона була видалена.",
      openGraph: {
        title: "NoteHub - Нотатку не знайдено",
        description: "Цю нотатку не вдалося знайти або вона була видалена.",
        url: `http://localhost:3000/notes/${id}`,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: "Note not found",
          },
        ],
      },
    };
  }
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  if (!id) {
    return <p>Note ID not found</p>;
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotePreview noteId={id} />
    </HydrationBoundary>
  );
}