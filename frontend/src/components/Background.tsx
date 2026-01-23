export default function Background() {
  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div
        className="fixed top-0 left-0 w-full h-75 pointer-events-none z-1"
        style={{
          background:
            "linear-gradient(to bottom, #09090b 0%, transparent 100%)",
        }}
      />
    </>
  );
}
