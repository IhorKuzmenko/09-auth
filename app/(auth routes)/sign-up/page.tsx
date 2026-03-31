"use client";

import css from "./SignUpPage.module.css";
import { register } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { useState } from "react";
import React from "react";

export default function SignUp() {
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
      const res = await register({ email, password });
      setUser(res.data);
      router.push("/profile");
    } catch {
      setError("Registration error");
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>

      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formGroup}>
          <label>Email</label>
          <input name="email" className={css.input} required />
        </div>

        <div className={css.formGroup}>
          <label>Password</label>
          <input name="password" type="password" className={css.input} required />
        </div>

        <div className={css.actions}>
          <button className={css.submitButton}>Register</button>
        </div>

        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
}