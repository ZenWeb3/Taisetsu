const steps = [
  {
    number: "01",
    title: "Paste your endpoint",
    description:
      "Drop your API URL in the Telegram bot. We analyze and suggest pricing.",
  },
  {
    number: "02",
    title: "Deploy gate",
    description:
      "We generate a proxied URL with x402 payment middleware baked in.",
  },
  {
    number: "03",
    title: "Earn USDC",
    description: "Every request pays you directly. Withdraw anytime.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="px-6 lg:px-16 py-24 bg-[#0f0f12] border-y border-[#27272a] relative z-10"
    >
      <div className="text-center mb-16">
        <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-3">
          How It Works
        </p>
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
          Three steps to revenue
        </h2>
      </div>

      <div className="max-w-xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className={`flex gap-6 items-start py-8 ${
              index !== steps.length - 1 ? "border-b border-[#27272a]" : ""
            }`}
          >
            <div className="shrink-0 w-10 h-10 border border-[#3f3f46] rounded-lg flex items-center justify-center font-mono font-semibold text-sm">
              {step.number}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1 tracking-tight">
                {step.title}
              </h3>
              <p className="text-zinc-500 text-sm">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
