import { Check } from "lucide-react";
import Link from "next/link";

const pricingFeatures = [
  "Unlimited gates",
  "Real-time analytics",
  "Telegram bot",
  "USDC on Cronos",
  "0% platform fee",
];

export default function Pricing() {
  return (
    <section id="pricing" className="px-6 lg:px-16 py-24 relative z-10">
      <div className="text-center mb-16">
        <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-3">
          Pricing
        </p>
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
          Simple pricing
        </h2>
      </div>

      <div className="max-w-sm mx-auto bg-[#141418] border border-[#27272a] rounded-2xl p-10 text-center">
        <span className="inline-block px-3 py-1.5 bg-white rounded text-xs font-bold text-[#09090b] uppercase tracking-wide mb-5">
          Beta
        </span>
        <div className="text-6xl font-extrabold tracking-tight mb-1">$0</div>
        <p className="text-zinc-500 text-sm mb-8">Free during hackathon</p>

        <ul className="text-left mb-8">
          {pricingFeatures.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-3 py-3 text-zinc-300 text-sm border-b border-[#27272a] last:border-b-0"
            >
              <span className="text-white text-sm"><Check className="size-5"/></span>
              {feature}
            </li>
          ))}
        </ul>

        <Link
          href="https://t.me/@taisetsubot"
          className="block w-full px-6 py-3.5 rounded-md text-base font-semibold bg-white text-[#09090b] hover:bg-zinc-200 transition-all"
        >
          Start Free
        </Link>
        <p className="mt-4 text-xs text-zinc-600">
          Only network gas fees apply
        </p>
      </div>
    </section>
  );
}
