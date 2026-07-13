import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";
import {
  DEMO_EMAIL,
  DEMO_PASSWORD,
  DEMO_BUSINESS,
  DEMO_NAME,
} from "../src/lib/demo";

// Seed data demo realistis untuk showcase. Idempotent: akun demo di-reset lalu
// diisi ulang. Data lain di database tidak disentuh.

const SERVICES = [
  { name: "Potong Rambut", durationMin: 30, price: 35000 },
  { name: "Cukur Jenggot", durationMin: 20, price: 20000 },
  { name: "Creambath", durationMin: 60, price: 75000 },
  { name: "Hair Coloring", durationMin: 90, price: 150000 },
  { name: "Paket Grooming", durationMin: 120, price: 200000 },
];

const CUSTOMERS = [
  "Budi Santoso", "Andi Wijaya", "Rizky Pratama", "Dimas Saputra",
  "Fajar Nugroho", "Bagas Permana", "Yoga Aditya", "Reza Firmansyah",
  "Hendra Gunawan", "Agus Setiawan", "Doni Kurniawan", "Iqbal Ramadhan",
  "Galih Prakoso", "Wahyu Hidayat", "Teguh Santoso", "Bayu Aji",
];

// PRNG deterministik (mulberry32) supaya seed konsisten tiap dijalankan.
function makeRng(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

async function main() {
  const rng = makeRng(20260713);
  const pick = <T>(arr: T[]) => arr[Math.floor(rng() * arr.length)];

  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);

  const demo = await prisma.user.upsert({
    where: { email: DEMO_EMAIL },
    update: { passwordHash, name: DEMO_NAME, businessName: DEMO_BUSINESS },
    create: {
      email: DEMO_EMAIL,
      passwordHash,
      name: DEMO_NAME,
      businessName: DEMO_BUSINESS,
    },
  });

  // Reset data demo lama.
  await prisma.booking.deleteMany({ where: { userId: demo.id } });
  await prisma.service.deleteMany({ where: { userId: demo.id } });

  const services = [];
  for (const s of SERVICES) {
    services.push(
      await prisma.service.create({ data: { ...s, userId: demo.id } }),
    );
  }

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const bookings: {
    userId: string;
    serviceId: string;
    customerName: string;
    customerPhone: string | null;
    startTime: Date;
    status: "PENDING" | "CONFIRMED" | "DONE" | "CANCELLED";
    notes: string | null;
  }[] = [];

  // 30 hari ke belakang: mayoritas SELESAI, sedikit dibatalkan.
  for (let d = 30; d >= 1; d--) {
    const count = Math.floor(rng() * 4); // 0..3 booking/hari
    for (let i = 0; i < count; i++) {
      const svc = pick(services);
      const hour = 9 + Math.floor(rng() * 9); // jam 09..17
      const start = new Date(
        startOfToday.getTime() - d * 86400000 + hour * 3600000,
      );
      const roll = rng();
      const status = roll < 0.82 ? "DONE" : roll < 0.92 ? "CANCELLED" : "CONFIRMED";
      bookings.push({
        userId: demo.id,
        serviceId: svc.id,
        customerName: pick(CUSTOMERS),
        customerPhone: rng() < 0.7 ? "0812" + Math.floor(1000000 + rng() * 8999999) : null,
        startTime: start,
        status,
        notes: null,
      });
    }
  }

  // Hari ini + 5 hari ke depan: PENDING / CONFIRMED (jadwal mendatang).
  for (let d = 0; d <= 5; d++) {
    const count = 1 + Math.floor(rng() * 3);
    for (let i = 0; i < count; i++) {
      const svc = pick(services);
      const hour = 9 + Math.floor(rng() * 9);
      const start = new Date(
        startOfToday.getTime() + d * 86400000 + hour * 3600000,
      );
      bookings.push({
        userId: demo.id,
        serviceId: svc.id,
        customerName: pick(CUSTOMERS),
        customerPhone: rng() < 0.7 ? "0813" + Math.floor(1000000 + rng() * 8999999) : null,
        startTime: start,
        status: rng() < 0.5 ? "PENDING" : "CONFIRMED",
        notes: null,
      });
    }
  }

  await prisma.booking.createMany({ data: bookings });

  console.log(
    `Seed selesai: user demo (${DEMO_EMAIL}), ${services.length} layanan, ${bookings.length} booking.`,
  );
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
