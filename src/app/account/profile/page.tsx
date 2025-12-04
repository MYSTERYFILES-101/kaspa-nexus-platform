'use client';

import { useTranslations } from 'next-intl';
import { GlassCard } from '@/components/ui/GlassCard';

export default function ProfilePage() {
  const t = useTranslations('account');

  return (
    <div className="py-4 md:py-6 lg:py-8">
      {/* Page Header */}
      <GlassCard className="p-4 md:p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-lg flex-shrink-0">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl md:text-4xl font-bold">{t('profile.title')}</h1>
            <span className="inline-flex items-center gap-2 px-3 py-1 mt-2 rounded-full bg-[var(--color-warning)]/10 text-[var(--color-warning)] border border-[var(--color-warning)]/30 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t('comingSoon')}
            </span>
          </div>
        </div>
      </GlassCard>

      {/* Profile Content Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Avatar Section */}
        <GlassCard className="p-6">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[var(--color-bg-tertiary)] border-2 border-dashed border-[var(--color-border)] flex items-center justify-center opacity-50">
              <svg className="w-12 h-12 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <button disabled className="px-4 py-2 rounded-lg bg-[var(--color-primary)]/20 text-[var(--color-primary)] text-sm opacity-50 cursor-not-allowed">
              {t('profile.uploadAvatar')}
            </button>
          </div>
        </GlassCard>

        {/* Profile Form */}
        <GlassCard className="p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">{t('profile.details')}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--color-text-secondary)]">
                {t('profile.name')}
              </label>
              <input
                type="text"
                disabled
                placeholder="Max Mustermann"
                className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] opacity-50 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--color-text-secondary)]">
                {t('profile.email')}
              </label>
              <input
                type="email"
                disabled
                placeholder="email@example.com"
                className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] opacity-50 cursor-not-allowed"
              />
            </div>
            <button disabled className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-semibold opacity-50 cursor-not-allowed">
              {t('profile.save')}
            </button>
          </div>
        </GlassCard>
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
