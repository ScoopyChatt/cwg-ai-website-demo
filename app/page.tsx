import Link from "next/link";
import { AIAssistant } from "@/components/AIAssistant";

export default function Home() {
  const cards = ["T-Shirts & Apparel", "Embroidered Polos", "Hats & Headwear", "Corporate Gifts", "Drinkware", "Bags", "Awards", "Trade Show Giveaways", "Event Merch", "Signs & Banners"];
  return <div className="space-y-10">
    <section className="rounded-3xl bg-gradient-to-br from-brand-900 via-slate-900 to-slate-800 p-10">
      <h1 className="text-5xl font-bold">Custom Apparel and Promo Products, Guided by AI</h1>
      <p className="mt-4 max-w-3xl text-slate-200">Tell us what you need. Our AI assistant helps shape your order, gather the right details, and prepare your request for the CWG team.</p>
      <div className="mt-6 flex gap-3"><Link href="/order-builder" className="rounded bg-brand-500 px-5 py-3">Start AI Order</Link><Link href="/apparel" className="rounded border border-slate-500 px-5 py-3">Browse Services</Link></div>
    </section>
    <AIAssistant page="Home" />
    <section><h2 className="text-3xl font-semibold">More Complete Quote Requests. Less Back-and-Forth.</h2></section>
    <section className="grid gap-3 md:grid-cols-5">{cards.map((c)=><div key={c} className="glass rounded p-4">{c}</div>)}</section>
    <section className="grid gap-4 md:grid-cols-2">
      <div className="glass rounded-xl p-5"><h3 className="text-xl font-semibold">Before AI Website</h3><ul className="mt-2 list-disc pl-5 text-slate-300"><li>incomplete quote requests</li><li>missing contact details</li><li>vague project descriptions</li><li>too much back-and-forth</li><li>sales manually qualifies every lead</li></ul></div>
      <div className="glass rounded-xl p-5"><h3 className="text-xl font-semibold">After AI Website</h3><ul className="mt-2 list-disc pl-5 text-slate-300"><li>contact captured first</li><li>project type identified</li><li>artwork status collected</li><li>missing info organized</li><li>sales receives a clean lead summary</li><li>better leads sent to the CWG team</li></ul></div>
    </section>

  </div>;
}
