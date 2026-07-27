interface ScalesSymbolProps {
  className?: string;
  size?: number;
}

export default function ScalesSymbol({ className = "", size = 100 }: ScalesSymbolProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Central Staff */}
      <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="3" />
      
      {/* Balance Beam */}
      <line x1="15" y1="35" x2="85" y2="35" stroke="currentColor" strokeWidth="2.5" />
      
      {/* Central Pivot */}
      <path
        d="M45 30 L50 20 L55 30 Z"
        fill="currentColor"
      />
      
      {/* Left Scale Pan */}
      <ellipse cx="25" cy="35" rx="12" ry="3" fill="currentColor" opacity="0.6" />
      <path
        d="M13 35 Q13 42 25 42 Q37 42 37 35"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Left chains */}
      <line x1="20" y1="35" x2="20" y2="42" stroke="currentColor" strokeWidth="1" />
      <line x1="30" y1="35" x2="30" y2="42" stroke="currentColor" strokeWidth="1" />
      
      {/* Right Scale Pan */}
      <ellipse cx="75" cy="35" rx="12" ry="3" fill="currentColor" opacity="0.6" />
      <path
        d="M63 35 Q63 42 75 42 Q87 42 87 35"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Right chains */}
      <line x1="70" y1="35" x2="70" y2="42" stroke="currentColor" strokeWidth="1" />
      <line x1="80" y1="35" x2="80" y2="42" stroke="currentColor" strokeWidth="1" />
      
      {/* Life Symbol (Ankh-like) - Left Pan */}
      <circle cx="25" cy="38" r="2" fill="currentColor" opacity="0.8" />
      <line x1="25" y1="40" x2="25" y2="42" stroke="currentColor" strokeWidth="1.5" />
      
      {/* Death Symbol (Cross) - Right Pan */}
      <line x1="73" y1="38" x2="77" y2="38" stroke="currentColor" strokeWidth="1.5" />
      <line x1="75" y1="36" x2="75" y2="40" stroke="currentColor" strokeWidth="1.5" />
      
      {/* Base */}
      <rect x="45" y="78" width="10" height="6" fill="currentColor" />
    </svg>
  );
}