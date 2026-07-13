"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerAction, type AuthFormState } from "@/lib/actions/auth";

const fieldClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10";
const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <p className="mt-1 text-xs text-red-600">{errors[0]}</p>;
}

export function RegisterForm() {
  const [state, action, pending] = useActionState<AuthFormState, FormData>(
    registerAction,
    null,
  );
  const fieldErrors = state?.fieldErrors ?? {};

  return (
    <form action={action} className="space-y-4">
      {state?.message && (
        <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.message}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Nama
          </label>
          <input id="name" name="name" type="text" autoComplete="name" className={fieldClass} />
          <FieldError errors={fieldErrors.name} />
        </div>
        <div>
          <label htmlFor="businessName" className={labelClass}>
            Nama bisnis
          </label>
          <input
            id="businessName"
            name="businessName"
            type="text"
            autoComplete="organization"
            className={fieldClass}
          />
          <FieldError errors={fieldErrors.businessName} />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input id="email" name="email" type="email" autoComplete="email" className={fieldClass} />
        <FieldError errors={fieldErrors.email} />
      </div>

      <div>
        <label htmlFor="password" className={labelClass}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          className={fieldClass}
        />
        <FieldError errors={fieldErrors.password} />
      </div>

      <div>
        <label htmlFor="confirmPassword" className={labelClass}>
          Konfirmasi password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          className={fieldClass}
        />
        <FieldError errors={fieldErrors.confirmPassword} />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Memproses…" : "Buat akun"}
      </button>

      <p className="text-center text-sm text-slate-600">
        Sudah punya akun?{" "}
        <Link href="/login" className="font-medium text-slate-900 underline underline-offset-2">
          Masuk
        </Link>
      </p>
    </form>
  );
}
