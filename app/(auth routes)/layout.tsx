"use client";

import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  // 🔹 Обновляем router при монтировании
  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <TanStackProvider>
      <AuthProvider>
        <main>{children}</main>
        <div id="modal-root" />
      </AuthProvider>
    </TanStackProvider>
  );
}