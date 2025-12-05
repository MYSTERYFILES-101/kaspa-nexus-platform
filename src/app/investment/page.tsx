'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { InvestmentSwitchbar } from '@/components/investment/InvestmentSwitchbar';

export default function InvestmentBoardPage() {
  const t = useTranslations('investment');

  return (
    <div className="py-4 md:py-6 lg:py-8">
      {/* Investment Banner */}
      <div className="mb-6 rounded-xl overflow-hidden shadow-2xl">
        <Image
          src="/images/banners/Banner-Investment-Hub.png"
          alt="Investment Hub"
          width={1920}
          height={400}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* Investment Switchbar */}
      <InvestmentSwitchbar />

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
            <p className="text-[var(--color-text-muted)] text-sm md:text-base">{t('board.subtitle')}</p>
          </div>
        </div>
      </GlassCard>

      {/* Intro Text */}
      <GlassCard className="p-4 md:p-6 mb-6">
        <p className="text-[var(--color-text-secondary)] leading-relaxed">
          {t('board.intro')}
        </p>
      </GlassCard>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

        {/* Portfolio Generator Card */}
        <GlassCard className="p-6 hover:border-[var(--color-success)]/50 transition-all duration-300 group">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-[var(--color-success)]">{t('board.generator.title')}</h3>
                <span className="px-2 py-0.5 text-xs font-bold rounded bg-[var(--color-primary)]/20 text-[var(--color-primary)]">PRO</span>
              </div>
              <p className="text-[var(--color-text-secondary)] text-sm mb-4">
                {t('board.generator.description')}
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-[var(--color-text-muted)]">
                  <svg className="w-4 h-4 text-[var(--color-success)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t('board.generator.feature1')}
                </li>
                <li className="flex items-center gap-2 text-[var(--color-text-muted)]">
                  <svg className="w-4 h-4 text-[var(--color-success)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t('board.generator.feature2')}
                </li>
                <li className="flex items-center gap-2 text-[var(--color-text-muted)]">
                  <svg className="w-4 h-4 text-[var(--color-success)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t('board.generator.feature3')}
                </li>
                <li className="flex items-center gap-2 text-[var(--color-text-muted)]">
                  <svg className="w-4 h-4 text-[var(--color-success)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t('board.generator.feature4')}
                </li>
              </ul>
            </div>
          </div>
        </GlassCard>

        {/* Portfolio Analyzer Card */}
        <GlassCard className="p-6 hover:border-[var(--color-primary)]/50 transition-all duration-300 group">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-[var(--color-primary)]">{t('board.analyzer.title')}</h3>
                <span className="px-2 py-0.5 text-xs font-bold rounded bg-[var(--color-primary)]/20 text-[var(--color-primary)]">PRO</span>
              </div>
              <p className="text-[var(--color-text-secondary)] text-sm mb-4">
                {t('board.analyzer.description')}
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-[var(--color-text-muted)]">
                  <svg className="w-4 h-4 text-[var(--color-primary)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t('board.analyzer.feature1')}
                </li>
                <li className="flex items-center gap-2 text-[var(--color-text-muted)]">
                  <svg className="w-4 h-4 text-[var(--color-primary)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t('board.analyzer.feature2')}
                </li>
                <li className="flex items-center gap-2 text-[var(--color-text-muted)]">
                  <svg className="w-4 h-4 text-[var(--color-primary)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t('board.analyzer.feature3')}
                </li>
                <li className="flex items-center gap-2 text-[var(--color-text-muted)]">
                  <svg className="w-4 h-4 text-[var(--color-primary)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t('board.analyzer.feature4')}
                </li>
              </ul>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* How It Works */}
      <GlassCard className="p-4 md:p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">{t('board.howItWorks.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center flex-shrink-0">
              <span className="text-[var(--color-primary)] font-bold">1</span>
            </div>
            <div>
              <h4 className="font-semibold text-sm">{t('board.howItWorks.step1.title')}</h4>
              <p className="text-xs text-[var(--color-text-muted)]">{t('board.howItWorks.step1.desc')}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center flex-shrink-0">
              <span className="text-[var(--color-primary)] font-bold">2</span>
            </div>
            <div>
              <h4 className="font-semibold text-sm">{t('board.howItWorks.step2.title')}</h4>
              <p className="text-xs text-[var(--color-text-muted)]">{t('board.howItWorks.step2.desc')}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center flex-shrink-0">
              <span className="text-[var(--color-primary)] font-bold">3</span>
            </div>
            <div>
              <h4 className="font-semibold text-sm">{t('board.howItWorks.step3.title')}</h4>
              <p className="text-xs text-[var(--color-text-muted)]">{t('board.howItWorks.step3.desc')}</p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* AI Info Box */}
      <GlassCard className="p-4 md:p-6 mb-6 border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">{t('board.aiPowered.title')}</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {t('board.aiPowered.description')}
            </p>
          </div>
        </div>
      </GlassCard>

      {/* CTA Button */}
      <div className="text-center">
        <Link
          href="/investment/portfolio"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:scale-105"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          {t('board.cta')}
        </Link>
      </div>
    </div>
  );
}
