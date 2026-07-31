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
          d="M 50 92 C 34 78 20 58 20 38 C 20 22 32 12 50 12 C 68 12 80 22 80 38 C 80 58 66 78 50 92 Z"
          fill="#b94a2c"
        />

        {/* Central Bold White Letter 'C' */}
        <path
          d="M 63 36 C 59 32.5 54 31 47 31 C 36.5 31 29 39 29 50 C 29 61 36.5 69 47 69 C 54 69 59 67.5 63 64 L 57 58.5 C 54.5 61 51 62 47 62 C 41.5 62 37 57 37 50 C 37 43 41.5 38 47 38 C 51 38 54.5 39 57 41.5 M 63 50 H 51 V 44 H 63 V 50 Z"
          fill="#ffffff"
        />
        
        {/* Refined C path for pristine crispness */}
        <path
          d="M 63 36.5 L 56.5 41.5 C 54.2 39.2 51 38 47.5 38 C 41.5 38 37 43 37 50 C 37 57 41.5 62 47.5 62 C 51 62 54.2 60.8 56.5 58.5 L 63 63.5 C 59 67.2 53.8 69 47.5 69 C 35.8 69 28.5 60.8 28.5 50 C 28.5 39.2 35.8 31 47.5 31 C 53.8 31 59 32.8 63 36.5 Z"
          fill="#ffffff"
        />
        <path
          d="M 63 52 H 49 V 46 H 63 V 52 Z"
          fill="#ffffff"
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
