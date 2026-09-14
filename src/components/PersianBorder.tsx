export function PersianBorder({ position = 'top', variant = 'classic' }: { position?: 'top' | 'bottom' | 'both'; variant?: 'classic' | 'modern' | 'royal' }) {
  const renderPattern = () => {
    if (variant === 'classic') {
      return (
        <svg width="100%" height="48" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <pattern id="persianClassic" x="0" y="0" width="96" height="48" patternUnits="userSpaceOnUse">
              {/* Background */}
              <rect width="96" height="48" fill="#fef3e2" />
              
              {/* Central 8-pointed star */}
              <g transform="translate(48, 24)">
                <polygon 
                  points="0,-18 5,-5 18,0 5,5 0,18 -5,5 -18,0 -5,-5" 
                  fill="none" 
                  stroke="#e85d04" 
                  strokeWidth="1.5"
                />
                <polygon 
                  points="0,-12 3.5,-3.5 12,0 3.5,3.5 0,12 -3.5,3.5 -12,0 -3.5,-3.5" 
                  fill="#ffba08" 
                  opacity="0.6"
                />
                <circle cx="0" cy="0" r="3" fill="#e85d04" />
              </g>
              
              {/* Corner decorations */}
              <g transform="translate(0, 0)">
                <path d="M 0 12 Q 6 6 12 0" fill="none" stroke="#006d77" strokeWidth="1.2" />
                <path d="M 0 8 Q 4 4 8 0" fill="none" stroke="#006d77" strokeWidth="0.8" opacity="0.6" />
                <circle cx="3" cy="3" r="1.5" fill="#e85d04" />
              </g>
              <g transform="translate(96, 0)">
                <path d="M 0 12 Q -6 6 -12 0" fill="none" stroke="#006d77" strokeWidth="1.2" />
                <path d="M 0 8 Q -4 4 -8 0" fill="none" stroke="#006d77" strokeWidth="0.8" opacity="0.6" />
                <circle cx="-3" cy="3" r="1.5" fill="#e85d04" />
              </g>
              <g transform="translate(0, 48)">
                <path d="M 0 -12 Q 6 -6 12 0" fill="none" stroke="#006d77" strokeWidth="1.2" />
                <path d="M 0 -8 Q 4 -4 8 0" fill="none" stroke="#006d77" strokeWidth="0.8" opacity="0.6" />
                <circle cx="3" cy="-3" r="1.5" fill="#e85d04" />
              </g>
              <g transform="translate(96, 48)">
                <path d="M 0 -12 Q -6 -6 -12 0" fill="none" stroke="#006d77" strokeWidth="1.2" />
                <path d="M 0 -8 Q -4 -4 -8 0" fill="none" stroke="#006d77" strokeWidth="0.8" opacity="0.6" />
                <circle cx="-3" cy="-3" r="1.5" fill="#e85d04" />
              </g>
              
              {/* Connecting lines */}
              <line x1="12" y1="24" x2="30" y2="24" stroke="#e85d04" strokeWidth="0.8" opacity="0.4" />
              <line x1="66" y1="24" x2="84" y2="24" stroke="#e85d04" strokeWidth="0.8" opacity="0.4" />
              
              {/* Small diamonds */}
              <polygon points="24,24 27,21 30,24 27,27" fill="#006d77" opacity="0.5" />
              <polygon points="66,24 69,21 72,24 69,27" fill="#006d77" opacity="0.5" />
              
              {/* Top/bottom border lines */}
              <line x1="0" y1="1" x2="96" y2="1" stroke="#e85d04" strokeWidth="1.5" />
              <line x1="0" y1="47" x2="96" y2="47" stroke="#e85d04" strokeWidth="1.5" />
              <line x1="0" y1="4" x2="96" y2="4" stroke="#ffba08" strokeWidth="0.5" opacity="0.7" />
              <line x1="0" y1="44" x2="96" y2="44" stroke="#ffba08" strokeWidth="0.5" opacity="0.7" />
            </pattern>
          </defs>
          <rect width="100%" height="48" fill="url(#persianClassic)" />
        </svg>
      );
    }
    
    if (variant === 'modern') {
      return (
        <svg width="100%" height="32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <pattern id="persianModern" x="0" y="0" width="64" height="32" patternUnits="userSpaceOnUse">
              <rect width="64" height="32" fill="#fff8ef" />
              
              {/* Geometric pattern */}
              <g transform="translate(32, 16)">
                <path d="M 0 -12 L 8 -4 L 8 4 L 0 12 L -8 4 L -8 -4 Z" 
                      fill="none" stroke="#e85d04" strokeWidth="1" />
                <path d="M 0 -8 L 5 -3 L 5 3 L 0 8 L -5 3 L -5 -3 Z" 
                      fill="#ffba08" opacity="0.4" />
                <circle cx="0" cy="0" r="2" fill="#006d77" />
              </g>
              
              {/* Side dots */}
              <circle cx="8" cy="16" r="1.5" fill="#e85d04" />
              <circle cx="56" cy="16" r="1.5" fill="#e85d04" />
              
              {/* Connecting lines */}
              <line x1="10" y1="16" x2="24" y2="16" stroke="#006d77" strokeWidth="0.5" opacity="0.5" />
              <line x1="40" y1="16" x2="54" y2="16" stroke="#006d77" strokeWidth="0.5" opacity="0.5" />
              
              {/* Top/bottom borders */}
              <line x1="0" y1="0.5" x2="64" y2="0.5" stroke="#e85d04" strokeWidth="1" />
              <line x1="0" y1="31.5" x2="64" y2="31.5" stroke="#e85d04" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="32" fill="url(#persianModern)" />
        </svg>
      );
    }
    
    // Royal variant
    return (
      <svg width="100%" height="64" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <pattern id="persianRoyal" x="0" y="0" width="128" height="64" patternUnits="userSpaceOnUse">
            <rect width="128" height="64" fill="#fef3e2" />
            
            {/* Central medallion */}
            <g transform="translate(64, 32)">
              {/* Outer star */}
              <polygon 
                points="0,-28 8,-8 28,0 8,8 0,28 -8,8 -28,0 -8,-8" 
                fill="none" 
                stroke="#e85d04" 
                strokeWidth="1.5"
              />
              {/* Inner star rotated */}
              <polygon 
                points="0,-20 20,0 0,20 -20,0" 
                fill="none" 
                stroke="#ffba08" 
                strokeWidth="1.2"
                transform="rotate(45)"
              />
              {/* Core */}
              <circle cx="0" cy="0" r="8" fill="#006d77" opacity="0.2" />
              <circle cx="0" cy="0" r="5" fill="#e85d04" />
              <circle cx="0" cy="0" r="2" fill="#ffba08" />
            </g>
            
            {/* Side medallions */}
            <g transform="translate(16, 32)">
              <circle cx="0" cy="0" r="6" fill="none" stroke="#006d77" strokeWidth="1" />
              <circle cx="0" cy="0" r="3" fill="#ffba08" />
            </g>
            <g transform="translate(112, 32)">
              <circle cx="0" cy="0" r="6" fill="none" stroke="#006d77" strokeWidth="1" />
              <circle cx="0" cy="0" r="3" fill="#ffba08" />
            </g>
            
            {/* Arabesque curves */}
            <path d="M 24 32 Q 32 20 40 32" fill="none" stroke="#e85d04" strokeWidth="0.8" opacity="0.6" />
            <path d="M 24 32 Q 32 44 40 32" fill="none" stroke="#e85d04" strokeWidth="0.8" opacity="0.6" />
            <path d="M 88 32 Q 96 20 104 32" fill="none" stroke="#e85d04" strokeWidth="0.8" opacity="0.6" />
            <path d="M 88 32 Q 96 44 104 32" fill="none" stroke="#e85d04" strokeWidth="0.8" opacity="0.6" />
            
            {/* Corner ornaments */}
            <g transform="translate(0, 0)">
              <path d="M 0 16 Q 8 8 16 0" fill="none" stroke="#006d77" strokeWidth="1.2" />
              <circle cx="4" cy="4" r="2" fill="#e85d04" />
            </g>
            <g transform="translate(128, 0)">
              <path d="M 0 16 Q -8 8 -16 0" fill="none" stroke="#006d77" strokeWidth="1.2" />
              <circle cx="-4" cy="4" r="2" fill="#e85d04" />
            </g>
            <g transform="translate(0, 64)">
              <path d="M 0 -16 Q 8 -8 16 0" fill="none" stroke="#006d77" strokeWidth="1.2" />
              <circle cx="4" cy="-4" r="2" fill="#e85d04" />
            </g>
            <g transform="translate(128, 64)">
              <path d="M 0 -16 Q -8 -8 -16 0" fill="none" stroke="#006d77" strokeWidth="1.2" />
              <circle cx="-4" cy="-4" r="2" fill="#e85d04" />
            </g>
            
            {/* Top/bottom decorative borders */}
            <line x1="0" y1="2" x2="128" y2="2" stroke="#e85d04" strokeWidth="2" />
            <line x1="0" y1="62" x2="128" y2="62" stroke="#e85d04" strokeWidth="2" />
            <line x1="0" y1="6" x2="128" y2="6" stroke="#ffba08" strokeWidth="0.8" />
            <line x1="0" y1="58" x2="128" y2="58" stroke="#ffba08" strokeWidth="0.8" />
            
            {/* Small diamonds along borders */}
            <polygon points="32,2 34,0 36,2 34,4" fill="#006d77" />
            <polygon points="96,2 98,0 100,2 98,4" fill="#006d77" />
            <polygon points="32,62 34,60 36,62 34,64" fill="#006d77" />
            <polygon points="96,62 98,60 100,62 98,64" fill="#006d77" />
          </pattern>
        </defs>
        <rect width="100%" height="64" fill="url(#persianRoyal)" />
      </svg>
    );
  };

  if (position === 'both') {
    return (
      <>
        <div className="w-full overflow-hidden">{renderPattern()}</div>
        <div className="w-full overflow-hidden rotate-180 mt-auto">{renderPattern()}</div>
      </>
    );
  }

  return (
    <div className={`w-full overflow-hidden ${position === 'bottom' ? 'rotate-180' : ''}`}>
      {renderPattern()}
    </div>
  );
}

export function PersianSideBorder({ position = 'right' }: { position?: 'right' | 'left' }) {
  return (
    <div className={`hidden lg:block fixed top-0 ${position === 'right' ? 'right-0' : 'left-0'} h-full w-6 z-30 pointer-events-none`}>
      <svg width="24" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <pattern id={`sidePattern-${position}`} x="0" y="0" width="24" height="96" patternUnits="userSpaceOnUse">
            <rect width="24" height="96" fill="#fef3e2" />
            
            {/* Vertical line */}
            <line x1="12" y1="0" x2="12" y2="96" stroke="#e85d04" strokeWidth="1" opacity="0.3" />
            
            {/* Repeating medallions */}
            <g transform="translate(12, 24)">
              <polygon points="0,-10 7,-3 7,3 0,10 -7,3 -7,-3" fill="none" stroke="#e85d04" strokeWidth="1" />
              <circle cx="0" cy="0" r="3" fill="#ffba08" />
            </g>
            <g transform="translate(12, 72)">
              <polygon points="0,-10 7,-3 7,3 0,10 -7,3 -7,-3" fill="none" stroke="#006d77" strokeWidth="1" />
              <circle cx="0" cy="0" r="3" fill="#e85d04" />
            </g>
            
            {/* Connecting dots */}
            <circle cx="12" cy="48" r="1.5" fill="#006d77" />
            
            {/* Side borders */}
            <line x1="1" y1="0" x2="1" y2="96" stroke="#e85d04" strokeWidth="1" />
            <line x1="23" y1="0" x2="23" y2="96" stroke="#e85d04" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="24" height="100%" fill={`url(#sidePattern-${position})`} />
      </svg>
    </div>
  );
}
