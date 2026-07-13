import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";
import { demoLoginAction } from "@/lib/actions/auth";
import { btnBrass } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Masuk — BookFlow",
};

export default function LoginPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight text-ink">
        Masuk ke toko
      </h1>
      <p className="mb-6 mt-1 text-sm text-muted">
        Kelola booking &amp; lihat pemasukan bisnismu.
      </p>
      <LoginForm />

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-hair" />
        <span className="eyebrow">atau</span>
        <div className="h-px flex-1 bg-hair" />
      </div>

      <form action={demoLoginAction}>
        <button type="submit" className={`${btnBrass} w-full`}>
          Masuk sebagai demo
        </button>
      </form>
      <p className="mt-2 text-center eyebrow">Tanpa daftar · data contoh terisi</p>
    </div>
  );
}
