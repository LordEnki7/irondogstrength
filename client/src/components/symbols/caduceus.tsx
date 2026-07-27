interface CaduceusSymbolProps {
  className?: string;
  size?: number;
}

export default function CaduceusSymbol({ className = "", size = 100 }: CaduceusSymbolProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Staff */}
      <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="3" />
      
      {/* Wings */}
      <path
        d="M35 20 Q25 15 15 25 Q25 30 35 25 Q40 22 35 20Z"
        fill="currentColor"
        opacity="0.7"
      />
      <path
        d="M65 20 Q75 15 85 25 Q75 30 65 25 Q60 22 65 20Z"
        fill="currentColor"
        opacity="0.7"
      />
      
      {/* Left Serpent */}
      <path
        d="M50 25 Q35 30 30 45 Q35 60 50 65 Q65 70 70 85"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
      />
      
      {/* Right Serpent */}
      <path
        d="M50 25 Q65 30 70 45 Q65 60 50 65 Q35 70 30 85"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
      />
      
      {/* Serpent Heads */}
      <circle cx="30" cy="85" r="3" fill="currentColor" />
      <circle cx="70" cy="85" r="3" fill="currentColor" />
      
      {/* Staff Crown/Top */}
      <circle cx="50" cy="10" r="4" fill="currentColor" />
    </svg>
  );
}