// Next.js 16: file ini dulunya "middleware.ts". Sekarang bernama "proxy.ts"
// dengan default Node.js runtime (jangan set `runtime` di sini — akan error).
// Memakai authConfig (edge-safe, tanpa bcrypt/Prisma) + callback `authorized`
// untuk memproteksi /dashboard dan mengalihkan user yang sudah login dari
// /login & /register.
import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // Jalankan di semua route kecuali aset statis & endpoint auth API.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
