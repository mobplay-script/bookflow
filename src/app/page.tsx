import Link from "next/link";
import { demoLoginAction } from "@/lib/actions/auth";
import { Wordmark } from "@/components/brand/wordmark";

function IconScissors() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
      <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
      <path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12" strokeLinecap="round" />
    </svg>
  );
}
function IconTicket() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
      <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8Z" />
      <path d="M15 6v12" strokeDasharray="1 2.4" strokeLinecap="round" />
    </svg>
  );
}
function IconChart() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
      <path d="M4 20V4M4 20h16" strokeLinecap="round" />
      <path d="M8 16v-3M12 16V8M16 16v-6M20 16v-9" strokeLinecap="round" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
      <circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" strokeLinecap="round" />
    </svg>
  );
}

const features = [
  { icon: <IconTicket />, title: "Buku booking yang rapi", desc: "Setiap janji tercatat dengan status jelas — dari menunggu sampai selesai — dan bisa disaring seketika." },
  { icon: <IconScissors />, title: "Daftar layanan sendiri", desc: "Atur layanan beserta durasi dan harga. Aktif atau nonaktifkan tanpa menghapus riwayat." },
  { icon: <IconChart />, title: "Angka yang jujur", desc: "Revenue, jumlah booking, dan layanan paling laku dihitung langsung dari catatanmu." },
  { icon: <IconClock />, title: "Siap dalam semenit", desc: "Masuk, catat janji pertama, selesai. Tanpa setup berbelit, tanpa biaya untuk mulai." },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <div className="barber-stripe h-1.5 w-full" />

      {/* Nav */}
      <header className="border-b border-hair">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Wordmark />
          <nav className="flex items-center gap-1">
            <Link href="/login" className="rounded-md px-3 py-2 text-sm font-medium text-muted transition hover:text-ink">
              Masuk
            </Link>
            <Link href="/register" className="rounded-md bg-pine px-4 py-2 text-sm font-semibold text-paper transition hover:bg-pine-deep">
              Daftar
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <p className="eyebrow flex items-center gap-2">
              <span className="inline-block h-px w-6 bg-brick" />
              Booking &amp; analitik untuk bisnis jasa
            </p>
            <h1 className="mt-5 font-display text-5xl font-extrabold leading-[0.98] tracking-tight text-ink sm:text-6xl">
              Kelola janji temu
              <br />
              seperti barbershop
              <br />
              <span className="text-pine">kelas atas.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              BookFlow menggantikan buku janji dan kalkulator dengan satu tempat
              rapi — catat booking, atur layanan, dan lihat pemasukan tanpa
              menebak-nebak.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <form action={demoLoginAction}>
                <button
                  type="submit"
                  className="rounded-lg bg-brass px-6 py-3 text-sm font-semibold text-ink shadow-sm transition hover:brightness-105"
                >
                  Coba demo langsung
                </button>
              </form>
              <Link
                href="/register"
                className="rounded-lg border border-ink/25 px-6 py-3 text-sm font-semibold text-ink transition hover:bg-ink/[0.04]"
              >
                Buat akun gratis
              </Link>
            </div>
            <p className="mt-3 eyebrow">Tanpa daftar · data contoh sudah terisi</p>
          </div>

          {/* Signature: tiket antrian */}
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute inset-0 translate-x-4 translate-y-5 rotate-3 rounded-xl border border-hair bg-card/60" />
            <div className="relative -rotate-1 overflow-hidden rounded-xl border border-hair bg-card shadow-[0_18px_40px_-24px_rgba(20,40,32,0.5)]">
              <div className="flex">
                <div className="barber-stripe w-2 shrink-0" />
                <div className="flex-1 p-6">
                  <div className="flex items-center justify-between">
                    <span className="eyebrow">Barbershop Demo</span>
                    <span className="rounded-full bg-pine-soft px-2.5 py-0.5 text-[11px] font-semibold text-pine">
                      Dikonfirmasi
                    </span>
                  </div>
                  <p className="mt-5 tnum text-xs text-faint">No. antrian</p>
                  <p className="tnum text-4xl font-bold text-ink">#0128</p>
                  <div className="mt-5 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted">Pelanggan</span>
                      <span className="font-medium text-ink">Budi Santoso</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Layanan</span>
                      <span className="font-medium text-ink">Paket Grooming</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Jadwal</span>
                      <span className="tnum font-medium text-ink">15 Jul · 14.30</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="perf mx-6" />
              <div className="flex items-center justify-between px-6 py-4">
                <span className="eyebrow">Total</span>
                <span className="tnum text-lg font-bold text-pine">Rp200.000</span>
              </div>
            </div>
          </div>
        </section>

        {/* Band hijau — papan tulis toko */}
        <section className="bg-pine text-paper">
          <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-paper/15 px-5 py-10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              ["128", "booking tercatat bulan ini"],
              ["Rp4,4jt", "revenue dari janji selesai"],
              ["5", "layanan aktif siap dipesan"],
            ].map(([big, small]) => (
              <div key={small} className="px-2 py-4 text-center sm:px-6">
                <p className="tnum text-4xl font-bold">{big}</p>
                <p className="mt-1 text-sm text-paper/70">{small}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Fitur */}
        <section className="mx-auto max-w-6xl px-5 py-20">
          <p className="eyebrow flex items-center gap-2">
            <span className="inline-block h-px w-6 bg-brick" />
            Isi tokonya
          </p>
          <h2 className="mt-4 max-w-lg font-display text-3xl font-bold tracking-tight text-ink">
            Empat hal yang bikin harimu lebih ringan
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
            {features.map((f) => (
              <div key={f.title} className="border-t border-hair pt-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pine-soft text-pine">
                  {f.icon}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">{f.title}</h3>
                <p className="mt-1.5 max-w-sm text-[15px] leading-relaxed text-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA penutup */}
        <section className="mx-auto max-w-6xl px-5 pb-24">
          <div className="overflow-hidden rounded-2xl bg-pine px-8 py-14 text-center text-paper sm:px-16">
            <h2 className="mx-auto max-w-xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Buka “toko”-mu sekarang.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-paper/75">
              Lihat sendiri dengan data contoh, atau langsung buat akunmu.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <form action={demoLoginAction}>
                <button
                  type="submit"
                  className="rounded-lg bg-brass px-6 py-3 text-sm font-semibold text-ink transition hover:brightness-105"
                >
                  Coba demo
                </button>
              </form>
              <Link
                href="/register"
                className="rounded-lg border border-paper/30 px-6 py-3 text-sm font-semibold text-paper transition hover:bg-paper/10"
              >
                Buat akun
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-hair">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 py-8 text-sm text-muted sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <Wordmark small />
            <span className="text-faint">· Next.js · Prisma · Postgres</span>
          </div>
          <a
            href="https://github.com/mobplay-script"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-muted transition hover:text-ink"
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
