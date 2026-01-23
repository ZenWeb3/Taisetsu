import Link from "next/link";

const footerLinks = [
  { name: "Docs", href: "/docs" },
  { name: "GitHub", href: "https://github.com/zenweb3/taisetsu" },
  { name: "Discord", href: "https://discord.gg/zenfiweb3" },
  { name: "Twitter", href: "https://twitter.com/zenonchain" },
];

export default function Footer() {
  return (
    <footer className="px-6 lg:px-16 py-8 border-t border-[#27272a] flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
      <div className="flex items-center gap-2.5">
        <span className="font-bold text-xl tracking-tight">Taisetsu</span>
      </div>

      <div className="flex gap-8">
        {footerLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={
              link.href.startsWith("http") ? "noopener noreferrer" : undefined
            }
            className="text-zinc-600 text-sm hover:text-zinc-300 transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </div>

      <p className="text-zinc-700 text-xs">
        Built for{" "}
        <Link
          href="https://dorahacks.io/hackathon/cronos-x402"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-500 hover:text-white transition-colors"
        >
          Cronos x402 Hackathon
        </Link>
      </p>
    </footer>
  );
}
