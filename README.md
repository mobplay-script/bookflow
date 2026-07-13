# BookFlow

> Mini SaaS **Booking & Analytics Dashboard** untuk bisnis jasa (salon, barbershop, dan sejenisnya). Catat booking pelanggan, kelola layanan, dan pahami performa lewat dashboard analitik.

**🔗 Live demo:** **[bookflow-ruddy.vercel.app](https://bookflow-ruddy.vercel.app/)**
**👤 Akun demo:** klik tombol **“Coba Demo” / “Login sebagai Demo”** (tanpa perlu daftar)

<!-- Tips: tambahkan screenshot/GIF dashboard di sini, mis. ![Dashboard](docs/dashboard.png) -->

---

## ✨ Fitur

- **Autentikasi** — register & login (Auth.js v5, password di-hash bcrypt, session JWT), route dashboard terproteksi.
- **Manajemen layanan** — CRUD layanan (nama, durasi, harga, aktif/nonaktif).
- **Manajemen booking** — CRUD booking, filter per status, dan ubah status (pending → dikonfirmasi → selesai / dibatalkan) langsung dari tabel.
- **Dashboard analitik** — kartu metrik (revenue, total booking, booking hari ini, rata-rata nilai), grafik tren revenue/booking (7 & 30 hari), dan layanan terpopuler.
- **Akun demo** — satu klik untuk menjelajah dengan data contoh yang realistis.
- **Keamanan** — setiap operasi data di-scope per pemilik (`where { id, userId }`) sehingga data antar pengguna terisolasi.

## 🛠️ Tech stack

| Area | Teknologi |
|------|-----------|
| Framework | **Next.js 16** (App Router, Server Actions, Proxy) + React 19 |
| Bahasa | TypeScript |
| Styling | Tailwind CSS 4 |
| Database | **Neon Postgres** |
| ORM | **Prisma 7** (driver adapter `@prisma/adapter-neon`) |
| Auth | **Auth.js (NextAuth v5)** — Credentials, JWT |
| Charts | Recharts |
| Validasi | Zod |
| Deploy | Vercel |

### Catatan arsitektur

- **Next.js 16**: middleware kini bernama `proxy.ts` (runtime Node.js). Proteksi route ada di `src/proxy.ts` + callback `authorized` (split config edge-safe di `src/auth.config.ts`).
- **Prisma 7**: URL koneksi berada di `prisma.config.ts` (bukan `schema.prisma`), dan `PrismaClient` memakai driver adapter Neon.
- **Server Actions** dengan `useActionState` untuk seluruh mutasi (auth, layanan, booking) + validasi Zod dan penanganan error di UI.

## 🚀 Menjalankan secara lokal

```bash
# 1. Install dependencies
npm install

# 2. Siapkan environment
cp .env.example .env
# lalu isi DATABASE_URL (pooled connection dari Neon) dan AUTH_SECRET
#   AUTH_SECRET bisa dibuat dengan:  openssl rand -base64 32

# 3. Sinkronkan skema ke database
npm run db:push

# 4. (Opsional) isi data demo
npm run db:seed

# 5. Jalankan
npm run dev
# buka http://localhost:3000
```

### Script yang tersedia

| Script | Fungsi |
|--------|--------|
| `npm run dev` | Menjalankan dev server |
| `npm run build` | Build produksi |
| `npm run db:push` | Sinkronkan skema Prisma ke database |
| `npm run db:seed` | Isi data demo (akun demo + layanan + booking) |
| `npm run db:studio` | Buka Prisma Studio |

## ☁️ Deploy ke Vercel

1. Import repository ini ke Vercel.
2. Set environment variables: **`DATABASE_URL`** (pooled connection Neon) dan **`AUTH_SECRET`**.
3. Deploy. Jalankan `npm run db:push` (sekali) agar tabel tersedia, dan `npm run db:seed` bila ingin data demo.

## 📁 Struktur singkat

```
src/
  app/
    (auth)/login, (auth)/register   # halaman auth
    dashboard/                      # dashboard (terproteksi)
      services/                     # CRUD layanan
      bookings/                     # CRUD booking + filter status
    api/auth/[...nextauth]/         # handler Auth.js
    page.tsx                        # landing page
  components/                       # UI (auth, services, bookings, dashboard)
  lib/                              # prisma, auth helper, actions, schemas, analytics
  auth.ts, auth.config.ts, proxy.ts # konfigurasi Auth.js & proteksi route
prisma/
  schema.prisma, seed.ts
```

---

Project portfolio · GitHub: [github.com/mobplay-script](https://github.com/mobplay-script)
