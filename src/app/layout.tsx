import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display-face",
});

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans-face",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono-face",
});

export const metadata: Metadata = {
  title: "BookFlow — Booking & Analytics untuk bisnis jasa",
  description:
    "Mini SaaS untuk mengelola booking pelanggan dan melihat analitik bisnis jasa (salon, barbershop, dan sejenisnya).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
