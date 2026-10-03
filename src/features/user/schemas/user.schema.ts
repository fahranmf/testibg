import { z } from "zod";

const roleEnum = z.enum(["ADMIN", "CUSTOMER_SERVICE", "USER"], {
  message: "Role tidak valid",
});

export const createUserSchema = z.object({
  name: z.string().trim().min(1, "Nama wajib diisi"),
  email: z.string().email("Format email tidak valid"),
  password: z
    .string()
    .min(8, "Password minimal 8 karakter"),
  role: roleEnum,
});

export const updateUserSchema = z.object({
  name: z.string().trim().min(1, "Nama wajib diisi"),
  email: z.string().email("Format email tidak valid"),
  password: z
    .string()
    .min(8, "Password minimal 8 karakter")
    .optional()
    .or(z.literal("")),
  role: roleEnum,
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;
export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;
