'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { DashboardBanner } from '@/components/dashboard/DashboardBanner';
import { FeatureBanner } from '@/components/dashboard/FeatureBanner';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { GlassCard } from '@/components/ui/GlassCard';

// Icons for Feature Banners
const NetworkIcon = () => (
  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const SignalsIcon = () => (
  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const PortfolioIcon = () => (
  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
  </svg>
);

export default function Home() {
  const t = useTranslations('dashboard');

  return (
    <div className="py-4 md:py-6 lg:py-8">
      {/* Banner with Intro Video */}
      <DashboardBanner videoSrc="/videos/intro.mp4" />

      {/* What is KASPA-NEXUS Section */}
      <GlassCard padding="lg" className="mb-6">
        <h2 className="text-xl font-bold text-gradient mb-4">
          {t('whatIs')}
        </h2>
        <p className="text-[var(--color-text-secondary)] mb-6">
          {t('description')}
        </p>

        <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">
          {t('features.title')}:
        </h3>
        <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-primary)] mt-0.5">•</span>
            {t('features.threeAi')}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-primary)] mt-0.5">•</span>
            {t('features.quality')}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-primary)] mt-0.5">•</span>
            {t('features.honest')}
          </li>
        </ul>
      </GlassCard>

      {/* Stats Row - Real data coming soon */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatsCard label={t('stats.freeUsers')} value="-" />
        <StatsCard label={t('stats.proUsers')} value="-" variant="success" />
        <StatsCard label={t('stats.winRate')} value="-" variant="warning" />
      </div>

      {/* Feature Banners */}
      <div className="space-y-4 mb-8">
        <FeatureBanner
          title={t('banners.krc20.title')}
          description={t('banners.krc20.description')}
          stats="- Tokens • - DEX • - Wallets"
          cta={t('banners.krc20.cta')}
          href="/krc20/kaspa"
          icon={<NetworkIcon />}
          variant="primary"
        />

        <FeatureBanner
          title={t('banners.signals.title')}
          description={t('banners.signals.description')}
          stats="- aktive Signale • -% Win-Rate"
          cta={t('banners.signals.cta')}
          href="/signals"
          icon={<SignalsIcon />}
          variant="secondary"
        />

        <FeatureBanner
          title={t('banners.portfolio.title')}
          description={t('banners.portfolio.description')}
          cta={t('banners.portfolio.cta')}
          href="/investment/portfolio"
          icon={<PortfolioIcon />}
          variant="gradient"
        />
      </div>

      {/* CTA Section */}
      <GlassCard glow padding="lg" className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          {t('cta.title')}
        </h2>
        <p className="text-[var(--color-text-secondary)] mb-6 max-w-md mx-auto">
          {t('cta.description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/register" className="btn-primary">
            {t('cta.register')}
          </Link>
          <Link href="/account/upgrade" className="btn-secondary">
            {t('cta.discoverPro')}
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}
