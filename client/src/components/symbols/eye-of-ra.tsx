// Egyptian Eye of Ra - represents protection, royal power, and good health/mind
export default function EyeOfRaSymbol() {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      className="w-full h-full"
    >
      {/* Eye of Ra */}
      <g>
        {/* Outer eye shape */}
        <path d="M10 50 Q25 25 50 30 Q75 25 90 50 Q75 65 50 60 Q25 65 10 50 Z" />
        {/* Inner pupil */}
        <circle cx="50" cy="50" r="12" />
        {/* Eye markings below */}
        <path d="M50 70 Q42 80 35 90" stroke="currentColor" strokeWidth="4" fill="none" />
        <path d="M50 70 Q58 75 65 80" stroke="currentColor" strokeWidth="3" fill="none" />
        {/* Decorative line extending right */}
        <path d="M90 50 Q95 45 100 50" stroke="currentColor" strokeWidth="3" fill="none" />
      </g>
    </svg>
  );
}