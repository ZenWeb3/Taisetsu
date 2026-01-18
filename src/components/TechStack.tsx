const techs = ["Cronos EVM", "x402 Protocol", "Crypto.com SDK", "MCP Server"];

export default function TechStack() {
  return (
    <section className="px-6 lg:px-16 py-16 text-center border-t border-[#27272a] relative z-10">
      <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-6">
        Powered by
      </p>
      <div className="flex justify-center items-center gap-12 flex-wrap">
        {techs.map((tech) => (
          <span key={tech} className="font-mono text-sm text-zinc-600">
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}
