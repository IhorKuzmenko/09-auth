"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

export default function Home() {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      router.push("/profile");
    }
  }, [user, router]);

  return (
    <main style={{ textAlign: "center", padding: "4rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>
        Welcome to My App
      </h1>

      {!user && (
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <a
            href="/sign-in"
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#0070f3",
              color: "#fff",
              borderRadius: "5px",
              textDecoration: "none",
            }}
          >
            Sign in
          </a>

          <a
            href="/sign-up"
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#eaeaea",
              color: "#000",
              borderRadius: "5px",
              textDecoration: "none",
            }}
          >
            Sign up
          </a>
        </div>
      )}
    </main>
  );
}