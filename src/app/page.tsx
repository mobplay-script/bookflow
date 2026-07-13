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
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-slate-500">
          BookFlow — project portfolio oleh Kevin Candra · Next.js · Prisma ·
          Postgres
        </div>
      </footer>
    </div>
  );
}
