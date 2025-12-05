'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { GlassCard } from '@/components/ui/GlassCard';
import { Krc20Switchbar } from '@/components/krc20/Krc20Switchbar';

// DeFi Project Placeholder type
interface DefiProject {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: JSX.Element;
  status: 'coming_soon' | 'active' | 'beta';
}

// DeFi Projects - Placeholder data
const DEFI_PROJECTS: DefiProject[] = [
  {
    id: 'lending',
    titleKey: 'lending.title',
    descriptionKey: 'lending.description',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    status: 'coming_soon',
  },
  {
    id: 'staking',
    titleKey: 'staking.title',
    descriptionKey: 'staking.description',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    status: 'coming_soon',
  },
  {
    id: 'yield',
    titleKey: 'yield.title',
    descriptionKey: 'yield.description',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    status: 'coming_soon',
  },
  {
    id: 'bridges',
    titleKey: 'bridges.title',
    descriptionKey: 'bridges.description',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    status: 'coming_soon',
  },
];

// Status badge component
function StatusBadge({ status }: { status: string }) {
  const t = useTranslations('defiPage');

  const colorMap: Record<string, string> = {
    coming_soon: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)] border-[var(--color-warning)]/30',
    active: 'bg-[var(--color-success)]/10 text-[var(--color-success)] border-[var(--color-success)]/30',
    beta: 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/30',
  };

  const colorClass = colorMap[status] || colorMap.coming_soon;

  return (
    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${colorClass}`}>
      {t('comingSoon')}
    </span>
  );
}

// DeFi Card Component
function DefiCard({ project }: { project: DefiProject }) {
  const t = useTranslations('defiPage');

  return (
    <GlassCard className="p-6 h-full opacity-75 hover:opacity-100 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 flex items-center justify-center text-[var(--color-primary)]">
          {project.icon}
        </div>
        <StatusBadge status={project.status} />
      </div>

      <h3 className="text-lg font-semibold mb-2">{t(project.titleKey)}</h3>
      <p className="text-sm text-[var(--color-text-muted)]">{t(project.descriptionKey)}</p>
    </GlassCard>
  );
}

export default function DefiPage() {
  const t = useTranslations('defiPage');

  return (
    <div className="py-4 md:py-6 lg:py-8">
      {/* KRC-20 Network Banner */}
      <div className="relative w-full aspect-[21/9] mb-6 rounded-2xl overflow-hidden">
        <Image
          src="/images/banners/krc20-network.png"
          alt="KRC-20 Network"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-start)]/30 to-transparent" />
      </div>

      {/* KRC-20 Switchbar */}
      <Krc20Switchbar />

      {/* Page Header */}
      <GlassCard className="p-4 md:p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-lg flex-shrink-0">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl md:text-4xl font-bold">{t('title')}</h1>
            <p className="text-[var(--color-text-muted)] text-sm md:text-base">{t('subtitle')}</p>
          </div>
        </div>
      </GlassCard>

      {/* Info Box */}
      <GlassCard className="p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2 text-gradient">{t('title')}</h2>
            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
              {t('description')}
            </p>
          </div>
        </div>
      </GlassCard>

      {/* DeFi Projects Grid */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEFI_PROJECTS.map((project) => (
            <DefiCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* Stay Tuned Banner */}
      <GlassCard className="p-6 border-[var(--color-warning)]/30 bg-[var(--color-warning)]/5">
        <div className="flex items-center justify-center gap-4">
          <svg className="w-8 h-8 text-[var(--color-warning)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-lg font-medium text-[var(--color-warning)]">{t('stayTuned')}</p>
        </div>
      </GlassCard>
    </div>
  );
}
