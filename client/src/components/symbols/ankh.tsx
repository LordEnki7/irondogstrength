// Egyptian Ankh symbol - represents life, strength, and vitality
export default function AnkhSymbol() {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      className="w-full h-full"
    >
      {/* Ankh symbol */}
      <g>
        {/* Cross (vertical line) */}
        <rect x="46" y="35" width="8" height="55" />
        {/* Cross (horizontal line) */}
        <rect x="20" y="50" width="60" height="8" />
        {/* Loop at top */}
        <circle cx="50" cy="25" r="18" fill="none" stroke="currentColor" strokeWidth="8" />
      </g>
    </svg>
  );
}