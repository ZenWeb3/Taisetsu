import Link from "next/link";

export default function CTA() {
  return (
    <section className="px-6 lg:px-16 py-24 text-center relative z-10">
      <div className="max-w-lg mx-auto p-12 lg:p-16 border border-[#27272a] rounded-2xl bg-[#0f0f12]">
        <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-3">
          Ready to monetize?
        </h2>
        <p className="text-zinc-500 mb-8">
          Start earning from your APIs in under a minute.
        </p>
        <Link
          href="https://t.me/@taisetsubot"
          
          className="inline-block px-6 py-3.5 rounded-md text-base font-semibold bg-white text-[#09090b] hover:bg-zinc-200 hover:-translate-y-0.5 transition-all"
        >
          Launch App
        </Link>
      </div>
    </section>
  );
}
