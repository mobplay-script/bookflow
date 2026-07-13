import Link from "next/link";
import { demoLoginAction } from "@/lib/actions/auth";

const features = [
  {
    title: "Booking terorganisir",
    desc: "Catat jadwal pelanggan, ubah status pending → selesai, dan filter dengan sekali klik.",
    icon: "📅",
  },
  {
    title: "Katalog layanan",
    desc: "Kelola daftar layanan lengkap dengan durasi, harga, dan status aktif/nonaktif.",
    icon: "✂️",
  },
  {
    title: "Analitik real-time",
    desc: "Revenue, tren 7/30 hari, dan layanan terpopuler — langsung dari data bookingmu.",
    icon: "📊",
  },
  {
    title: "Gratis & ringan",
    desc: "Dibangun dengan Next.js & Postgres. Cepat, aman, tanpa biaya untuk memulai.",
    icon: "⚡",
  },
];

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <p className="text-[11px] font-medium text-slate-400">{label}</p>
      <p className="mt-0.5 text-base font-bold text-slate-900">{value}</p>
    </div>
  );
}

export default function Home() {
  const bars = [40, 65, 52, 78, 60, 92, 70];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      {/* Nav */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Book<span className="text-indigo-600">Flow</span>
          </span>
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-slate-900 px-3.5 py-1.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Daftar
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
              Booking & Analytics untuk bisnis jasa
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Kelola booking, <span className="text-indigo-600">pahami</span>{" "}
              bisnismu.
            </h1>
            <p className="mt-4 max-w-md text-lg text-slate-600">
              BookFlow membantu salon, barbershop, dan bisnis jasa mencatat
              booking pelanggan sekaligus melihat performa lewat dashboard
              analitik yang rapi.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <form action={demoLoginAction}>
                <button
                  type="submit"
                  className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                >
                  Coba Demo →
                </button>
              </form>
              <Link
                href="/register"
                className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Daftar gratis
              </Link>
            </div>
            <p className="mt-3 text-xs text-slate-400">
              Klik “Coba Demo” untuk masuk dengan akun contoh yang sudah terisi data.
            </p>
          </div>

          {/* Mock dashboard (CSS, ilustratif) */}
          <div className="relative">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900">Dashboard</p>
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-medium text-green-700">
                  live
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <MiniStat label="Revenue" value="Rp4,2jt" />
                <MiniStat label="Booking" value="128" />
                <MiniStat label="Hari ini" value="6" />
              </div>
              <div className="mt-4 flex h-32 items-end gap-2 rounded-xl bg-slate-50 p-3">
                {bars.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-indigo-500/80"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="absolute -right-3 -top-3 -z-10 h-full w-full rounded-2xl bg-indigo-100" />
          </div>
        </section>

        {/* Fitur */}
        <section className="border-t border-slate-200 bg-white py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900">
              Semua yang bisnismu butuhkan
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-slate-600">
              Dari mencatat booking pertama sampai memahami tren revenue.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="text-2xl">{f.icon}</div>
                  <h3 className="mt-3 font-semibold text-slate-900">{f.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA bawah */}
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Siap merapikan bookingmu?
            </h2>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <form action={demoLoginAction}>
                <button
                  type="submit"
                  className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                >
                  Coba Demo Sekarang
                </button>
              </form>
              <Link
                href="/register"
                className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Buat akun
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 text-center text-sm text-slate-500 sm:flex-row sm:justify-between">
          <span>BookFlow · Next.js · Prisma · Postgres</span>
          <a
            href="https://github.com/mobplay-script"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-slate-600 hover:text-slate-900"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.94c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.76.4-1.27.73-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.28 5.69.42.36.79 1.06.79 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
            </svg>
            github.com/mobplay-script
          </a>
        </div>
      </footer>
    </div>
  );
}
