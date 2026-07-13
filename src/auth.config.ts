import type { NextAuthConfig } from "next-auth";

// Konfigurasi Auth.js yang AMAN untuk edge/middleware: tidak mengimpor bcrypt
// atau Prisma. Provider (yang butuh Prisma) ditambahkan di `auth.ts`.
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  providers: [], // diisi di auth.ts
  callbacks: {
    // Dipakai middleware untuk memproteksi route.
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

      if (isOnDashboard) {
        return isLoggedIn; // belum login -> di-redirect ke /login otomatis
      }

      // Sudah login tapi buka /login atau /register -> arahkan ke dashboard.
      if (isLoggedIn && (nextUrl.pathname === "/login" || nextUrl.pathname === "/register")) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id ?? "";
        token.businessName = user.businessName ?? "";
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.businessName = token.businessName as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
