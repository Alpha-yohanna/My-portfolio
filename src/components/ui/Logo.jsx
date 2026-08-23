function Logo({ className = "h-8 w-auto" }) {
  return (
    <svg
      viewBox="0 0 128 84"
      className={className}
      role="img"
      aria-label="Alpha Yohanna logo"
    >
      <text
        x="2"
        y="64"
        fontFamily="Inter, 'Helvetica Neue', Arial, sans-serif"
        fontWeight="800"
        fontSize="60"
        letterSpacing="-3"
        fill="#ffffff"
      >
        AY
      </text>
      <line
        x1="6"
        y1="60"
        x2="104"
        y2="14"
        stroke="#F28C28"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="111" cy="9" r="4.5" fill="#F28C28" />
    </svg>
  );
}

export default Logo;
