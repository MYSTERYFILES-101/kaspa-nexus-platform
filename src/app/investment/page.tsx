'use client';

import { useTranslations } from 'next-intl';
import { GlassCard } from '@/components/ui/GlassCard';

export default function InvestmentBoardPage() {
  const t = useTranslations('investment');

  return (
    <div className="py-4 md:py-6 lg:py-8">
      {/* Page Header */}
      <GlassCard className="p-4 md:p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-lg flex-shrink-0">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-4xl font-bold">{t('board.title')}</h1>
            <p className="text-[var(--color-text-muted)] text-sm md:text-base">{t('board.description')}</p>
          </div>
        </div>
      </GlassCard>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <GlassCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--color-success)]/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-[var(--color-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-[var(--color-success)]">+12.5%</div>
              <div className="text-sm text-[var(--color-text-muted)]">{t('stats.avgReturn')}</div>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold">1,247</div>
              <div className="text-sm text-[var(--color-text-muted)]">{t('stats.activeInvestors')}</div>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--color-warning)]/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-[var(--color-warning)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold">156</div>
              <div className="text-sm text-[var(--color-text-muted)]">{t('stats.trackedTokens')}</div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Investment Options */}
      <GlassCard className="p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">{t('options.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* KRC-20 Tokens */}
          <div className="p-4 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <div>
                <div className="font-medium">{t('options.krc20.title')}</div>
                <div className="text-sm text-[var(--color-text-muted)]">{t('options.krc20.desc')}</div>
              </div>
            </div>
            <div className="text-xs text-[var(--color-text-muted)]">156 Tokens</div>
          </div>

          {/* Kaspa */}
          <div className="p-4 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center">
                <span className="text-white font-bold text-sm">KAS</span>
              </div>
              <div>
                <div className="font-medium">{t('options.kaspa.title')}</div>
                <div className="text-sm text-[var(--color-text-muted)]">{t('options.kaspa.desc')}</div>
              </div>
            </div>
            <div className="text-xs text-[var(--color-success)]">+5.2% (24h)</div>
          </div>

          {/* DeFi */}
          <div className="p-4 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] opacity-50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div>
                <div className="font-medium">{t('options.defi.title')}</div>
                <div className="text-sm text-[var(--color-text-muted)]">{t('options.defi.desc')}</div>
              </div>
            </div>
            <div className="text-xs text-[var(--color-warning)]">{t('comingSoon')}</div>
          </div>
        </div>
      </GlassCard>

      {/* Market Highlights */}
      <GlassCard className="p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">{t('highlights.title')}</h2>
        <div className="space-y-3">
          {/* Placeholder items */}
          {['NACHO', 'KASPER', 'KEKE'].map((token, index) => (
            <div key={token} className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-bg-tertiary)]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center">
                  <span className="text-white font-bold text-xs">{token.charAt(0)}</span>
                </div>
                <div>
                  <div className="font-medium">{token}</div>
                  <div className="text-xs text-[var(--color-text-muted)]">KRC-20</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">$0.0{index + 1}23</div>
                <div className={`text-xs ${index === 1 ? 'text-[var(--color-error)]' : 'text-[var(--color-success)]'}`}>
                  {index === 1 ? '-3.2%' : `+${(index + 1) * 5.1}%`}
                </div>
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
