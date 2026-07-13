// Kredensial akun demo (read-friendly) untuk tombol "Login sebagai Demo".
// Aman ditaruh di client karena memang sengaja publik untuk showcase portfolio.
export const DEMO_EMAIL = "demo@bookflow.app";
export const DEMO_PASSWORD = "demobookflow";
export const DEMO_BUSINESS = "Barbershop Demo";
export const DEMO_NAME = "Akun Demo";

// Akun demo bersifat read-only supaya data contoh tidak rusak oleh pengunjung.
export const DEMO_READONLY_MSG =
  "Mode demo bersifat read-only — perubahan tidak disimpan. Daftar akun untuk mengelola data sendiri.";

export function isDemoEmail(email?: string | null): boolean {
  return email === DEMO_EMAIL;
}
