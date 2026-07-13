import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Masuk — BookFlow",
};

export default function LoginPage() {
  return (
    <div>
      <h1 className="mb-1 text-xl font-semibold text-slate-900">Masuk</h1>
      <p className="mb-6 text-sm text-slate-600">
        Kelola booking & lihat analitik bisnismu.
      </p>
      <LoginForm />
    </div>
  );
}
