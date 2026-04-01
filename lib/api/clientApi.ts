import { api } from './api';
import type { Note, CreateNoteRequest } from '@/types/note';
import type { User, UpdateUserRequest } from '@/types/user';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

// ====================== NOTES ======================
export const fetchNotesClient = async (
  page: number,
  perPage: number,
  search = '',
  tag?: string
): Promise<FetchNotesResponse> => {
  const res = await api.get<FetchNotesResponse>('/notes', {
    params: { page, perPage, search, tag },
  });
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (data: CreateNoteRequest): Promise<Note> => {
  const res = await api.post<Note>('/notes', data);
  return res.data;
};

// ====================== AUTH ======================
export const login = async (data: { email: string; password: string }) => {
  const res = await api.post('/auth/login', data);
  return res.data;
};

export const register = async (data: { email: string; password: string }) => {
  const res = await api.post('/auth/register', data);
  return res.data;
};

export const logout = async () => {
  await api.post('/auth/logout');
};

export const checkSession = async () => {
  const res = await api.get('/auth/session');
  return res.data;
};

// ====================== USERS ======================
export const getMe = async (): Promise<User> => {
  const res = await api.get<User>('/users/me');
  return res.data;
};

export const updateProfile = async (data: UpdateUserRequest): Promise<User> => {
  const res = await api.patch<User>('/users/me', data);
  return res.data;
};