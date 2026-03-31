import css from "./ProfilePage.module.css";
import { getMe } from "@/lib/api/serverApi";

export default async function Profile() {
  const res = await getMe();
  const user = res.data;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Profile Page</h1>

        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
      </div>
    </main>
  );
}