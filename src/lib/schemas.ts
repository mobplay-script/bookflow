import { z } from "zod";

// Skema validasi terpakai di server action & (opsional) di sisi client.

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Nama minimal 2 karakter")
      .max(60, "Nama terlalu panjang"),
    businessName: z
      .string()
      .trim()
      .min(2, "Nama bisnis minimal 2 karakter")
      .max(80, "Nama bisnis terlalu panjang"),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Email tidak valid"),
    password: z
      .string()
      .min(8, "Password minimal 8 karakter")
      .max(72, "Password maksimal 72 karakter"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi password tidak cocok",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Email tidak valid"),
  password: z.string().min(1, "Password wajib diisi"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
