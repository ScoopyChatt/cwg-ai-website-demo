import Link from "next/link";

const links = [
  ["/", "Home"],
  ["/apparel", "Apparel"],
  ["/promotional-products", "Promo Products"],
  ["/screen-printing", "Screen Printing"],
  ["/embroidery", "Embroidery"],
  ["/corporate-gifts", "Corporate Gifts"],
  ["/art-upload", "Art Upload"],
  ["/contact", "Contact"],
  ["/order-builder", "Start AI Order"],
  ["/demo-leads", "Demo Leads"]
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-700 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold text-xl">Custom Werks Graphics</Link>
        <nav className="hidden gap-4 text-sm lg:flex">
          {links.map(([href, text]) => <Link key={href} href={href} className="text-slate-200 hover:text-white">{text}</Link>)}
        </nav>
        <Link href="/order-builder" className="rounded bg-brand-500 px-4 py-2 text-sm font-medium">Start with AI</Link>
      </div>
    </header>
  );
}
