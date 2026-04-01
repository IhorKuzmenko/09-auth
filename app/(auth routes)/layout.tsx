"use client";
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import type { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <TanStackProvider>
      <AuthProvider>
        <main>{children}</main>
        <div id="modal-root" />
      </AuthProvider>
    </TanStackProvider>
  );
}