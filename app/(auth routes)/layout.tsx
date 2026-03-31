"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

export default function AuthLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  const router = useRouter();

  // При монтуванні оновлюємо сторінку, щоб перевірити сесію
  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <TanStackProvider>
      <AuthProvider>
        <Header />
        <main>{children}</main>
        <Footer />
        {modal}
        <div id="modal-root" />
      </AuthProvider>
    </TanStackProvider>
  );
}