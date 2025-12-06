'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { GlassCard } from '@/components/ui/GlassCard';

interface PlanCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  disabled?: boolean;
}

function PlanCard({ name, price, description, features, highlighted, badge, disabled }: PlanCardProps) {
  const t = useTranslations('account');

  return (
    <GlassCard className={`p-6 h-full flex flex-col ${highlighted ? 'border-[var(--color-primary)]/50 bg-[var(--color-primary)]/5 relative' : ''}`}>
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white text-xs font-semibold">
            {badge}
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <div className="text-4xl font-bold text-[var(--color-primary)]">{price}</div>
        <span className="text-sm text-[var(--color-text-muted)]">{t('upgrade.perMonth')}</span>
        <p className="mt-3 text-sm text-[var(--color-text-secondary)]">{description}</p>
      </div>

      <ul className="space-y-3 mb-6 flex-grow">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm">
            <svg className="w-5 h-5 text-[var(--color-success)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-[var(--color-text-secondary)]">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        disabled={disabled}
        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
          highlighted
            ? 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white'
            : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] border border-[var(--color-border)]'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
      >
        {t('upgrade.select')}
      </button>
    </GlassCard>
  );
}

export default function UpgradePage() {
  const t = useTranslations('account');

  const plans = [
    {
      name: t('upgrade.free'),
      price: '$0',
      description: t('upgrade.freeDesc'),
      features: [
        t('upgrade.features.dashboards'),
        t('upgrade.features.tokenData'),
        t('upgrade.features.chatRead'),
        t('upgrade.features.watchlist'),
      ],
    },
    {
      name: t('upgrade.pro'),
      price: '$9.99',
      description: t('upgrade.proDesc'),
      features: [
        t('upgrade.features.allFree'),
        t('upgrade.features.aiSignals'),
        t('upgrade.features.portfolio'),
        t('upgrade.features.aiConsult'),
        t('upgrade.features.chatWrite'),
        t('upgrade.features.prioritySupport'),
      ],
      highlighted: true,
      badge: t('upgrade.popular'),
    },
    {
      name: t('upgrade.proPlus'),
      price: '$29.99',
      description: t('upgrade.proPlusDesc'),
      features: [
        t('upgrade.features.allPro'),
        t('upgrade.features.tradingBot'),
        t('upgrade.features.autoTrade'),
        t('upgrade.features.riskManagement'),
        t('upgrade.features.botStats'),
        t('upgrade.features.vipSupport'),
      ],
    },
  ];

  return (
    <div className="py-4 md:py-6 lg:py-8">
      {/* Account Banner */}
      <div className="mb-6 rounded-xl overflow-hidden shadow-2xl">
        <Image
          src="/images/banners/banner-account.png"
          alt="Account & Shop"
          width={1920}
          height={400}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* Page Header */}
      <GlassCard className="p-4 md:p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-lg flex-shrink-0">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-4xl font-bold">{t('upgrade.title')}</h1>
            <p className="text-[var(--color-text-muted)] text-sm md:text-base">{t('upgrade.subtitle')}</p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-warning)]/10 text-[var(--color-warning)] border border-[var(--color-warning)]/30 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t('comingSoon')}
          </span>
        </div>
      </GlassCard>

      {/* What You Get Section */}
      <GlassCard className="p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">{t('upgrade.whatYouGet')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-xl bg-[var(--color-bg-tertiary)]">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-cyan-500/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <p className="text-sm font-medium">{t('upgrade.benefit1')}</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-[var(--color-bg-tertiary)]">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-purple-500/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm font-medium">{t('upgrade.benefit2')}</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-[var(--color-bg-tertiary)]">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <p className="text-sm font-medium">{t('upgrade.benefit3')}</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-[var(--color-bg-tertiary)]">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-orange-500/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-sm font-medium">{t('upgrade.benefit4')}</p>
          </div>
        </div>
      </GlassCard>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {plans.map((plan, idx) => (
          <PlanCard
            key={idx}
            name={plan.name}
            price={plan.price}
            description={plan.description}
            features={plan.features}
            highlighted={plan.highlighted}
            badge={plan.badge}
            disabled
          />
        ))}
      </div>

      {/* API Info Section */}
      <GlassCard className="p-6 mb-6 border-[var(--color-secondary)]/30 bg-[var(--color-secondary)]/5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[var(--color-secondary)]/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-[var(--color-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-1">{t('upgrade.apiNote')}</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">{t('upgrade.apiNoteDesc')}</p>
          </div>
          <a href="/account/api" className="px-4 py-2 rounded-lg bg-[var(--color-secondary)]/20 text-[var(--color-secondary)] font-medium hover:bg-[var(--color-secondary)]/30 transition-colors opacity-50 pointer-events-none">
            {t('upgrade.viewApi')}
          </a>
        </div>
      </GlassCard>

      {/* Coming Soon Info */}
      <GlassCard className="p-4 border-[var(--color-warning)]/30 bg-[var(--color-warning)]/5">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-[var(--color-warning)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-[var(--color-text-secondary)]">{t('comingSoonDesc')}</p>
        </div>
      </GlassCard>
    </div>
  );
}
