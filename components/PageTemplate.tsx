import Link from "next/link";
import { AIAssistant } from "@/components/AIAssistant";

export function PageTemplate({ title, subtitle }: { title: string; subtitle: string }) {
  return <div className="space-y-10">
    <section className="gradient-hero rounded-3xl border border-blue-100 p-8 md:p-12">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">CWG Services</p>
      <h1 className="mt-2 text-4xl font-bold text-slate-900 md:text-5xl">{title}</h1>
      <p className="mt-4 max-w-3xl text-lg text-slate-600">{subtitle}</p>
      <div className="mt-6 flex gap-3"><Link href="/order-builder" className="rounded-full bg-blue-600 px-5 py-3 font-semibold text-white">Start AI Order</Link><Link href="/contact" className="rounded-full border border-slate-300 px-5 py-3 font-semibold text-slate-700">Talk to CWG</Link></div>
    </section>
    <AIAssistant page={title} />
  </div>;
}
