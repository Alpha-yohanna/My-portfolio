function LifelineVisual({ compact = false }) {
  return (
    <div
      className={`mx-auto flex items-center justify-center ${
        compact ? "h-64" : "h-[420px]"
      }`}
    >
      <div
        className={`w-full max-w-xs rounded-2xl border border-white/10 bg-obsidian-100 p-5 ${
          compact ? "" : "max-w-sm p-7"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim">
            Emergency Balance
          </span>
          <div className="flex items-end gap-0.5">
            {[3, 5, 7, 9].map((h) => (
              <span
                key={h}
                style={{ height: `${h}px` }}
                className="w-1 rounded-full bg-accent-soft/70"
              />
            ))}
          </div>
        </div>

        <div className="mt-4 font-display text-3xl text-ink">₦2,500</div>

        <div className="mt-5 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
          <span className="h-2 w-2 rounded-full bg-accent-soft" />
          <span className="text-xs text-ink-dim">Ready — offline access</span>
        </div>

        <div className="mt-2 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="text-xs text-ink-dim">Top-up — needs connection</span>
        </div>
      </div>
    </div>
  );
}

export default LifelineVisual;
