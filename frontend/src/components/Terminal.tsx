export default function Terminal() {
  return (
    <section className="animate-fade-in-up animate-delay-400 px-6 lg:px-16 pb-24 relative z-10">
      <div className="max-w-2xl mx-auto bg-[#0f0f12] border border-[#27272a] rounded-xl overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 bg-[#141418] border-b border-[#27272a]">
          <div className="w-3 h-3 rounded-full bg-red-800" />
          <div className="w-3 h-3 rounded-full bg-purple-800" />
          <div className="w-3 h-3 rounded-full bg-green-800" />
          <span className="flex-1 text-center font-mono text-xs text-zinc-500 tracking-wide">
            taisetsu — telegram
          </span>
        </div>

        <div className="p-6 font-mono text-sm leading-8">
          <div className="flex gap-3">
            <span className="text-zinc-500">$</span>
            <span className="text-white">
              /create https://api.weather.io/forecast
            </span>
          </div>
          <div className="text-zinc-500 pl-5">Creating payment gate...</div>
          <div className="text-zinc-300 pl-5">✓ Gate deployed</div>
          <div className="text-zinc-500 pl-5">Price: $0.001 per request</div>
          <div className="text-white pl-5">https://taisetsu.sh/g/a8f3k2</div>

          <div className="mt-4" />

          <div className="flex gap-3">
            <span className="text-zinc-500">$</span>
            <span className="text-white">/stats</span>
          </div>
          <div className="text-zinc-300 pl-5">
            Today: 2,847 requests → $2.84 USDC
          </div>
          <div className="text-white pl-5">
            Total: 142,380 requests → $142.38 USDC
            <span className="inline-block w-2 h-4 bg-purple-800 ml-0.5 align-middle cursor-blink" />
          </div>
        </div>
      </div>
    </section>
  );
}
