'use client';

import { useTranslations } from 'next-intl';
import { GlassCard } from '@/components/ui/GlassCard';

export default function PortfolioPage() {
  const t = useTranslations('investment');

  return (
    <div className="py-4 md:py-6 lg:py-8">
      {/* Page Header */}
      <GlassCard className="p-4 md:p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-lg flex-shrink-0">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-4xl font-bold">{t('portfolio.title')}</h1>
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white text-sm font-bold">
                {t('portfolio.badge')}
              </span>
            </div>
            <p className="text-[var(--color-text-muted)] text-sm md:text-base">{t('portfolio.description')}</p>
          </div>
        </div>
      </GlassCard>

      {/* Requires Pro Banner */}
      <GlassCard className="p-6 mb-6 border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">{t('requiresPro')}</h3>
              <p className="text-sm text-[var(--color-text-muted)]">{t('unlockPortfolio')}</p>
            </div>
          </div>
          <button disabled className="px-6 py-3 rounded-lg bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-semibold opacity-50 cursor-not-allowed">
            {t('upgradeToPro')}
          </button>
        </div>
      </GlassCard>

      {/* Portfolio Overview (Disabled) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <GlassCard className="p-6 opacity-50 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">{t('portfolio.overview')}</h3>
          <div className="h-48 flex items-center justify-center rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)]">
            <div className="text-center">
              <svg className="w-12 h-12 mx-auto text-[var(--color-text-muted)] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
              <p className="text-[var(--color-text-muted)]">{t('portfolio.chartPlaceholder')}</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6 opacity-50">
          <h3 className="text-lg font-semibold mb-4">{t('portfolio.summary')}</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-bg-tertiary)]">
              <span className="text-[var(--color-text-secondary)]">{t('portfolio.totalValue')}</span>
              <span className="font-bold">$0.00</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-bg-tertiary)]">
              <span className="text-[var(--color-text-secondary)]">{t('portfolio.profit24h')}</span>
              <span className="font-bold text-[var(--color-text-muted)]">$0.00</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-bg-tertiary)]">
              <span className="text-[var(--color-text-secondary)]">{t('portfolio.holdings')}</span>
              <span className="font-bold">0</span>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Holdings Table (Disabled) */}
      <GlassCard className="p-6 mb-6 opacity-50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{t('portfolio.yourHoldings')}</h3>
          <button disabled className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium cursor-not-allowed">
            {t('portfolio.addAsset')}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-text-secondary)]">{t('portfolio.asset')}</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-[var(--color-text-secondary)]">{t('portfolio.amount')}</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-[var(--color-text-secondary)]">{t('portfolio.price')}</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-[var(--color-text-secondary)]">{t('portfolio.value')}</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-[var(--color-text-secondary)]">{t('portfolio.change24h')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="py-8 text-center text-[var(--color-text-muted)]">
                  {t('portfolio.noHoldings')}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Portfolio Features */}
      <GlassCard className="p-6 mb-6 opacity-50">
        <h3 className="text-lg font-semibold mb-4">{t('portfolio.features')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
            <svg className="w-8 h-8 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <div>
              <div className="font-medium">{t('portfolio.featureTracking')}</div>
              <div className="text-sm text-[var(--color-text-muted)]">{t('portfolio.featureTrackingDesc')}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
            <svg className="w-8 h-8 text-[var(--color-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <div>
              <div className="font-medium">{t('portfolio.featureAi')}</div>
              <div className="text-sm text-[var(--color-text-muted)]">{t('portfolio.featureAiDesc')}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
            <svg className="w-8 h-8 text-[var(--color-warning)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <div>
              <div className="font-medium">{t('portfolio.featureAlerts')}</div>
              <div className="text-sm text-[var(--color-text-muted)]">{t('portfolio.featureAlertsDesc')}</div>
            </div>
          </div>
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
