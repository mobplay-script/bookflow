import type { DefaultSession } from "next-auth";

// Menambahkan field kustom ke tipe Session & JWT agar `session.user.id` dan
// `businessName` ada type-nya (tidak `any`).
declare module "next-auth" {
  interface User {
    businessName?: string;
  }

  interface Session {
    user: {
      id: string;
      businessName: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    businessName: string;
  }
}
