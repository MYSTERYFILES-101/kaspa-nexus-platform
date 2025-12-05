'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

// Kaspa Official Logo (SVG)
const KaspaIcon = () => (
  <Image
    src="/images/logos/kaspa-logo.svg"
    alt="Kaspa"
    width={18}
    height={18}
    className="w-[18px] h-[18px]"
  />
);

const TokensIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const DexIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
);

const DefiIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const InfraIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
  </svg>
);

// Tab configuration
const tabs = [
  { id: 'kaspa', href: '/krc20/kaspa', icon: KaspaIcon, labelKey: 'kaspa' },
  { id: 'tokens', href: '/krc20/tokens', icon: TokensIcon, labelKey: 'tokens' },
  { id: 'dex', href: '/krc20/dex', icon: DexIcon, labelKey: 'dex' },
  { id: 'defi', href: '/krc20/defi', icon: DefiIcon, labelKey: 'defi' },
  { id: 'infrastructure', href: '/krc20/infrastructure', icon: InfraIcon, labelKey: 'infrastructure' },
];

export function Krc20Switchbar() {
  const pathname = usePathname();
  const t = useTranslations('krc20Switchbar');

  const isActive = (href: string) => {
    if (href === '/krc20/tokens') {
      // Match /krc20/tokens and /krc20/tokens/[ticker]
      return pathname === '/krc20/tokens' || pathname.startsWith('/krc20/tokens/');
    }
    return pathname === href;
  };

  return (
    <div className="w-full mb-6">
      <div className="glass-card rounded-2xl p-2 inline-flex w-full justify-center">
        <div className="flex items-center gap-1 md:gap-2 flex-wrap justify-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = isActive(tab.href);

            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-300 whitespace-nowrap
                  ${active
                    ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/30'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--glass-bg)]'
                  }
                `}
              >
                <Icon />
                <span className="hidden sm:inline">{t(tab.labelKey)}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
