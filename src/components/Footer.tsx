import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-6 lg:px-16 py-8 border-t border-[#27272a] flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
      <div className="flex items-center gap-2.5">
        <span className="font-bold text-xl tracking-tight">Taisetsu</span>
      </div>

      <div className="flex gap-8">
        {["Docs", "GitHub", "Discord", "Twitter"].map((link) => (
          <Link
            key={link}
            href="#"
            className="text-zinc-600 text-sm hover:text-zinc-300 transition-colors"
          >
            {link}
          </Link>
        ))}
      </div>

      <p className="text-zinc-700 text-xs">
        Built for{" "}
        <Link
          href="#"
          className="text-zinc-500 hover:text-white transition-colors"
        >
          Cronos x402 Hackathon
        </Link>
      </p>
    </footer>
  );
}
