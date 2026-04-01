"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <TanStackProvider>
      <AuthProvider>
        <main>{children}</main> {/* убрали Header и Footer */}
        <div id="modal-root" />
      </AuthProvider>
    </TanStackProvider>
  );
}