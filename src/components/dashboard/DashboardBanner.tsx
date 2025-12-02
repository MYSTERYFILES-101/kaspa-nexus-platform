'use client';

import { useTranslations } from 'next-intl';

interface DashboardBannerProps {
  title?: string;
  subtitle?: string;
  videoSrc?: string;
  posterSrc?: string;
}

export function DashboardBanner({
  title,
  subtitle,
  videoSrc,
  posterSrc,
}: DashboardBannerProps) {
  const t = useTranslations('dashboard');

  return (
    <div className="dashboard-banner">
      {/* Video or Gradient Background */}
      {videoSrc ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={posterSrc}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,212,255,0.15)] via-transparent to-[rgba(157,78,221,0.15)]">
          {/* Animated Network Pattern */}
          <svg
            className="absolute inset-0 w-full h-full opacity-20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="grid"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-[var(--color-primary)]"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Glowing Dots */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse-glow" />
          <div className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full bg-[var(--color-secondary)] animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse-glow" style={{ animationDelay: '1s' }} />
        </div>
      )}

      {/* Content Overlay */}
      <div className="dashboard-banner-content">
        <h1 className="dashboard-title">
          <span className="text-gradient">{title || t('welcome')}</span>
          {!title && ' KASPA-NEXUS'}
        </h1>
        <p className="dashboard-subtitle">
          {subtitle || t('subtitle')}
        </p>
      </div>
    </div>
  );
}
