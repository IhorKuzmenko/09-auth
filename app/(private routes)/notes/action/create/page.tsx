"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createNote } from "@/lib/api/api";
import type { Tag } from "@/types/note";

export default function CreateNotePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState<Tag>("Todo"); // дефолтный тег
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError("Title and content cannot be empty");
      return;
    }

    try {
      await createNote({ title, content, tag }); // теперь tag передаём
      setTitle("");
      setContent("");
      setTag("Todo");
      setError("");
      router.push("/notes");
    } catch {
      setError("Failed to create note. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Content"
      />

      <select value={tag} onChange={e => setTag(e.target.value as Tag)}>
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
      </select>

      <button type="submit">Create</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}