import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Daftar — BookFlow",
};

export default function RegisterPage() {
  return (
    <div>
      <h1 className="mb-1 text-xl font-semibold text-slate-900">Buat akun</h1>
      <p className="mb-6 text-sm text-slate-600">
        Mulai kelola booking bisnismu — gratis.
      </p>
      <RegisterForm />
    </div>
  );
}
