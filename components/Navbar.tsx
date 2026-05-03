import Link from "next/link";

const links = [["/", "Home"],["/apparel", "Apparel"],["/promotional-products", "Promo Products"],["/screen-printing", "Screen Printing"],["/embroidery", "Embroidery"],["/corporate-gifts", "Corporate Gifts"],["/art-upload", "Art Upload"],["/contact", "Contact"]];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container-wrap flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-slate-900">Custom Werks Graphics</Link>
        <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
          {links.map(([href, text]) => <Link key={href} href={href} className="text-slate-600 hover:text-slate-900">{text}</Link>)}
        </nav>
        <Link href="/order-builder" className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700">Start with AI</Link>
      </div>
    </header>
  );
}
