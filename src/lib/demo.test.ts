import { describe, it, expect } from "vitest";
import { isDemoEmail, DEMO_EMAIL } from "@/lib/demo";

describe("isDemoEmail", () => {
  it("true untuk email akun demo", () => {
    expect(isDemoEmail(DEMO_EMAIL)).toBe(true);
  });

  it("false untuk email lain / null / undefined", () => {
    expect(isDemoEmail("orang@lain.com")).toBe(false);
    expect(isDemoEmail(null)).toBe(false);
    expect(isDemoEmail(undefined)).toBe(false);
  });
});
