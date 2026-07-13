import Link from "next/link";
import { btnPrimary } from "@/lib/ui";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-4 text-center">
      <p className="tnum font-display text-6xl font-extrabold text-pine">404</p>
      <h1 className="mt-3 font-display text-xl font-bold text-ink">
        Halaman tidak ditemukan
      </h1>
      <p className="mt-2 max-w-sm text-sm text-muted">
        Halaman yang kamu cari tidak ada atau sudah dipindahkan.
      </p>
      <Link href="/" className={`${btnPrimary} mt-6`}>
        Kembali ke beranda
      </Link>
    </div>
  );
}
