'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { GlassCard } from '@/components/ui/GlassCard';
import { SignalsSwitchbar } from '@/components/signals/SignalsSwitchbar';

export default function SignalsBoardPage() {
  const t = useTranslations('signals');

  return (
    <div className="py-4 md:py-6 lg:py-8">
      {/* Signals Network Banner */}
      <div className="mb-6 rounded-xl overflow-hidden shadow-2xl">
        <Image
          src="/images/banners/banner-singal.png"
          alt="Signals Network"
          width={1920}
          height={400}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* Signals Switchbar */}
      <SignalsSwitchbar />

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
