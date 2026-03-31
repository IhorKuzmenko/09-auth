"use client";

import { useEffect, useState } from "react";
import { checkSession } from "@/lib/api/serverApi"; // перевірка сесії
import { getMe } from "@/lib/api/clientApi"; // отримання даних користувача
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
        // Перевіряємо сесію
        await checkSession();

        // Якщо сесія валідна, отримуємо дані користувача
        const user = await getMe();
        setUser(user);
      } catch {
        // Якщо помилка — очищаємо стан авторизації
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