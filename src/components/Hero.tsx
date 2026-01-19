import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-32 pb-16 relative z-10">
      <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 bg-[#141418] border border-[#27272a] rounded-full text-sm text-zinc-400 mb-8">
        <span className="w-1.5 h-1.5 bg-green-800 rounded-full" />
        Built on Cronos x402
      </div>

      <h1 className="animate-fade-in-up animate-delay-100 text-5xl sm:text-6xl lg:text-8xl font-extrabold tracking-tight leading-none mb-6 max-w-4xl">
        Monetize any API instantly
      </h1>

      <p className="animate-fade-in-up animate-delay-200 text-lg text-zinc-400 max-w-lg mb-10 font-normal leading-relaxed">
        Turn your endpoints into revenue streams. Paste a URL, set a price,
        start earning USDC. No code changes required.
      </p>

      <div className="animate-fade-in-up animate-delay-300 flex gap-3 flex-wrap justify-center">
        <Link
          href="#"
          className="px-6 py-3.5 rounded-md text-base font-semibold bg-white text-[#09090b] hover:bg-zinc-200 hover:-translate-y-0.5 transition-all"
        >
          Get Started 
        </Link>
        <Link
          href="#"
          className="px-6 py-3.5 rounded-md text-base font-semibold text-zinc-300 border border-[#27272a] hover:bg-[#1a1a1f] hover:border-[#3f3f46] hover:text-white transition-all"
        >
          View Demo
        </Link>
      </div>
    </section>
  );
}