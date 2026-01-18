import Link from "next/link";
import { Star } from "lucide-react";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Pricing", href: "#pricing" },
  { name: "Docs", href: "/docs" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 px-6 lg:px-16 py-5 z-100 bg-[#09090b]/80 backdrop-blur-xl border-b border-[#27272a]">
      <div className="grid grid-cols-3 items-center">
        <Link href="/" className="flex items-center gap-2.5 justify-start">
          <span className="font-bold text-xl tracking-tight">Taisetsu</span>
        </Link>

        <ul className="hidden md:flex justify-center gap-10">
          {navLinks.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="text-zinc-400 text-sm font-medium hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex justify-end items-center gap-3">
          <Link
            href="https://github.com/zenweb3/taisetsu"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-md text-sm font-semibold text-zinc-300 border border-[#27272a] hover:bg-[#1a1a1f] hover:border-[#3f3f46] hover:text-white transition-all flex items-center gap-2"
          >
            <Star className="text-amber-600" />
            Star on Github
          </Link>

          <Link
            href="#"
            className="px-4 py-2.5 rounded-md text-sm font-semibold bg-white text-[#09090b] hover:bg-zinc-200 hover:-translate-y-0.5 transition-all"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
