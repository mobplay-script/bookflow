import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";
import { demoLoginAction } from "@/lib/actions/auth";

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

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs text-slate-400">atau</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <form action={demoLoginAction}>
        <button
          type="submit"
          className="w-full rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
        >
          Login sebagai Demo
        </button>
      </form>
      <p className="mt-2 text-center text-xs text-slate-400">
        Coba tanpa daftar — data contoh sudah terisi.
      </p>
    </div>
  );
}
