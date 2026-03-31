
import { api } from "./api";

export const register = (data: { email: string; password: string }) =>
  api.post("/auth/register", data);

export const login = (data: { email: string; password: string }) =>
  api.post("/auth/login", data);

export const logout = () => api.post("/auth/logout");

export const checkSession = () => api.get("/auth/session");

export const getMe = () => api.get("/users/me");

export const updateMe = (data: { username: string }) =>
  api.patch("/users/me", data);


export const createNote = (data: { title: string; content: string }) =>
    api.post("/notes", data);

export const getNotes = (filter?: string) =>
  api.get("/notes", { params: { filter } });