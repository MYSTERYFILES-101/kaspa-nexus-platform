'use client';

import Link from 'next/link';

interface FeatureBannerProps {
  title: string;
  description: string;
  stats?: string;
  cta: string;
  href: string;
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'gradient';
}

export function FeatureBanner({
  title,
  description,
  stats,
  cta,
  href,
  icon,
  variant = 'primary',
}: FeatureBannerProps) {
  const bgClasses = {
    primary: 'from-[rgba(0,212,255,0.1)] to-[rgba(0,212,255,0.05)]',
    secondary: 'from-[rgba(157,78,221,0.1)] to-[rgba(157,78,221,0.05)]',
    gradient: 'from-[rgba(0,212,255,0.1)] to-[rgba(157,78,221,0.1)]',
  };

  const borderClasses = {
    primary: 'border-[rgba(0,212,255,0.2)] hover:border-[rgba(0,212,255,0.4)]',
    secondary: 'border-[rgba(157,78,221,0.2)] hover:border-[rgba(157,78,221,0.4)]',
    gradient: 'border-[rgba(0,212,255,0.2)] hover:border-[rgba(157,78,221,0.4)]',
  };

  return (
    <Link
      href={href}
      className={`block glass-card p-6 bg-gradient-to-r ${bgClasses[variant]} ${borderClasses[variant]} transition-all duration-300 hover:transform hover:-translate-y-1`}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center flex-shrink-0">
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">
            {title}
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] mb-2">
            {description}
          </p>
          {stats && (
            <p className="text-xs text-[var(--color-text-muted)]">
              {stats}
            </p>
          )}
        </div>

        {/* CTA Arrow */}
        <div className="flex items-center gap-2 text-[var(--color-primary)] font-medium text-sm flex-shrink-0">
          {cta}
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
