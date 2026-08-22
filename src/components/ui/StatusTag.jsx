import clsx from "clsx";

const styles = {
  live: "border-accent/40 bg-accent/10 text-accent-soft",
  "in-development": "border-ink/15 bg-ink/5 text-ink-dim",
};

const labels = {
  live: "Live",
  "in-development": "In Development",
};

function StatusTag({ status, className }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-[0.2em]",
        styles[status],
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={clsx(
          "h-1.5 w-1.5 rounded-full",
          status === "live" ? "bg-accent-soft" : "bg-ink-dim",
        )}
      />
      {labels[status]}
    </span>
  );
}

export default StatusTag;
