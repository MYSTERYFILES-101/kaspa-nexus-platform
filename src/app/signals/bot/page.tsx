'use client';

import { useTranslations } from 'next-intl';
import { GlassCard } from '@/components/ui/GlassCard';

export default function TradingBotPage() {
  const t = useTranslations('signals');

  return (
    <div className="py-4 md:py-6 lg:py-8">
      {/* Page Header */}
      <GlassCard className="p-4 md:p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-lg flex-shrink-0">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-4xl font-bold">{t('bot.title')}</h1>
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold">
                {t('bot.badge')}
              </span>
            </div>
            <p className="text-[var(--color-text-muted)] text-sm md:text-base">{t('bot.description')}</p>
          </div>
        </div>
      </GlassCard>

      {/* Requires Pro+ Banner */}
      <GlassCard className="p-6 mb-6 border-purple-500/30 bg-purple-500/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">{t('requiresProPlus')}</h3>
              <p className="text-sm text-[var(--color-text-muted)]">{t('unlockBotFeatures')}</p>
            </div>
          </div>
          <button disabled className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold opacity-50 cursor-not-allowed">
            {t('upgradeToProPlus')}
          </button>
        </div>
      </GlassCard>

      {/* Bot Configuration Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <GlassCard className="p-6 opacity-50">
          <h3 className="text-lg font-semibold mb-4">{t('bot.config')}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--color-text-secondary)]">
                {t('bot.exchange')}
              </label>
              <select disabled className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] cursor-not-allowed">
                <option>Binance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--color-text-secondary)]">
                {t('bot.strategy')}
              </label>
              <select disabled className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] cursor-not-allowed">
                <option>AI Signal Follow</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--color-text-secondary)]">
                {t('bot.riskLevel')}
              </label>
              <div className="flex gap-2">
                {['Low', 'Medium', 'High'].map((level) => (
                  <button key={level} disabled className="flex-1 py-2 px-4 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-sm cursor-not-allowed">
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6 opacity-50">
          <h3 className="text-lg font-semibold mb-4">{t('bot.status')}</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
              <span className="text-[var(--color-text-secondary)]">{t('bot.botStatus')}</span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--color-text-muted)]"></span>
                <span className="text-[var(--color-text-muted)]">{t('bot.offline')}</span>
              </span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
              <span className="text-[var(--color-text-secondary)]">{t('bot.trades24h')}</span>
              <span className="font-bold">0</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
              <span className="text-[var(--color-text-secondary)]">{t('bot.profit24h')}</span>
              <span className="font-bold text-[var(--color-text-muted)]">$0.00</span>
            </div>
            <button disabled className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-[var(--color-success)] to-green-400 text-white font-semibold opacity-50 cursor-not-allowed">
              {t('bot.startBot')}
            </button>
          </div>
        </GlassCard>
      </div>

      {/* Bot Features */}
      <GlassCard className="p-6 mb-6 opacity-50">
        <h3 className="text-lg font-semibold mb-4">{t('bot.features')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
            <svg className="w-8 h-8 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <div>
              <div className="font-medium">{t('bot.autoTrade')}</div>
              <div className="text-sm text-[var(--color-text-muted)]">{t('bot.autoTradeDesc')}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
            <svg className="w-8 h-8 text-[var(--color-warning)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <div>
              <div className="font-medium">{t('bot.riskManagement')}</div>
              <div className="text-sm text-[var(--color-text-muted)]">{t('bot.riskManagementDesc')}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
            <svg className="w-8 h-8 text-[var(--color-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <div>
              <div className="font-medium">{t('bot.performance')}</div>
              <div className="text-sm text-[var(--color-text-muted)]">{t('bot.performanceDesc')}</div>
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
