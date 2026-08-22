import clsx from "clsx";

function GlassPanel({ as: Tag = "div", className, children, ...props }) {
  return (
    <Tag
      className={clsx(
        "glass-surface rounded-3xl shadow-glass",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

export default GlassPanel;
