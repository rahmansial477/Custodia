import React from 'react';

interface CustodiaLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
  textSize?: string;
  variant?: 'light' | 'dark';
}

export const CustodiaLogo: React.FC<CustodiaLogoProps> = ({
  className = '',
  size = 40,
  showText = false,
  textSize = 'text-2xl',
  variant = 'light',
}) => {
  const isDark = variant === 'dark';

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Precision Vector Custodia Shield Logo */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-200"
      >
        {/* Shield / Pin Badge Outer Body in Terracotta Rust */}
        <path
          d="M 50 92 C 32 76 18 56 18 36 C 18 21 31 12 50 12 C 69 12 82 21 82 36 C 82 56 68 76 50 92 Z"
          fill="#c54b2a"
        />

        {/* Central Bold White Letter 'C' */}
        <path
          d="M 64 34 H 50 C 40 34 33 41 33 50 C 33 59 40 66 50 66 H 64 V 52 H 52 V 48 H 64 V 34 Z
             M 49 43 C 53 43 55 45 55 50 C 55 55 53 57 49 57 C 45 57 43 55 43 50 C 43 45 45 43 49 43 Z"
          fill="#ffffff"
          fillRule="evenodd"
        />
      </svg>

      {showText && (
        <div>
          <span
            className={`font-serif font-bold ${textSize} tracking-tight ${
              isDark ? 'text-white' : 'text-[#1f1b15]'
            }`}
          >
            Custodia
          </span>
          <span
            className={`block text-[10px] font-sans font-medium tracking-widest uppercase -mt-1 ${
              isDark ? 'text-[#a89c8a]' : 'text-[#8b716b]'
            }`}
          >
            Anti-Scalping Protocol
          </span>
        </div>
      )}
    </div>
  );
};
