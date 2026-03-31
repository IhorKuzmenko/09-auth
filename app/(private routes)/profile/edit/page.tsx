"use client";

import css from "./EditProfilePage.module.css";
import { updateMe } from "@/lib/api/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import React from "react";

// ✅ Определяем тип пользователя
interface User {
  username: string;
}

interface EditProfileProps {
  user: User;
}

export default function EditProfile({ user }: EditProfileProps) {
  const router = useRouter();
  const [username, setUsername] = useState(user.username);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await updateMe({ username });

    router.push("/profile");
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <form onSubmit={handleSubmit}>
          <input
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            className={css.input}
          />

          <button className={css.saveButton}>Save</button>
        </form>
      </div>
    </main>
  );
}