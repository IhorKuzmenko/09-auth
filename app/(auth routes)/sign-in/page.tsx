"use client";

import css from "./SignInPage.module.css";
import { login } from "@/lib/api"; // <- правильно!
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
      const res = await login({ email, password });
      setUser(res.data);
      router.push("/profile");
    } catch {
      setError("Login error");
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <input name="email" className={css.input} required />
        <input name="password" type="password" className={css.input} required />

        <button className={css.submitButton}>Log in</button>

        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
}