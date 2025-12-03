'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { GlassCard } from '@/components/ui/GlassCard';

// DEX type definition
interface DexInfo {
  id: string;
  name: string;
  logo: string;
  url: string;
  type: 'telegram' | 'webapp';
  status: 'active' | 'beta' | 'unstable' | 'offline';
  volume24h: number | null;
  pairs: number;
  features: string[];
}

// DEX data - static/hardcoded for now
const DEX_LIST: DexInfo[] = [
  {
    id: 'kspr-bot',
    name: 'ZealousSwap - KSPR Bot',
    logo: '/images/dex/kspr-bot.png',
    url: 'https://t.me/ksaborNFT_bot',
    type: 'telegram',
    status: 'active',
    volume24h: null,
    pairs: 150,
    features: ['Swaps', 'Limit Orders', 'Portfolio', 'Sniper'],
  },
  {
    id: 'chainge-finance',
    name: 'Chainge Finance',
    logo: '/images/dex/chainge.png',
    url: 'https://dapp.chainge.finance/',
    type: 'webapp',
    status: 'active',
    volume24h: null,
    pairs: 50,
    features: ['Cross-Chain', 'Bridge', 'Routing', 'Wallet'],
  },
  {
    id: 'kasplex',
    name: 'KasPlex',
    logo: '/images/dex/kasplex.png',
    url: 'https://kasplex.org',
    type: 'webapp',
    status: 'active',
    volume24h: null,
    pairs: 200,
    features: ['KRC-20 Deploy', 'Mint', 'Transfer'],
  },
  {
    id: 'kaspa-dex',
    name: 'Kaspa DEX',
    logo: '/images/dex/kaspa-dex.png',
    url: '#',
    type: 'webapp',
    status: 'beta',
    volume24h: null,
    pairs: 0,
    features: ['Swaps', 'Liquidity Pools', 'Limit Orders'],
  },
  {
    id: 'zing-swap',
    name: 'ZingSwap',
    logo: '/images/dex/zingswap.png',
    url: '#',
    type: 'webapp',
    status: 'unstable',
    volume24h: null,
    pairs: 0,
    features: ['Basic Swaps'],
  },
];

// Status badge component
function StatusBadge({ status }: { status: string }) {
  const colors = {
    active: 'bg-[var(--color-success)]/10 text-[var(--color-success)] border-[var(--color-success)]/30',
    beta: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)] border-[var(--color-warning)]/30',
    unstable: 'bg-[var(--color-error)]/10 text-[var(--color-error)] border-[var(--color-error)]/30',
    offline: 'bg-[var(--color-text-muted)]/10 text-[var(--color-text-muted)] border-[var(--color-text-muted)]/30',
  };

  const labels: Record<string, string> = {
    active: 'Active',
    beta: 'Beta',
    unstable: 'Unstable',
    offline: 'Offline',
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${colors[status as keyof typeof colors] || colors.offline}`}>
      {labels[status] || status}
    </span>
  );
}

// Type badge component
function TypeBadge({ type }: { type: string }) {
  const icons: Record<string, JSX.Element> = {
    telegram: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
    webapp: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
      </svg>
    ),
  };

  const labels: Record<string, string> = {
    telegram: 'Telegram Bot',
    webapp: 'Web App',
  };

  return (
    <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
      {icons[type] || icons.webapp}
      <span>{labels[type] || type}</span>
    </div>
  );
}

// DEX Card Component
function DexCard({ dex }: { dex: DexInfo }) {
  const t = useTranslations('dexPage');

  return (
    <a
      href={dex.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <GlassCard className="p-6 h-full hover:border-[var(--color-primary)]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--color-primary-rgb),0.1)]">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="w-14 h-14 rounded-xl bg-[var(--color-bg-start)] border border-[var(--glass-border)] flex items-center justify-center overflow-hidden">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center">
                <span className="text-xl font-bold text-white">{dex.name.charAt(0)}</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold group-hover:text-[var(--color-primary)] transition-colors">
                {dex.name}
              </h3>
              <TypeBadge type={dex.type} />
            </div>
          </div>
          <StatusBadge status={dex.status} />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="glass-card p-3">
            <p className="text-xs text-[var(--color-text-muted)] mb-1">{t('volume24h')}</p>
            <p className="text-sm font-semibold">
              {dex.volume24h ? `$${dex.volume24h.toLocaleString()}` : t('noData')}
            </p>
          </div>
          <div className="glass-card p-3">
            <p className="text-xs text-[var(--color-text-muted)] mb-1">{t('pairs')}</p>
            <p className="text-sm font-semibold">{dex.pairs}+</p>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {dex.features.map((feature) => (
            <span
              key={feature}
              className="px-2 py-1 text-xs rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Visit Link */}
        <div className="mt-4 pt-4 border-t border-[var(--glass-border)] flex items-center justify-between">
          <span className="text-sm text-[var(--color-text-muted)]">{t('visitDex')}</span>
          <svg className="w-5 h-5 text-[var(--color-primary)] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
      </GlassCard>
    </a>
  );
}

export default function DexPage() {
  const t = useTranslations('dexPage');

  return (
    <div className="py-4 md:py-6 lg:py-8">
      {/* Banner */}
      <div className="relative w-full aspect-[21/9] mb-6 rounded-2xl overflow-hidden">
        <Image
          src="/images/banners/dex-banner.png"
          alt="DEX"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-start)]/30 to-transparent" />
      </div>

      {/* Page Header */}
      <GlassCard className="p-4 md:p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-lg flex-shrink-0">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl md:text-4xl font-bold">{t('title')}</h1>
            <p className="text-[var(--color-text-muted)] text-sm md:text-base">{t('subtitle')}</p>
          </div>
        </div>
      </GlassCard>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <GlassCard className="p-4 text-center">
          <p className="text-xs text-[var(--color-text-muted)] uppercase mb-1">{t('totalDexes')}</p>
          <p className="text-2xl font-bold text-[var(--color-primary)]">{DEX_LIST.length}</p>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <p className="text-xs text-[var(--color-text-muted)] uppercase mb-1">{t('activeDexes')}</p>
          <p className="text-2xl font-bold text-[var(--color-success)]">
            {DEX_LIST.filter(d => d.status === 'active').length}
          </p>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <p className="text-xs text-[var(--color-text-muted)] uppercase mb-1">{t('totalPairs')}</p>
          <p className="text-2xl font-bold">
            {DEX_LIST.reduce((sum, d) => sum + d.pairs, 0)}+
          </p>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <p className="text-xs text-[var(--color-text-muted)] uppercase mb-1">{t('totalVolume')}</p>
          <p className="text-2xl font-bold">{t('comingSoon')}</p>
        </GlassCard>
      </div>

      {/* DEX List */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">{t('availableDexes')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEX_LIST.map((dex) => (
            <DexCard key={dex.id} dex={dex} />
          ))}
        </div>
      </div>

      {/* DEX vs CEX Info Section */}
      <GlassCard className="p-6 mb-6">
        <h3 className="text-xl font-bold mb-4 text-gradient">{t('dexVsCex')}</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* DEX Pros */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--color-primary)]">{t('dexAdvantages')}</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-[var(--color-success)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-[var(--color-text-secondary)]">{t('dexPro1')}</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-[var(--color-success)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-[var(--color-text-secondary)]">{t('dexPro2')}</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-[var(--color-success)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-[var(--color-text-secondary)]">{t('dexPro3')}</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-[var(--color-success)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-[var(--color-text-secondary)]">{t('dexPro4')}</span>
              </li>
            </ul>
          </div>

          {/* CEX Comparison */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--color-secondary)]">{t('cexComparison')}</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-[var(--color-warning)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-sm text-[var(--color-text-secondary)]">{t('cexPoint1')}</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-[var(--color-warning)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-sm text-[var(--color-text-secondary)]">{t('cexPoint2')}</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-[var(--color-warning)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-sm text-[var(--color-text-secondary)]">{t('cexPoint3')}</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-[var(--color-warning)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-sm text-[var(--color-text-secondary)]">{t('cexPoint4')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-[var(--color-text-secondary)]">{t('infoNote')}</p>
          </div>
        </div>
      </GlassCard>

      {/* How to Trade Section */}
      <GlassCard className="p-6">
        <h3 className="text-xl font-bold mb-4 text-gradient">{t('howToTrade')}</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center">
              <span className="text-xl font-bold text-[var(--color-primary)]">1</span>
            </div>
            <h4 className="font-semibold mb-2">{t('step1Title')}</h4>
            <p className="text-sm text-[var(--color-text-muted)]">{t('step1Desc')}</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--color-secondary)]/20 flex items-center justify-center">
              <span className="text-xl font-bold text-[var(--color-secondary)]">2</span>
            </div>
            <h4 className="font-semibold mb-2">{t('step2Title')}</h4>
            <p className="text-sm text-[var(--color-text-muted)]">{t('step2Desc')}</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--color-success)]/20 flex items-center justify-center">
              <span className="text-xl font-bold text-[var(--color-success)]">3</span>
            </div>
            <h4 className="font-semibold mb-2">{t('step3Title')}</h4>
            <p className="text-sm text-[var(--color-text-muted)]">{t('step3Desc')}</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
