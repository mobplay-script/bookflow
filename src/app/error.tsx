"use client";

import { useEffect } from "react";

// Error boundary global (Next.js App Router). Wajib client component.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Di produksi bisa diganti pelaporan ke layanan monitoring.
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <p className="text-5xl">😕</p>
      <h1 className="mt-4 text-xl font-semibold text-slate-900">
        Terjadi kesalahan
      </h1>
      <p className="mt-2 max-w-sm text-sm text-slate-600">
        Maaf, ada yang tidak beres saat memuat halaman ini. Coba lagi sebentar.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Coba lagi
      </button>
    </div>
  );
}
