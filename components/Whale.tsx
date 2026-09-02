export function Whale({ size = 160, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Sleek Streamlined Whale Body — Sage Green #c2d772 */}
      <path
        d="M25 110 C 35 68, 90 62, 130 72 C 160 80, 175 105, 175 115 C 175 128, 160 138, 142 136 C 122 144, 95 145, 60 138 C 38 132, 22 124, 25 110 Z"
        fill="#c2d772"
        stroke="#4a5440"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Ventral Cream Belly #f6ffd3 */}
      <path
        d="M48 126 C 75 146, 120 142, 148 130 C 132 142, 95 146, 52 135 Z"
        fill="#f6ffd3"
        stroke="#4a5440"
        strokeWidth="2"
      />

      {/* Dorsal Fin */}
      <path
        d="M125 72 Q 136 55, 144 68 Q 138 74, 130 74 Z"
        fill="#a8b85a"
        stroke="#4a5440"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Majestic Tail Flukes */}
      <path
        d="M170 114 C 185 96, 196 102, 192 116 C 184 122, 174 118, 170 118 C 176 126, 186 135, 178 140 C 172 134, 168 124, 166 116 Z"
        fill="#c2d772"
        stroke="#4a5440"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Graceful Pectoral Flipper — Coral Accent #f6c5c1 */}
      <path
        d="M82 132 C 72 152, 85 158, 96 142 C 94 135, 88 132, 82 132 Z"
        fill="#f6c5c1"
        stroke="#4a5440"
        strokeWidth="2"
      />

      {/* Spout Water Mist & Droplets */}
      <path d="M72 65 Q 66 42, 60 30" stroke="#f6c5c1" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M74 65 Q 76 38, 80 26" stroke="#c2d772" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M76 65 Q 84 45, 92 34" stroke="#f6dbe2" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="60" cy="27" r="3.5" fill="#f6c5c1" />
      <circle cx="80" cy="23" r="4" fill="#c2d772" />
      <circle cx="92" cy="31" r="3.5" fill="#f6dbe2" />

      {/* Eye with Soulful Glint */}
      <circle cx="58" cy="102" r="7.5" fill="#2d3527" />
      <circle cx="60.5" cy="99.5" r="2.8" fill="#ffffff" />
      <circle cx="56.5" cy="104" r="1.2" fill="#ffffff" />

      {/* Cute Coral Cheek Blush */}
      <ellipse cx="50" cy="114" rx="6.5" ry="4" fill="#f6c5c1" opacity="0.75" />

      {/* Gentle Whale Smile */}
      <path
        d="M52 118 Q 64 126, 76 118"
        stroke="#4a5440"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function WhaleOutline({ size = 64, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" className={className} fill="none">
      <path
        d="M25 110 C 35 68, 90 62, 130 72 C 160 80, 175 105, 175 115 C 175 128, 160 138, 142 136 C 122 144, 95 145, 60 138 C 38 132, 22 124, 25 110 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M170 114 C 185 96, 196 102, 192 116 C 184 122, 174 118, 170 118 C 176 126, 186 135, 178 140 C 172 134, 168 124, 166 116 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  );
}
