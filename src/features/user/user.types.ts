import { Role } from "@/features/auth/auth.types";

export type UserRole = Exclude<Role, "SUPER_ADMIN">;

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: "Admin",
  CUSTOMER_SERVICE: "Customer Service",
  LAB_STAFF: "Petugas Lab",
  USER: "User",
};

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UserListParams {
  page: number;
  limit: number;
  search?: string;
  role?: Role | "all";
}

export interface UserListResponse {
  users: User[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  role?: UserRole;
  isActive?: boolean;
}
