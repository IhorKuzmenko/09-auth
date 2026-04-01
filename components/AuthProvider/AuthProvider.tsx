"use client";

import { useEffect, useState } from "react";
import { checkSession, getMe } from "@/lib/api/clientApi"; // ✅ FIX
import { useAuthStore } from "@/lib/store/authStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser, clearIsAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Перевірка сесії
        await checkSession();

        // Отримання користувача
        const user = await getMe();
        setUser(user);
      } catch {
        clearIsAuthenticated();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [setUser, clearIsAuthenticated]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}