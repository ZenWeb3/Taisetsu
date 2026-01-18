import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 px-6 lg:px-16 py-5 flex justify-between items-center z-100 bg-[#09090b]/80 backdrop-blur-xl border-b border-[#27272a]">
      <div className="flex items-center gap-2.5">
        <span className="font-bold text-xl tracking-tight">Taisetsu</span>
      </div>

      <ul className="hidden md:flex gap-10">
        {["Features", "How It Works", "Pricing", "Docs"].map((item) => (
          <li key={item}>
            <Link
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-zinc-400 text-sm font-medium hover:text-white transition-colors"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex gap-3">
        <Link
          href="#"
          className="px-4 py-2.5 rounded-md text-sm font-semibold text-zinc-300 border border-[#27272a] hover:bg-[#1a1a1f] hover:border-[#3f3f46] hover:text-white transition-all"
        >
          Sign In
        </Link>
        <Link
          href="#"
          className="px-4 py-2.5 rounded-md text-sm font-semibold bg-white text-[#09090b] hover:bg-zinc-200 hover:-translate-y-0.5 transition-all"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}
