'use client';

import { useTranslations } from 'next-intl';
import { GlassCard } from '@/components/ui/GlassCard';

export default function ApiPage() {
  const t = useTranslations('account');

  return (
    <div className="py-4 md:py-6 lg:py-8">
      {/* Page Header */}
      <GlassCard className="p-4 md:p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-lg flex-shrink-0">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl md:text-4xl font-bold">{t('api.title')}</h1>
            <p className="text-[var(--color-text-muted)] text-sm md:text-base">{t('api.description')}</p>
          </div>
        </div>
      </GlassCard>

      {/* Coming Soon Badge */}
      <GlassCard className="p-6 mb-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-warning)]/10 text-[var(--color-warning)] border border-[var(--color-warning)]/30 text-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t('comingSoon')}
          </span>
        </div>
      </GlassCard>

      {/* API Key Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold mb-4">{t('api.keys')}</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] opacity-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">API Key</p>
                  <p className="text-sm text-[var(--color-text-muted)] font-mono">****-****-****-****</p>
                </div>
                <button disabled className="p-2 rounded-lg bg-[var(--color-bg-secondary)] cursor-not-allowed">
                  <svg className="w-5 h-5 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>

            <button disabled className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-semibold opacity-50 cursor-not-allowed">
              {t('api.generate')}
            </button>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold mb-4">{t('api.usage')}</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--color-bg-tertiary)] opacity-50">
              <span className="text-[var(--color-text-secondary)]">{t('api.requests')}</span>
              <span className="font-bold">0 / 1,000</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--color-bg-tertiary)] opacity-50">
              <span className="text-[var(--color-text-secondary)]">{t('api.rateLimit')}</span>
              <span className="font-bold">10 req/min</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[var(--color-bg-tertiary)] opacity-50">
              <div className="h-full w-0 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]"></div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Documentation Link */}
      <GlassCard className="mt-6 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <div>
              <p className="font-medium">{t('api.docs')}</p>
              <p className="text-sm text-[var(--color-text-muted)]">{t('api.docsDesc')}</p>
            </div>
          </div>
          <button disabled className="px-4 py-2 rounded-lg bg-[var(--color-primary)]/20 text-[var(--color-primary)] opacity-50 cursor-not-allowed">
            {t('api.viewDocs')}
          </button>
        </div>
      </GlassCard>

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
