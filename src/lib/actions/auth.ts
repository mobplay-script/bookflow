"use server";

import { AuthError } from "next-auth";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { registerSchema, loginSchema } from "@/lib/schemas";

export type AuthFormState = {
  fieldErrors?: Record<string, string[]>;
  message?: string;
} | null;

export async function registerAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = registerSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }

  const { name, businessName, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { fieldErrors: { email: ["Email sudah terdaftar"] } };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: { name, businessName, email, passwordHash },
  });

  // Auto login setelah daftar. signIn akan melempar redirect (NEXT_REDIRECT)
  // yang HARUS diteruskan, jadi jangan dibungkus try/catch di sini.
  await signIn("credentials", { email, password, redirectTo: "/dashboard" });
  return null;
}

export async function loginAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    // AuthError = kredensial salah. Error lain (termasuk redirect) dilempar ulang.
    if (error instanceof AuthError) {
      return { message: "Email atau password salah" };
    }
    throw error;
  }
  return null;
}

export async function signOutAction() {
  await signOut({ redirectTo: "/login" });
}
