import Link from "next/link";
import { Wordmark } from "@/components/brand/wordmark";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <div className="barber-stripe h-1.5 w-full" />
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex justify-center">
            <Link href="/">
              <Wordmark />
            </Link>
          </div>
          <div className="overflow-hidden rounded-xl border border-hair bg-card shadow-[0_18px_40px_-28px_rgba(20,40,32,0.45)]">
            <div className="barber-stripe h-1 w-full" />
            <div className="p-7 sm:p-8">{children}</div>
          </div>
          <p className="mt-6 text-center eyebrow">Booking &amp; analitik · bisnis jasa</p>
        </div>
      </div>
    </div>
  );
}
