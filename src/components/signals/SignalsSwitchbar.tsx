'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

// Board Icon
const BoardIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

// Signals Pro Icon
const SignalsIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

// Trading Bot Icon
const BotIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const tabs = [
  { id: 'board', href: '/signals', icon: BoardIcon, labelKey: 'board' },
  { id: 'pro', href: '/signals/pro', icon: SignalsIcon, labelKey: 'pro', badge: 'PRO' },
  { id: 'bot', href: '/signals/bot', icon: BotIcon, labelKey: 'bot', badge: 'PRO+' },
];

export function SignalsSwitchbar() {
  const pathname = usePathname();
  const t = useTranslations('signalsSwitchbar');

  const isActive = (href: string) => {
    if (href === '/signals') {
      return pathname === '/signals';
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
                  flex items-center gap-2 px-3 md:px-5 py-2.5 rounded-lg
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
                      : tab.badge === 'PRO+'
                        ? 'bg-purple-500/20 text-purple-400'
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
