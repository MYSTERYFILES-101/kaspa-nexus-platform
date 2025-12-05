'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

// Board Icon
const BoardIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Portfolio Icon
const PortfolioIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

// Tracker Icon
const TrackerIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const tabs = [
  { id: 'board', href: '/investment', icon: BoardIcon, labelKey: 'board' },
  { id: 'portfolio', href: '/investment/portfolio', icon: PortfolioIcon, labelKey: 'portfolio', badge: 'PRO' },
  { id: 'tracker', href: '/investment/tracker', icon: TrackerIcon, labelKey: 'tracker', badge: 'PRO' },
];

export function InvestmentSwitchbar() {
  const pathname = usePathname();
  const t = useTranslations('investmentSwitchbar');

  const isActive = (href: string) => {
    if (href === '/investment') {
      return pathname === '/investment';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="mb-6">
      <div className="glass-card p-2 rounded-xl">
        <div className="flex items-center justify-center gap-2 md:gap-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = isActive(tab.href);

            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={`
                  flex items-center gap-2 px-4 md:px-6 py-2.5 rounded-lg
                  transition-all duration-200 font-medium text-sm
                  ${active
                    ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/30'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]'
                  }
                `}
              >
                <Icon />
                <span className="hidden md:inline">{t(tab.labelKey)}</span>
                {tab.badge && (
                  <span className={`
                    text-[10px] px-1.5 py-0.5 rounded-full font-bold
                    ${active
                      ? 'bg-white/20 text-white'
                      : 'bg-[var(--color-primary)]/20 text-[var(--color-primary)]'
                    }
                  `}>
                    {tab.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
