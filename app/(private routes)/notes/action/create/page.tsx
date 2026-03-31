
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createNote } from "@/lib/api/clientApi";

export default function CreateNotePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createNote({ title, content });
    router.push("/notes");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" />
      <button type="submit">Create</button>
    </form>
  );
}