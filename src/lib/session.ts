import { auth } from "@/auth";

// Helper untuk mengambil user aktif di Server Component / Server Action.
// Selalu verifikasi via ini di dalam kode yang butuh auth — jangan hanya
// mengandalkan proxy (lihat catatan keamanan Next 16).
export async function getCurrentUser() {
  const session = await auth();
  return session?.user ?? null;
}
