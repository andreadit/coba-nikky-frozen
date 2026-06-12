import { api } from "./api";
import type { AppUser } from "../types/user";
import type { Role } from "../types/auth";

interface ApiUser {
  id: number;
  name: string;
  email: string;
  role: Role;
  is_active: boolean;
  branch?: {
    name: string;
  } | null;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export async function getUsers() {
  const response =
    await api.get<ApiUser[]>("/users");

  return response.data.map<AppUser>((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    branch: user.branch?.name ?? "-",
    status: user.is_active ? "active" : "inactive",
    initials: initials(user.name),
  }));
}
