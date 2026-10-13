import { Permission } from "./constants/permissions";

export type Role =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "CUSTOMER_SERVICE"
  | "LAB_STAFF"
  | "USER";

export interface AuthUser {
  id: string;
  publicId: string;
  name: string;
  email: string;
  employeeCode?: string;
  role: Role;
  permissions: Permission[];
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  // SUPER_ADMIN gak boleh dibuat lewat form register — cuma seed manual.
  role: Exclude<Role, "SUPER_ADMIN">;
  employeeCode?: string;
}

export interface LoginResult {
  token: string;
  user: AuthUser;
}

export interface UpdateProfilePayload {
  name: string;
  email: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}
