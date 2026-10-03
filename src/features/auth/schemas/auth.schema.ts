import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(1, "Password wajib diisi"),
});
export type LoginFormValues = z.infer<typeof loginSchema>;

// Gak ada field `role` di sini — PMI cuma punya ADMIN & SUPER_ADMIN, dan
// SUPER_ADMIN gak dibuat lewat form register, jadi role-nya implisit "ADMIN"
// (lihat RegisterPayload di auth.types.ts).
export const registerSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
  employeeCode: z.string().optional(),
});
export type RegisterFormValues = z.infer<typeof registerSchema>;