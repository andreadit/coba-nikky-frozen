import { api } from "./api";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: string;
  branch_id?: number | null;
  branch?: {
    id: number;
    name: string;
  } | null;
}

export interface LoginResponse {
  user: AuthUser;
  token: string;
}

export async function login(
  email: string,
  password: string
) {
  const response = await api.post<LoginResponse>(
    "/login",
    {
      email,
      password,
    }
  );

  return response.data;
}

export async function logout() {
  await api.post("/logout");
}

export async function getCurrentUser() {
  const response = await api.get<AuthUser>("/me");

  return response.data;
}
