function VeriRentVisual({ compact = false }) {
  return (
    <div
      className={`relative mx-auto flex items-center justify-center ${
        compact ? "h-64" : "h-[420px]"
      }`}
    >
      <div
        className={`relative rounded-[2rem] border border-white/15 bg-obsidian-100 shadow-glass ${
          compact ? "h-56 w-32 p-3" : "h-96 w-56 p-4"
        }`}
      >
        <div className="mx-auto h-1 w-8 rounded-full bg-white/15" />

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] p-2">
            <div className="h-6 w-6 rounded-md bg-accent/20" />
            <div className="flex-1 pl-2">
              <div className="h-1.5 w-3/4 rounded-full bg-white/15" />
              <div className="mt-1 h-1.5 w-1/2 rounded-full bg-white/10" />
            </div>
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-soft" />
            <span className="font-mono text-[8px] uppercase tracking-wide text-accent-soft">
              Verified
            </span>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2">
            <div className="h-1.5 w-full rounded-full bg-white/10" />
            <div className="mt-1.5 h-1.5 w-2/3 rounded-full bg-white/10" />
            <div className="mt-2 h-4 w-full rounded-md bg-white/[0.05]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VeriRentVisual;
