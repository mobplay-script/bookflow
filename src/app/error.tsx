"use client";

import { useEffect } from "react";
import { btnPrimary } from "@/lib/ui";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-4 text-center">
      <p className="eyebrow text-brick">Ada yang tersendat</p>
      <h1 className="mt-3 font-display text-2xl font-bold text-ink">
        Terjadi kesalahan
      </h1>
      <p className="mt-2 max-w-sm text-sm text-muted">
        Maaf, ada yang tidak beres saat memuat halaman ini. Coba lagi sebentar.
      </p>
      <button onClick={reset} className={`${btnPrimary} mt-6`}>
        Coba lagi
      </button>
    </div>
  );
}
