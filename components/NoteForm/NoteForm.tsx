"use client";

import { useState, useEffect } from "react";
import css from "./NoteForm.module.css";
import { createNote } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useNoteStore, NoteDraft } from "@/lib/store/noteStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteStore();
  const [note, setNote] = useState<NoteDraft>(draft);

  useEffect(() => {
    setNote(draft);
  }, [draft]);

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.back();
    },
    onError: (error) => {
      console.error("Failed to create note", error);
    },
  });

  const handleChange = (field: keyof NoteDraft, value: string) => {
    const updatedNote = { ...note, [field]: value };
    setNote(updatedNote);
    setDraft({ [field]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(note);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          className={css.input}
          value={note.title}
          onChange={(e) => handleChange("title", e.target.value)}
          required
          minLength={3}
          maxLength={50}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          className={css.textarea}
          rows={8}
          value={note.content}
          onChange={(e) => handleChange("content", e.target.value)}
          maxLength={500}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={note.tag}
          onChange={(e) =>
            handleChange("tag", e.target.value as NoteDraft["tag"])
          }
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending} // исправлено
        >
          {mutation.isPending ? "Creating..." : "Create Note"} 
        </button>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}