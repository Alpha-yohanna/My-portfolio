// Shared geometric-construction motif (circle, crosshair, radiating nodes)
// reused with only a color change across the Green, Cream and Navy states,
// so the "engineering diagram" reads as one continuous system evolving
// its palette rather than three unrelated graphics.
function TechnicalDiagram({ className = "", style }) {
  return (
    <svg viewBox="0 0 340 460" className={className} style={style} fill="none" aria-hidden="true">
      <circle cx="190" cy="230" r="110" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1" />
      <circle
        cx="190"
        cy="230"
        r="78"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="1"
        strokeDasharray="2 5"
      />

      <line x1="190" y1="30" x2="190" y2="370" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" />
      <line x1="60" y1="300" x2="320" y2="300" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />
      <line x1="190" y1="420" x2="80" y2="300" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
      <line x1="190" y1="420" x2="270" y2="260" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />

      <line x1="170" y1="30" x2="210" y2="30" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
      <line x1="190" y1="10" x2="190" y2="50" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />

      <circle cx="190" cy="30" r="4" fill="currentColor" fillOpacity="0.9" />
      <circle cx="190" cy="120" r="4" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
      <circle cx="264" cy="185" r="4" fill="currentColor" fillOpacity="0.85" />
      <circle cx="80" cy="300" r="3.5" fill="currentColor" fillOpacity="0.7" />
      <circle cx="270" cy="260" r="3.5" fill="currentColor" fillOpacity="0.7" />
      <circle cx="190" cy="420" r="5" fill="currentColor" fillOpacity="0.95" />
    </svg>
  );
}

export default TechnicalDiagram;
