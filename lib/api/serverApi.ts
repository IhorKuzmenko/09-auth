import axios from "axios";
import { cookies as nextCookies } from "next/headers";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";
const serverApi = axios.create({ baseURL });

const getCookieHeader = async (): Promise<string> => {
  const cookieStore = await nextCookies(); 
  
  const allCookies = cookieStore.getAll?.() ?? [];
  
  return allCookies
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
};

export const getMe = async () => {
  const cookieHeader = await getCookieHeader();

  return serverApi.get("/users/me", {
    headers: { 
      cookie: cookieHeader 
    },
  });
};