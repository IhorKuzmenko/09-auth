"use client";

import { useEffect, useState } from "react";
import { checkSession } from "@/lib/api";
import { useAuthStore } from "@/lib/store/authStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser, clearIsAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await checkSession();

        if (res.data) {
          setUser(res.data);
        } else {
          clearIsAuthenticated();
        }
      } catch {
        clearIsAuthenticated();
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [setUser, clearIsAuthenticated]); 

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}