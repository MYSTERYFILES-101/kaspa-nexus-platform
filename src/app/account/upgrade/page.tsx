'use client';

import { useTranslations } from 'next-intl';
import { GlassCard } from '@/components/ui/GlassCard';

interface PlanCardProps {
  name: string;
  price: string;
  features: string[];
  highlighted?: boolean;
  disabled?: boolean;
}

function PlanCard({ name, price, features, highlighted, disabled }: PlanCardProps) {
  const t = useTranslations('account');

  return (
    <GlassCard className={`p-6 h-full ${highlighted ? 'border-[var(--color-primary)]/50 bg-[var(--color-primary)]/5' : ''}`}>
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <div className="text-3xl font-bold text-[var(--color-primary)]">{price}</div>
        <span className="text-sm text-[var(--color-text-muted)]">{t('upgrade.perMonth')}</span>
      </div>

      <ul className="space-y-3 mb-6">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2 text-sm">
            <svg className="w-5 h-5 text-[var(--color-success)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      features: [
        t('upgrade.features.basicData'),
        t('upgrade.features.limitedTokens'),
        t('upgrade.features.communityAccess'),
      ],
    },
    {
      name: t('upgrade.pro'),
      price: '$9.99',
      features: [
        t('upgrade.features.fullData'),
        t('upgrade.features.allTokens'),
        t('upgrade.features.aiSignals'),
        t('upgrade.features.portfolio'),
      ],
      highlighted: true,
    },
    {
      name: t('upgrade.proPlus'),
      price: '$24.99',
      features: [
        t('upgrade.features.everything'),
        t('upgrade.features.apiAccess'),
        t('upgrade.features.tradingBot'),
        t('upgrade.features.prioritySupport'),
      ],
    },
  ];

  return (
    <div className="py-4 md:py-6 lg:py-8">
      {/* Page Header */}
      <GlassCard className="p-4 md:p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-lg flex-shrink-0">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl md:text-4xl font-bold">{t('upgrade.title')}</h1>
            <span className="inline-flex items-center gap-2 px-3 py-1 mt-2 rounded-full bg-[var(--color-warning)]/10 text-[var(--color-warning)] border border-[var(--color-warning)]/30 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t('comingSoon')}
            </span>
          </div>
        </div>
      </GlassCard>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, idx) => (
          <PlanCard
            key={idx}
            name={plan.name}
            price={plan.price}
            features={plan.features}
            highlighted={plan.highlighted}
            disabled
          />
        ))}
      </div>

      {/* Coming Soon Info */}
      <GlassCard className="mt-6 p-4 border-[var(--color-warning)]/30 bg-[var(--color-warning)]/5">
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
