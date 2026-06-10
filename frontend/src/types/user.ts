// src/types/user.ts

import type { Role } from "./auth";

export type UserStatus =
  | "active"
  | "inactive";

export interface AppUser {
  id: number;
  name: string;
  email: string;
  role: Role;
  branch: string;
  status: UserStatus;
  initials: string;
  
}