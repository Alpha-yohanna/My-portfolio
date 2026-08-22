function YangNewsVisual({ compact = false }) {
  return (
    <div
      className={`mx-auto rounded-2xl border border-white/10 bg-obsidian-100 p-5 ${
        compact ? "h-64" : "h-[420px] p-8"
      }`}
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <span className="font-display text-lg tracking-tight text-ink">
          YangNews
        </span>
        <div className="flex gap-2">
          {["WORLD", "TECH", "BUSINESS"].map((label) => (
            <span
              key={label}
              className="font-mono text-[8px] uppercase tracking-wider text-ink-dim"
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className={`mt-4 grid gap-4 ${compact ? "" : "grid-cols-[1.4fr_1fr]"}`}>
        <div>
          <div className="h-2 w-4/5 rounded-full bg-white/20" />
          <div className="mt-2 h-2 w-3/5 rounded-full bg-white/20" />
          <div className="mt-4 space-y-1.5">
            <div className="h-1 w-full rounded-full bg-white/10" />
            <div className="h-1 w-full rounded-full bg-white/10" />
            <div className="h-1 w-2/3 rounded-full bg-white/10" />
          </div>
        </div>

        {!compact && (
          <div className="space-y-3">
            {[0, 1, 2].map((row) => (
              <div key={row} className="border-b border-white/5 pb-2">
                <div className="h-1.5 w-full rounded-full bg-white/15" />
                <div className="mt-1.5 h-1 w-2/3 rounded-full bg-white/10" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default YangNewsVisual;
