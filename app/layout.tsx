import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const roboto = Roboto({
  weight: ["400", "500", "700"], // основні товщини
  subsets: ["latin", "cyrillic"], // щоб працювала українська/російська
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Зручний застосунок для ведення та організації нотаток онлайн",
  openGraph: {
    title: "NoteHub",
    description: "Зручний застосунок для ведення та організації нотаток онлайн",
    url: "https://08-zustand-orpin-two.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub - зручний застосунок для нотаток",
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <TanStackProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          {modal}
          <div id="modal-root" />
        </TanStackProvider>
      </body>
    </html>
  );
}