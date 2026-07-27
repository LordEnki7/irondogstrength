// Egyptian Was Scepter - represents power, dominion, and protection
export default function WasScepterSymbol() {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      className="w-full h-full"
    >
      {/* Was Scepter */}
      <g>
        {/* Main staff */}
        <rect x="46" y="25" width="8" height="60" />
        {/* Animal head at top (stylized) */}
        <path d="M30 15 Q50 5 70 15 Q65 30 50 35 Q35 30 30 15 Z" />
        {/* Forked bottom */}
        <path d="M42 80 L30 95 M42 80 L35 95 M58 80 L70 95 M58 80 L65 95" 
              stroke="currentColor" 
              strokeWidth="4" 
              fill="none" />
      </g>
    </svg>
  );
}