import { describe, it, expect } from "vitest";
import { registerSchema, serviceSchema, bookingSchema } from "@/lib/schemas";

describe("registerSchema", () => {
  const valid = {
    name: "Budi",
    businessName: "Salon Budi",
    email: "Budi@Example.com",
    password: "password123",
    confirmPassword: "password123",
  };

  it("menerima input valid dan menormalkan email jadi lowercase", () => {
    const r = registerSchema.safeParse(valid);
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.email).toBe("budi@example.com");
  });

  it("menolak jika konfirmasi password tidak cocok", () => {
    const r = registerSchema.safeParse({ ...valid, confirmPassword: "beda" });
    expect(r.success).toBe(false);
  });

  it("menolak password kurang dari 8 karakter", () => {
    const r = registerSchema.safeParse({ ...valid, password: "short", confirmPassword: "short" });
    expect(r.success).toBe(false);
  });

  it("menolak email tidak valid", () => {
    const r = registerSchema.safeParse({ ...valid, email: "bukan-email" });
    expect(r.success).toBe(false);
  });
});

describe("serviceSchema", () => {
  it("meng-coerce durasi & harga string jadi number", () => {
    const r = serviceSchema.safeParse({ name: "Potong", durationMin: "45", price: "50000" });
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data.durationMin).toBe(45);
      expect(r.data.price).toBe(50000);
    }
  });

  it("menolak harga negatif", () => {
    const r = serviceSchema.safeParse({ name: "Potong", durationMin: "30", price: "-1" });
    expect(r.success).toBe(false);
  });

  it("menolak durasi di bawah 5 menit", () => {
    const r = serviceSchema.safeParse({ name: "Potong", durationMin: "1", price: "1000" });
    expect(r.success).toBe(false);
  });
});

describe("bookingSchema", () => {
  it("meng-coerce startTime string jadi Date", () => {
    const r = bookingSchema.safeParse({
      serviceId: "svc1",
      customerName: "Andi",
      startTime: "2026-07-20T14:30",
    });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.startTime).toBeInstanceOf(Date);
  });

  it("menolak serviceId kosong", () => {
    const r = bookingSchema.safeParse({
      serviceId: "",
      customerName: "Andi",
      startTime: "2026-07-20T14:30",
    });
    expect(r.success).toBe(false);
  });

  it("menolak tanggal tidak valid", () => {
    const r = bookingSchema.safeParse({
      serviceId: "svc1",
      customerName: "Andi",
      startTime: "bukan-tanggal",
    });
    expect(r.success).toBe(false);
  });
});
