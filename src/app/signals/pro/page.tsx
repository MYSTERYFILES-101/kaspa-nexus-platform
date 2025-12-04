'use client';

import { useTranslations } from 'next-intl';
import { GlassCard } from '@/components/ui/GlassCard';

export default function SignalsProPage() {
  const t = useTranslations('signals');

  return (
    <div className="py-4 md:py-6 lg:py-8">
      {/* Page Header */}
      <GlassCard className="p-4 md:p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-lg flex-shrink-0">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-4xl font-bold">{t('pro.title')}</h1>
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white text-sm font-bold">
                {t('pro.badge')}
              </span>
            </div>
            <p className="text-[var(--color-text-muted)] text-sm md:text-base">{t('pro.description')}</p>
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
              <p className="text-sm text-[var(--color-text-muted)]">{t('unlockFeatures')}</p>
            </div>
          </div>
          <button disabled className="px-6 py-3 rounded-lg bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-semibold opacity-50 cursor-not-allowed">
            {t('upgradeToPro')}
          </button>
        </div>
      </GlassCard>

      {/* Premium Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <GlassCard className="p-6 opacity-50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[var(--color-success)]/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-[var(--color-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold">{t('features.tripleAi')}</h3>
          </div>
          <p className="text-sm text-[var(--color-text-muted)]">{t('features.tripleAiDesc')}</p>
        </GlassCard>

        <GlassCard className="p-6 opacity-50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[var(--color-warning)]/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-[var(--color-warning)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold">{t('features.realtime')}</h3>
          </div>
          <p className="text-sm text-[var(--color-text-muted)]">{t('features.realtimeDesc')}</p>
        </GlassCard>

        <GlassCard className="p-6 opacity-50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="font-semibold">{t('features.analytics')}</h3>
          </div>
          <p className="text-sm text-[var(--color-text-muted)]">{t('features.analyticsDesc')}</p>
        </GlassCard>

        <GlassCard className="p-6 opacity-50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[var(--color-error)]/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-[var(--color-error)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <h3 className="font-semibold">{t('features.alerts')}</h3>
          </div>
          <p className="text-sm text-[var(--color-text-muted)]">{t('features.alertsDesc')}</p>
        </GlassCard>
      </div>

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
