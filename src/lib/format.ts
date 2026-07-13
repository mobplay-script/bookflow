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
