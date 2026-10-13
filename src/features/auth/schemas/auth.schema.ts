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

export const updateProfileSchema = z.object({
  name: z.string().trim().min(1, "Nama wajib diisi"),
  email: z.string().email("Format email tidak valid"),
});
export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Password lama wajib diisi"),
    newPassword: z.string().min(8, "Password baru minimal 8 karakter"),
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Konfirmasi password tidak sama",
    path: ["confirmPassword"],
  });
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
