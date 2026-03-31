import type { Metadata } from "next";
import css from "./page.module.css";

export const metadata: Metadata = {
  title: "NoteHub - Сторінка не знайдена",
  description: "Ця сторінка не існує. Перевірте URL або поверніться на головну.",
  openGraph: {
    title: "NoteHub - Сторінка не знайдена",
    description: "Ця сторінка не існує. Перевірте URL або поверніться на головну.",
    url: "https://08-zustand-orpin-two.vercel.app/not-found", 
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub - Сторінка не знайдена",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}