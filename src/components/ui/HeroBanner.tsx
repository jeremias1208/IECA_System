import React from 'react';
import defaultHeroImage from '../../data/images/dondi.png';

export interface HeroBannerStat {
  icon: React.ReactNode;
  label: React.ReactNode;
  className?: string;
}

export interface HeroBannerProps {
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  imageSrc?: string;
  stats?: HeroBannerStat[];
  footer?: React.ReactNode;
  children?: React.ReactNode;
  variant?: 'card' | 'wide';
  className?: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  eyebrow,
  title,
  description,
  imageSrc,
  stats = [],
  footer,
  children,
  variant = 'card',
  className = ''
}) => {
  const isWide = variant === 'wide';
  const backgroundImage = imageSrc;

  return (
    <section
      className={`relative w-screen max-w-none bg-ieca-black text-white overflow-hidden border-b-4 border-ieca-coral ${isWide ? '' : 'shadow-lg'} ${className}`}
      style={{ marginLeft: 'calc(50% - 50vw)' }}
    >
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div
        className="absolute inset-0 bg-center bg-cover opacity-40"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ieca-black via-ieca-black/90 to-ieca-black/60" />

      <div className="relative z-10 mx-auto flex h-[360px] max-w-7xl items-center px-4 sm:h-[400px] sm:px-8">
        <div className={`w-full text-left ${children ? 'flex flex-col items-start gap-5' : ''}`}>
        <div className="max-w-3xl space-y-3">
          <div className="w-fit text-xs font-bold uppercase tracking-widest text-ieca-coral bg-ieca-coral/20 px-3 py-1 rounded">
            {eyebrow}
          </div>
          <h1 className={`${isWide ? 'text-4xl sm:text-5xl lg:text-6xl leading-tight' : 'text-3xl sm:text-5xl'} font-serif font-bold text-white`}>
            {title}
          </h1>
          <p className={`${isWide ? 'text-base sm:text-lg max-w-2xl' : 'text-sm sm:text-base'} text-gray-300 leading-relaxed`}>
            {description}
          </p>

          {footer && <div className="pt-2 border-t border-white/10">{footer}</div>}

          {stats.length > 0 && (
            <div className="flex flex-wrap justify-start gap-6 pt-4 border-t border-white/10 text-sm">
              {stats.map((stat, index) => (
                <div key={index} className={`flex items-center gap-2 text-white ${stat.className ?? ''}`}>
                  {stat.icon}
                  <span className="font-bold">{stat.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {children}
        </div>
      </div>
    </section>
  );
};
