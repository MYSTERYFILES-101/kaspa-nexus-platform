'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';

export default function RegisterPage() {
  const t = useTranslations('auth');

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-8">
      <div className="w-full max-w-md px-4">
        <GlassCard className="p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">{t('register.title')}</h1>

            {/* Coming Soon Badge */}
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-warning)]/10 text-[var(--color-warning)] border border-[var(--color-warning)]/30 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t('comingSoon')}
            </span>
          </div>

          {/* Form (disabled) */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--color-text-secondary)]">
                {t('register.email')}
              </label>
              <input
                type="email"
                disabled
                placeholder="email@example.com"
                className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] opacity-50 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--color-text-secondary)]">
                {t('register.password')}
              </label>
              <input
                type="password"
                disabled
                placeholder="********"
                className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] opacity-50 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--color-text-secondary)]">
                {t('register.confirmPassword')}
              </label>
              <input
                type="password"
                disabled
                placeholder="********"
                className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] opacity-50 cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              disabled
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-semibold opacity-50 cursor-not-allowed"
            >
              {t('register.submit')}
            </button>
          </form>

          {/* Coming Soon Description */}
          <div className="mt-6 p-4 rounded-lg bg-[var(--color-warning)]/5 border border-[var(--color-warning)]/20">
            <p className="text-sm text-center text-[var(--color-text-secondary)]">
              {t('comingSoonDesc')}
            </p>
          </div>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-[var(--color-text-secondary)]">
            {t('register.hasAccount')}{' '}
            <Link href="/auth/login" className="text-[var(--color-primary)] hover:underline font-medium">
              {t('login.title')}
            </Link>
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
