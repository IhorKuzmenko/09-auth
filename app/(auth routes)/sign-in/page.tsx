"use client";

import css from "./SignInPage.module.css";
import { login, getMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { useState } from "react";
import React from "react";

export default function SignIn() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      // Виконуємо автентифікацію
      await login({ email, password });

      // Отримуємо дані користувача
      const user = await getMe();

      // Зберігаємо користувача у глобальному сторі
      setUser(user);

      // Перенаправляємо на профіль
      router.push("/profile");
    } catch (err) {
      console.error(err);
      setError("Login error. Please check your credentials.");
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label>Email</label>
          <input name="email" type="email" className={css.input} required />
        </div>

        <div className={css.formGroup}>
          <label>Password</label>
          <input name="password" type="password" className={css.input} required />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}