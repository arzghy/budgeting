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
      {/* body — soft pink #f6dbe2 */}
      <ellipse cx="100" cy="110" rx="55" ry="42" fill="#f6dbe2" />
      {/* head bump — rounder, cuter */}
      <circle cx="80" cy="95" r="30" fill="#f6dbe2" />
      {/* belly — cream #f6ffd3 */}
      <ellipse cx="100" cy="128" rx="40" ry="18" fill="#f6ffd3" />
      {/* tail connector */}
      <path
        d="M150 108 Q162 108 168 100"
        stroke="#f6dbe2"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />
      {/* tail flukes — sage green #c2d772 */}
      <path
        d="M165 95 Q185 75 180 95 Q178 105 168 100 Q178 115 172 120 Q165 112 165 105 Z"
        fill="#c2d772"
        stroke="#a8b85a"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* dorsal fin — sage green */}
      <ellipse cx="110" cy="72" rx="8" ry="12" fill="#c2d772" transform="rotate(-15 110 72)" />
      {/* side fin — coral pink #f6c5c1 */}
      <path
        d="M85 135 Q75 155 85 158 Q92 152 90 138 Z"
        fill="#f6c5c1"
        stroke="#e0a5a0"
        strokeWidth="1.5"
      />
      {/* spout lines — multicolor pastel */}
      <path d="M75 68 Q72 50 68 38" stroke="#f6c5c1" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M75 68 Q78 48 82 35" stroke="#c2d772" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M75 68 Q75 46 75 32" stroke="#f6dbe2" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* spout droplets */}
      <circle cx="68" cy="34" r="3.5" fill="#f6c5c1" />
      <circle cx="82" cy="31" r="3.5" fill="#c2d772" />
      <circle cx="75" cy="28" r="3.5" fill="#f6dbe2" />
      {/* eye white */}
      <ellipse cx="68" cy="100" rx="9" ry="10" fill="white" />
      {/* pupil — big kawaii */}
      <circle cx="68" cy="101" r="6" fill="#2d1b2e" />
      {/* eye sparkle */}
      <circle cx="71" cy="98" r="2.5" fill="white" />
      <circle cx="66" cy="103" r="1.2" fill="white" />
      {/* cheek — warm coral blush */}
      <circle cx="58" cy="115" r="7" fill="#f6c5c1" opacity="0.55" />
      {/* smile — cute curve */}
      <path
        d="M60 118 Q70 126 80 120"
        stroke="#c97b7b"
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
      <ellipse cx="100" cy="110" rx="55" ry="42" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="80" cy="95" r="30" fill="none" stroke="currentColor" strokeWidth="3" />
      <path
        d="M165 95 Q185 75 180 95 Q178 105 168 100 Q178 115 172 120 Q165 112 165 105 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  );
}
