import { AIAssistant } from "@/components/AIAssistant";

export function PageTemplate({ title, subtitle }: { title: string; subtitle: string }) {
  return <div className="space-y-8">
    <section className="rounded-3xl bg-gradient-to-br from-brand-900 to-slate-900 p-10">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="mt-3 max-w-3xl text-slate-200">{subtitle}</p>
    </section>
    <AIAssistant page={title} />
  </div>;
}
