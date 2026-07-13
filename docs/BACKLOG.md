# BookFlow — Backlog & Roadmap

Mini SaaS **Booking & Analytics Dashboard** untuk bisnis jasa (niche: salon/barbershop).
Tujuan: portfolio fullstack untuk recruiter. Target biaya: **Rp0 (semua free tier)**.

## Tech Stack
- **Next.js 16.2** (App Router) + **TypeScript**
- **Tailwind CSS 4** (+ shadcn/ui — dipasang di Fase 5)
- **Prisma 7.8** + **Neon Postgres** (driver adapter `@prisma/adapter-neon`)
- **Auth.js (NextAuth v5)** — Fase 1
- **Recharts** — Fase 4
- **Zod** — validasi
- Deploy: **Vercel** (auto-deploy dari GitHub)

> ⚠️ Catatan penting: project pakai **Next.js 16 & Prisma 7 yang punya breaking changes**.
> Sebelum menulis kode Next, baca docs bawaan di `node_modules/next/dist/docs/`.
> Prisma 7: URL koneksi ada di `prisma.config.ts` (bukan `schema.prisma`), dan
> `PrismaClient` wajib pakai driver adapter.

---

## ✅ Fase 0 — Setup (SELESAI)
- [x] Scaffold Next.js + TypeScript + Tailwind + ESLint (App Router, src dir)
- [x] Install Prisma 7 + Zod + tsx
- [x] Buat schema Prisma (User, Service, Booking + enum BookingStatus)
- [x] Setup `prisma.config.ts` (Prisma 7) + driver adapter Neon
- [x] Prisma Client singleton (`src/lib/prisma.ts`)
- [x] `.env.example` + `.env` (placeholder) + npm scripts db:*
- [x] `prisma generate` sukses + typecheck lolos
- [x] Git init (otomatis dari create-next-app)

### ⏳ Sisa Fase 0 (butuh aksi kamu — tidak bisa diotomatiskan)
- [ ] **Daftar Neon** (https://neon.tech, login pakai GitHub) → buat project → copy
      **Pooled connection string** → tempel ke `DATABASE_URL` di file `.env`
- [ ] Jalankan `npm run db:push` untuk membuat tabel di Neon
- [ ] Push repo `bookflow` ke GitHub (repo baru)
- [ ] Import repo ke **Vercel** → set env var `DATABASE_URL` di Vercel → deploy kosong

---

## ✅ Fase 1 — Auth (SELESAI)
- [x] Install & konfigurasi Auth.js (NextAuth v5) — credentials provider
- [x] Generate `AUTH_SECRET`
- [x] Hash password (bcrypt) saat register
- [x] Halaman `/register` + `/login` (form + validasi Zod)
- [x] Proteksi route `/dashboard/*` (Next 16: `proxy.ts`, bukan `middleware.ts`)
- [x] Session helper (`getCurrentUser`)

## ✅ Fase 2 — Services (SELESAI)
- [x] Halaman `/dashboard/services` (list)
- [x] Form tambah/edit layanan (nama, durasi, harga, aktif/nonaktif)
- [x] Server actions: create / update / delete / toggle (ownership-scoped)
- [x] Validasi Zod + handling error di UI

## ✅ Fase 3 — Bookings (SELESAI)
- [x] Halaman `/dashboard/bookings` (list + filter status)
- [x] Form buat/edit booking (pilih service, nama & telp pelanggan, tanggal/jam)
- [x] Ubah status (pending → confirmed → done / cancelled) inline
- [x] Server actions + validasi
- [ ] (opsional) tampilan kalender — di-skip

## ✅ Fase 4 — Analytics Dashboard (SELESAI)
- [x] Halaman `/dashboard` (overview)
- [x] Kartu metrik: total revenue, jumlah booking, booking hari ini, rata-rata nilai
- [x] Chart tren 7/30 hari (Recharts) — revenue & jumlah booking (toggle, satu sumbu)
- [x] Breakdown per layanan (service terpopuler)
- [x] Query agregasi dari tabel Booking

## ✅ Fase 5 — Polish & Rilis (SELESAI kecuali deploy)
- [x] Landing page (hero, fitur, CTA "Coba Demo")
- [ ] Setup shadcn/ui — **di-skip** (komponen sudah konsisten; hindari churn/regresi)
- [x] Seed data demo realistis (`prisma/seed.ts`)
- [x] Tombol **"Login sebagai Demo"** (akun demo read-friendly)
- [x] README bagus: tech stack, arsitektur, setup (placeholder screenshot & link live demo)
- [ ] Dark mode — **di-skip** (opsional)
- [x] Cek responsif mobile (nav mobile, tabel scroll-x)
- [ ] Final deploy + verifikasi live demo — **butuh aksi user (import Vercel)**

---

## 💡 Nice-to-have (kalau ada waktu)
- [ ] Halaman booking publik `/book/[businessSlug]` (pelanggan booking sendiri)
- [ ] Export CSV data booking
- [ ] Search booking
- [ ] Loading skeleton & empty states yang rapi

## 🚫 Sengaja TIDAK dikerjakan (hindari over-engineering untuk demo)
- Payment gateway, multi-tenant kompleks, notifikasi email, RBAC berlapis
