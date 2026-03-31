// app/(private routes)/profile/page.tsx
import css from "./ProfilePage.module.css";
import Image from "next/image";
import Link from "next/link";
import { getMe } from "@/lib/api/serverApi";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Page",
  description: "User profile page displaying user information",
};

export default async function Profile() {
  const user = await getMe(); // serverApi повертає User

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Profile Page</h1>

        {user.avatar && (
          <Image
            src={user.avatar}
            alt={`${user.username}'s avatar`}
            width={120}
            height={120}
            className={css.avatar}
          />
        )}

        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>

        <Link href="/profile/edit" className={css.editLink}>
          Edit Profile
        </Link>
      </div>
    </main>
  );
}