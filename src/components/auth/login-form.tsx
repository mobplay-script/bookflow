"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction, type AuthFormState } from "@/lib/actions/auth";
import { inputClass, labelClass, btnPrimary } from "@/lib/ui";

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <p className="mt-1 text-xs text-brick">{errors[0]}</p>;
}

export function LoginForm() {
  const [state, action, pending] = useActionState<AuthFormState, FormData>(
    loginAction,
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
          autoComplete="current-password"
          className={inputClass}
        />
        <FieldError errors={fieldErrors.password} />
      </div>

      <button type="submit" disabled={pending} className={`${btnPrimary} w-full`}>
        {pending ? "Memproses…" : "Masuk"}
      </button>

      <p className="text-center text-sm text-muted">
        Belum punya akun?{" "}
        <Link href="/register" className="font-semibold text-pine underline-offset-2 hover:underline">
          Daftar
        </Link>
      </p>
    </form>
  );
}
