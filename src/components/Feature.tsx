const features = [
  {
    icon: "◈",
    title: "Zero Config",
    description: "Paste your endpoint URL. We handle the rest — pricing, middleware, deployment.",
  },
  {
    icon: "◇",
    title: "x402 Protocol",
    description: "HTTP-native payments. Clients pay with a single header. No accounts needed.",
  },
  {
    icon: "○",
    title: "USDC Settlements",
    description: "Receive stablecoin payments on Cronos. Sub-second finality, minimal fees.",
  },
  {
    icon: "□",
    title: "Real-time Stats",
    description: "Track requests, revenue, and usage patterns from Telegram or dashboard.",
  },
  {
    icon: "△",
    title: "Non-Custodial",
    description: "Your keys, your funds. Payments settle directly to your wallet.",
  },
  {
    icon: "◎",
    title: "Telegram-First",
    description: "Create gates, check earnings, withdraw — all without leaving the chat.",
  },
];

export default function Features() {
  return (
    <section id="features" className="px-6 lg:px-16 py-24 relative z-10">
      <div className="text-center mb-16">
        <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-3">
          Features
        </p>
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
          Everything you need
        </h2>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#27272a] border border-[#27272a] rounded-xl overflow-hidden">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-[#09090b] p-8 hover:bg-[#0f0f12] transition-colors"
          >
            <div className="text-2xl mb-4 opacity-90">{feature.icon}</div>
            <h3 className="text-lg font-semibold mb-2 tracking-tight">
              {feature.title}
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}