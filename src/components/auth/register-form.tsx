"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerAction, type AuthFormState } from "@/lib/actions/auth";
import { inputClass, labelClass, btnPrimary } from "@/lib/ui";

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <p className="mt-1 text-xs text-brick">{errors[0]}</p>;
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
        <div className="rounded-lg border border-brick/30 bg-brick/5 px-3 py-2 text-sm text-brick">
          {state.message}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Nama
          </label>
          <input id="name" name="name" type="text" autoComplete="name" className={inputClass} />
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
            className={inputClass}
          />
          <FieldError errors={fieldErrors.businessName} />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input id="email" name="email" type="email" autoComplete="email" className={inputClass} />
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
          className={inputClass}
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
          className={inputClass}
        />
        <FieldError errors={fieldErrors.confirmPassword} />
      </div>

      <button type="submit" disabled={pending} className={`${btnPrimary} w-full`}>
        {pending ? "Memproses…" : "Buat akun"}
      </button>

      <p className="text-center text-sm text-muted">
        Sudah punya akun?{" "}
        <Link href="/login" className="font-semibold text-pine underline-offset-2 hover:underline">
          Masuk
        </Link>
      </p>
    </form>
  );
}
