import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Daftar — BookFlow",
};

export default function RegisterPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight text-ink">
        Buka tokomu
      </h1>
      <p className="mb-6 mt-1 text-sm text-muted">
        Mulai kelola booking bisnismu — gratis.
      </p>
      <RegisterForm />
    </div>
  );
}
