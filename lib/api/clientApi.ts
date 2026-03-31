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