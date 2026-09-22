import React from 'react';
import photoIcon from '../../data/images/icon.png';

interface LogoProps {
  variant?: 'full' | 'compact' | 'light';
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ variant = 'full', size = 'md' }) => {
  const iconSizes = {
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-15 h-15'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Official IECA Emblem Badge */}
      <div className={`${iconSizes[size]}  flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-105`}>
        <img src={photoIcon} alt="IECA Emblem" className="w-full h-full object-cover" />
      </div>

      {/* Brand Typography */}
      {variant !== 'compact' && (
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2">
            <span className={`font-serif font-bold tracking-tight text-ieca-black ${textSizes[size]}`}>
              IECA
            </span>
            <span className="text-[10px] font-sans tracking-wider uppercase font-semibold px-1.5 py-0.5 rounded bg-ieca-coral/10 text-ieca-coral">
              Oficial
            </span>
          </div>
          <span className="text-[11px] font-sans text-ieca-gray leading-tight hidden sm:block font-medium">
            Igreja Evangélica Congregacional em Angola
          </span>
        </div>
      )}
    </div>
  );
};
