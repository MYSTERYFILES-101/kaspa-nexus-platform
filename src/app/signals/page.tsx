'use client';

import { useTranslations } from 'next-intl';
import { GlassCard } from '@/components/ui/GlassCard';

export default function SignalsBoardPage() {
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
          <div>
            <h1 className="text-2xl md:text-4xl font-bold">{t('board.title')}</h1>
            <p className="text-[var(--color-text-muted)] text-sm md:text-base">{t('board.description')}</p>
          </div>
        </div>
      </GlassCard>

      {/* Signal Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <GlassCard className="p-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-[var(--color-success)]">87%</div>
            <div className="text-sm text-[var(--color-text-muted)]">{t('stats.winRate')}</div>
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-[var(--color-primary)]">156</div>
            <div className="text-sm text-[var(--color-text-muted)]">{t('stats.signalsToday')}</div>
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-[var(--color-warning)]">3</div>
            <div className="text-sm text-[var(--color-text-muted)]">{t('stats.aiValidation')}</div>
          </div>
        </GlassCard>
      </div>

      {/* Recent Signals Placeholder */}
      <GlassCard className="p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">{t('recentSignals')}</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] opacity-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-success)]/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[var(--color-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium">KASPA/USDT</div>
                  <div className="text-sm text-[var(--color-text-muted)]">Long Signal</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-[var(--color-success)]">+12.5%</div>
                <div className="text-sm text-[var(--color-text-muted)]">2h ago</div>
              </div>
            </div>
          ))}
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
