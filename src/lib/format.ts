// Format angka rupiah tanpa desimal, mis. 50000 -> "Rp50.000".
export function formatRupiah(value: number): string {
  return "Rp" + value.toLocaleString("id-ID");
}

// Format durasi menit -> "1 jam 30 mnt" / "45 mnt".
export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0 && m > 0) return `${h} jam ${m} mnt`;
  if (h > 0) return `${h} jam`;
  return `${m} mnt`;
}

// Format tanggal & jam untuk tampilan, mis. "20 Jul 2026, 14.30".
export function formatDateTime(date: Date): string {
  return date.toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Konversi Date -> string "YYYY-MM-DDTHH:mm" untuk value <input type="datetime-local">.
// Memakai komponen waktu lokal agar cocok dengan input.
export function toDatetimeLocal(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}`
  );
}

export const BOOKING_STATUS_LABEL: Record<string, string> = {
  PENDING: "Menunggu",
  CONFIRMED: "Dikonfirmasi",
  DONE: "Selesai",
  CANCELLED: "Dibatalkan",
};

export const BOOKING_STATUS_BADGE: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  DONE: "bg-green-100 text-green-700",
  CANCELLED: "bg-slate-100 text-slate-500",
};
