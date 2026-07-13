import { describe, it, expect } from "vitest";
import {
  formatRupiah,
  formatDuration,
  toDatetimeLocal,
} from "@/lib/format";

describe("formatRupiah", () => {
  it("memformat dengan pemisah ribuan gaya Indonesia", () => {
    expect(formatRupiah(50000)).toBe("Rp50.000");
    expect(formatRupiah(0)).toBe("Rp0");
    expect(formatRupiah(1234567)).toBe("Rp1.234.567");
  });
});

describe("formatDuration", () => {
  it("memformat menit ke jam + menit", () => {
    expect(formatDuration(45)).toBe("45 mnt");
    expect(formatDuration(60)).toBe("1 jam");
    expect(formatDuration(90)).toBe("1 jam 30 mnt");
    expect(formatDuration(120)).toBe("2 jam");
  });
});

describe("toDatetimeLocal", () => {
  it("mengubah Date jadi string input datetime-local (zero-padded)", () => {
    const d = new Date(2026, 6, 5, 9, 4); // 5 Jul 2026, 09:04
    expect(toDatetimeLocal(d)).toBe("2026-07-05T09:04");
  });
});
