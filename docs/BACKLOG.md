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

## 🔒 Fase 1 — Auth
- [ ] Install & konfigurasi Auth.js (NextAuth v5) — credentials provider
- [ ] Generate `AUTH_SECRET`
- [ ] Hash password (bcrypt/argon) saat register
- [ ] Halaman `/register` + `/login` (form + validasi Zod)
- [ ] Middleware proteksi route `/dashboard/*`
- [ ] Session helper (ambil user aktif di server component)

## 🧾 Fase 2 — Services (CRUD Layanan)
- [ ] Halaman `/dashboard/services` (list)
- [ ] Form tambah/edit layanan (nama, durasi, harga, aktif/nonaktif)
- [ ] Server actions: create / update / delete
- [ ] Validasi Zod + handling error di UI

## 📅 Fase 3 — Bookings (CRUD Booking)
- [ ] Halaman `/dashboard/bookings` (list + filter status)
- [ ] Form buat/edit booking (pilih service, nama & telp pelanggan, tanggal/jam)
- [ ] Ubah status (pending → confirmed → done / cancelled)
- [ ] Server actions + validasi
- [ ] (opsional) tampilan kalender

## 📊 Fase 4 — Analytics Dashboard
- [ ] Halaman `/dashboard` (overview)
- [ ] Kartu metrik: total revenue, jumlah booking, booking hari ini, rata-rata nilai
- [ ] Chart tren 7/30 hari (Recharts) — revenue & jumlah booking
- [ ] Breakdown per layanan (service terpopuler)
- [ ] Query agregasi dari tabel Booking

## ✨ Fase 5 — Polish & Rilis
- [ ] Landing page (hero, fitur, CTA "Coba Demo")
- [ ] Setup shadcn/ui untuk komponen konsisten
- [ ] Seed data demo realistis (`prisma/seed.ts`)
- [ ] Tombol **"Login sebagai Demo"** (akun demo read-friendly)
- [ ] README bagus: screenshot/GIF, tech stack, link live demo di atas
- [ ] Dark mode (opsional)
- [ ] Cek responsif mobile
- [ ] Final deploy + verifikasi live demo mulus

---

## 💡 Nice-to-have (kalau ada waktu)
- [ ] Halaman booking publik `/book/[businessSlug]` (pelanggan booking sendiri)
- [ ] Export CSV data booking
- [ ] Search booking
- [ ] Loading skeleton & empty states yang rapi

## 🚫 Sengaja TIDAK dikerjakan (hindari over-engineering untuk demo)
- Payment gateway, multi-tenant kompleks, notifikasi email, RBAC berlapis
