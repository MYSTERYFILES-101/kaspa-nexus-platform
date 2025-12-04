'use client';

import { useTranslations } from 'next-intl';
import { GlassCard } from '@/components/ui/GlassCard';

export default function SponsorsPage() {
  const t = useTranslations('team');

  return (
    <div className="py-4 md:py-6 lg:py-8">
      {/* Page Header */}
      <GlassCard className="p-4 md:p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-lg flex-shrink-0">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-4xl font-bold">{t('sponsors.title')}</h1>
            <p className="text-[var(--color-text-muted)] text-sm md:text-base">{t('sponsors.subtitle')}</p>
          </div>
        </div>
      </GlassCard>

      {/* No Sponsors Yet */}
      <GlassCard className="p-8 mb-6 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--color-bg-tertiary)] flex items-center justify-center">
          <svg className="w-10 h-10 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold mb-2">{t('sponsors.noSponsors')}</h2>
        <p className="text-[var(--color-text-muted)] mb-6 max-w-md mx-auto">{t('sponsors.noSponsorsDesc')}</p>
      </GlassCard>

      {/* Sponsor Tiers */}
      <GlassCard className="p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">{t('sponsors.tiers.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Bronze */}
          <div className="p-5 rounded-lg border border-[#CD7F32]/30 bg-[#CD7F32]/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#CD7F32] to-[#8B4513] flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[#CD7F32]">{t('sponsors.tiers.bronze.title')}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">{t('sponsors.tiers.bronze.price')}</p>
              </div>
            </div>
            <ul className="text-sm text-[var(--color-text-secondary)] space-y-2">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#CD7F32]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {t('sponsors.tiers.bronze.benefit1')}
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#CD7F32]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {t('sponsors.tiers.bronze.benefit2')}
              </li>
            </ul>
          </div>

          {/* Silver */}
          <div className="p-5 rounded-lg border border-[#C0C0C0]/30 bg-[#C0C0C0]/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C0C0C0] to-[#808080] flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[#808080]">{t('sponsors.tiers.silver.title')}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">{t('sponsors.tiers.silver.price')}</p>
              </div>
            </div>
            <ul className="text-sm text-[var(--color-text-secondary)] space-y-2">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#808080]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {t('sponsors.tiers.silver.benefit1')}
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#808080]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {t('sponsors.tiers.silver.benefit2')}
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#808080]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {t('sponsors.tiers.silver.benefit3')}
              </li>
            </ul>
          </div>

          {/* Gold */}
          <div className="p-5 rounded-lg border border-[#FFD700]/30 bg-[#FFD700]/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[#DAA520]">{t('sponsors.tiers.gold.title')}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">{t('sponsors.tiers.gold.price')}</p>
              </div>
            </div>
            <ul className="text-sm text-[var(--color-text-secondary)] space-y-2">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#DAA520]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {t('sponsors.tiers.gold.benefit1')}
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#DAA520]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {t('sponsors.tiers.gold.benefit2')}
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#DAA520]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {t('sponsors.tiers.gold.benefit3')}
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#DAA520]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {t('sponsors.tiers.gold.benefit4')}
              </li>
            </ul>
          </div>
        </div>
      </GlassCard>

      {/* Contact for Sponsorship */}
      <GlassCard className="p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">{t('sponsors.contact.title')}</h2>
        <p className="text-[var(--color-text-secondary)] mb-4">{t('sponsors.contact.description')}</p>
        <a
          href="mailto:sponsors@kaspa-nexus.com"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-semibold hover:opacity-90 transition-opacity"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {t('sponsors.contact.cta')}
        </a>
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
