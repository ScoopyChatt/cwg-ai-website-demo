import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "CWG AI Ordering Website",
  description: "Custom Werks Graphics AI-powered ordering and lead capture demo"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container-wrap py-8">{children}</main>
        <footer className="mt-20 border-t border-slate-200 bg-white">
          <div className="container-wrap flex flex-col gap-3 py-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Custom Werks Graphics • AI-powered ordering demo.</p>
            <Link href="/demo-leads" className="text-slate-500 underline hover:text-slate-800">Demo Leads (admin preview)</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
