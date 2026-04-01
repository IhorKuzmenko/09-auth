"use client";
import css from './EditProfilePage.module.css';
import Image from 'next/image';
import { updateProfile } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function EditProfile() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [username, setUsername] = useState(user?.username || '');
  const [error, setError] = useState('');

  if (!user) return <p>Loading...</p>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedUser = await updateProfile({ username });
      setUser(updatedUser);
      router.push('/profile');
    } catch {
      setError('Failed to update profile');
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        {user.avatar && (
          <Image
            src={user.avatar}
            alt={`${user.username}'s avatar`}
            width={120}
            height={120}
            className={css.avatar}
          />
        )}
        <form onSubmit={handleSubmit}>
          <div className={css.formGroup}>
            <label>Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={css.input}
            />
          </div>
          <div className={css.formGroup}>
            <label>Email</label>
            <input value={user.email} readOnly className={css.input} />
          </div>
          {error && <p className={css.error}>{error}</p>}
          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>Save</button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.push('/profile')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}