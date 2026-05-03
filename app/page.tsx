import Link from "next/link";
import { AIAssistant } from "@/components/AIAssistant";

const categories = [
  ["👕", "T-Shirts & Apparel", "Company events, teams, schools, and staff apparel."],
  ["🧵", "Embroidered Polos", "Professional branded polos, jackets, and uniforms."],
  ["🧢", "Hats & Headwear", "Caps, beanies, and premium headwear branding."],
  ["🎁", "Corporate Gifts", "Client gifts, appreciation boxes, and onboarding kits."],
  ["🥤", "Drinkware", "Tumblers, mugs, and bottles for daily brand visibility."],
  ["👜", "Bags", "Totes, backpacks, and event-ready carry options."],
  ["🏆", "Awards", "Recognition items for milestones and achievements."],
  ["🎪", "Trade Show Giveaways", "High-volume promo ideas for booth traffic."],
  ["📣", "Event Merch", "Launch apparel and branded event collections."],
  ["🪧", "Signs & Banners", "Large-format graphics for venues and promotions."]
];

export default function Home() {
  return <div className="space-y-16">
    <section className="gradient-hero grid items-center gap-8 rounded-3xl border border-blue-100 p-8 md:grid-cols-2 md:p-12">
      <div>
        <h1 className="section-title">Custom Apparel & Promo Products, Guided by AI</h1>
        <p className="mt-4 text-lg text-slate-600">Tell us what you need. The CWG AI Assistant captures your contact info, project type, artwork needs, quantity, timeline, and budget level so the sales team can follow up faster with better information.</p>
        <div className="mt-6 flex flex-wrap gap-3"><Link href="/order-builder" className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow">Start AI Order</Link><Link href="/promotional-products" className="rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700">Get Product Ideas</Link></div>
        <div className="mt-6 flex flex-wrap gap-2">{["Screen Printing","Embroidery","Promotional Products","Corporate Gifts","Design Help"].map((b)=><span key={b} className="rounded-full bg-white px-3 py-1 text-sm text-slate-700 shadow-sm border border-slate-200">{b}</span>)}</div>
        <p className="mt-4 text-sm text-slate-500">Built for faster quote requests, fewer missing details, and less back-and-forth.</p>
      </div>
      <div className="glass rounded-2xl p-6"><h3 className="text-xl font-bold text-slate-900">AI Order Preview</h3><p className="mt-2 text-slate-600">“I need 124 white and grey t-shirts with a left chest and full back print.”</p><ul className="mt-4 space-y-2 text-sm text-slate-700"><li>✓ Contact captured first</li><li>✓ Project routed to Screen Printing</li><li>✓ Artwork and deadline prompts added</li><li>✓ Missing info checklist prepared</li></ul></div>
    </section>

    <AIAssistant page="Home" />

    <section>
      <h2 className="section-title">Popular Ways CWG Can Help</h2>
      <p className="mt-3 max-w-3xl text-slate-600">Whether you know exactly what you need or only have a rough idea, the AI assistant helps turn it into a complete quote request.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{categories.map(([i,t,d])=><article key={t} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"><p className="text-2xl">{i}</p><h3 className="mt-2 font-semibold text-slate-900">{t}</h3><p className="mt-1 text-sm text-slate-600">{d}</p></article>)}</div>
    </section>

    <section className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6"><h3 className="text-xl font-bold text-rose-900">Before AI Website</h3><ul className="mt-3 space-y-2 text-rose-800"><li>• incomplete quote requests</li><li>• missing contact details</li><li>• vague project descriptions</li><li>• too much back-and-forth</li><li>• sales manually qualifies every lead</li></ul></div>
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6"><h3 className="text-xl font-bold text-emerald-900">After AI Website</h3><ul className="mt-3 space-y-2 text-emerald-800"><li>• contact captured first</li><li>• project type identified</li><li>• artwork status collected</li><li>• missing info organized</li><li>• sales receives a clean lead summary</li><li>• better leads sent to the CWG team</li></ul></div>
    </section>

    <section><h2 className="section-title">How It Works</h2><div className="mt-6 grid gap-4 md:grid-cols-5">{["Enter your contact info","Choose screen printing, embroidery, or promo products","Tell the AI what you need","Share artwork/design needs","CWG follows up with pricing and next steps"].map((s,i)=><div key={s} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-sm font-semibold text-blue-700">Step {i+1}</p><p className="mt-2 text-slate-700">{s}</p></div>)}</div></section>

    <section className="rounded-3xl bg-slate-900 p-8 text-white"><h2 className="text-3xl font-bold">Better Quote Requests Before Sales Ever Touches Them</h2><ul className="mt-4 grid gap-2 md:grid-cols-2 text-slate-200">{["Captures name, email, and phone first","Routes customers by project type","Collects artwork/design status","Asks about quantity, timeline, and budget level","Creates a clean internal sales note","Shows missing information before follow-up","Reduces back-and-forth for the sales team"].map((b)=><li key={b}>✓ {b}</li>)}</ul></section>
  </div>;
}
