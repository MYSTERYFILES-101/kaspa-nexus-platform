'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { GlassCard } from '@/components/ui/GlassCard';

export default function SponsorsPage() {
  const t = useTranslations('sponsors');

  return (
    <div className="py-4 md:py-6 lg:py-8">
      {/* Team Banner */}
      <div className="mb-6 rounded-xl overflow-hidden shadow-2xl">
        <Image
          src="/images/banners/banner-team.png"
          alt="Team & Sponsors"
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-4xl font-bold">{t('title')}</h1>
            <p className="text-[var(--color-text-muted)] text-sm md:text-base">{t('subtitle')}</p>
          </div>
        </div>
      </GlassCard>

      {/* What We Need Section */}
      <GlassCard className="p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">{t('whatWeNeed.title')}</h2>
        <p className="text-[var(--color-text-secondary)] mb-6">{t('whatWeNeed.description')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Server / Hosting */}
          <div className="p-4 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-center">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-cyan-500/20 flex items-center justify-center">
              <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            </div>
            <h3 className="font-semibold mb-1">{t('whatWeNeed.server')}</h3>
            <p className="text-xs text-[var(--color-text-muted)]">{t('whatWeNeed.serverDesc')}</p>
          </div>

          {/* Infrastructure */}
          <div className="p-4 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-center">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-purple-500/20 flex items-center justify-center">
              <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="font-semibold mb-1">{t('whatWeNeed.infrastructure')}</h3>
            <p className="text-xs text-[var(--color-text-muted)]">{t('whatWeNeed.infrastructureDesc')}</p>
          </div>

          {/* Services / APIs */}
          <div className="p-4 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-center">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="font-semibold mb-1">{t('whatWeNeed.services')}</h3>
            <p className="text-xs text-[var(--color-text-muted)]">{t('whatWeNeed.servicesDesc')}</p>
          </div>

          {/* Other Resources */}
          <div className="p-4 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-center">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-orange-500/20 flex items-center justify-center">
              <svg className="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="font-semibold mb-1">{t('whatWeNeed.other')}</h3>
            <p className="text-xs text-[var(--color-text-muted)]">{t('whatWeNeed.otherDesc')}</p>
          </div>
        </div>
      </GlassCard>

      {/* Current Sponsors */}
      <GlassCard className="p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">{t('currentSponsors.title')}</h2>

        {/* No Sponsors Yet */}
        <div className="p-8 text-center rounded-xl bg-[var(--color-bg-tertiary)] border border-dashed border-[var(--color-border)]">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-bg-secondary)] flex items-center justify-center">
            <svg className="w-8 h-8 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2 text-[var(--color-text-muted)]">{t('currentSponsors.noSponsors')}</h3>
          <p className="text-sm text-[var(--color-text-muted)]">{t('currentSponsors.beFirst')}</p>
        </div>
      </GlassCard>

      {/* What Sponsors Get */}
      <GlassCard className="p-6 mb-6 border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5">
        <h2 className="text-lg font-semibold mb-4">{t('benefits.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium">{t('benefits.logo')}</h4>
              <p className="text-xs text-[var(--color-text-muted)]">{t('benefits.logoDesc')}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium">{t('benefits.mention')}</h4>
              <p className="text-xs text-[var(--color-text-muted)]">{t('benefits.mentionDesc')}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium">{t('benefits.access')}</h4>
              <p className="text-xs text-[var(--color-text-muted)]">{t('benefits.accessDesc')}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium">{t('benefits.community')}</h4>
              <p className="text-xs text-[var(--color-text-muted)]">{t('benefits.communityDesc')}</p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Contact */}
      <GlassCard className="p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">{t('contact.title')}</h2>
        <p className="text-[var(--color-text-secondary)] mb-4">{t('contact.description')}</p>
        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:sponsors@kaspa-nexus.io"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-medium hover:opacity-90 transition-opacity"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {t('contact.email')}
          </a>
          <a
            href="https://discord.gg/kaspa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#5865F2] text-white font-medium hover:bg-[#4752C4] transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Discord
          </a>
        </div>
      </GlassCard>

      {/* Community Note */}
      <GlassCard className="p-4 border-[var(--color-warning)]/30 bg-[var(--color-warning)]/5">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-[var(--color-warning)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-[var(--color-text-secondary)]">{t('communityNote')}</p>
        </div>
      </GlassCard>
    </div>
  );
}
