'use client';

import { useTranslations } from 'next-intl';
import { GlassCard } from '@/components/ui/GlassCard';

// Infrastructure Item type
interface InfraItem {
  id: string;
  name: string;
  descriptionKey: string;
  url: string;
  status: 'active' | 'coming_soon';
}

// Infrastructure Categories
const WALLETS: InfraItem[] = [
  { id: 'kasware', name: 'KasWare', descriptionKey: 'wallets.kasware', url: 'https://kasware.xyz', status: 'active' },
  { id: 'kaspium', name: 'Kaspium', descriptionKey: 'wallets.kaspium', url: 'https://kaspium.io', status: 'active' },
  { id: 'tangem', name: 'Tangem', descriptionKey: 'wallets.tangem', url: 'https://tangem.com', status: 'active' },
];

const EXPLORERS: InfraItem[] = [
  { id: 'kasfyi', name: 'kas.fyi', descriptionKey: 'explorer.kasfyi', url: 'https://kas.fyi', status: 'active' },
  { id: 'kaspaorg', name: 'explorer.kaspa.org', descriptionKey: 'explorer.kaspaorg', url: 'https://explorer.kaspa.org', status: 'active' },
];

const TOOLS: InfraItem[] = [
  { id: 'kasplex', name: 'KasPlex', descriptionKey: 'tools.kasplex', url: 'https://kasplex.org', status: 'active' },
  { id: 'kastools', name: 'Kas.Tools', descriptionKey: 'tools.kastools', url: 'https://kas.tools', status: 'active' },
];

const DEV_RESOURCES: InfraItem[] = [
  { id: 'rustykaspa', name: 'Rusty Kaspa', descriptionKey: 'dev.rustykaspa', url: 'https://github.com/kaspanet/rusty-kaspa', status: 'active' },
  { id: 'kaspawiki', name: 'Kaspa Wiki', descriptionKey: 'dev.wiki', url: 'https://wiki.kaspa.org', status: 'active' },
];

// Status badge
function StatusBadge({ status }: { status: string }) {
  const t = useTranslations('infrastructure');

  const colorMap: Record<string, string> = {
    active: 'bg-[var(--color-success)]/10 text-[var(--color-success)] border-[var(--color-success)]/30',
    coming_soon: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)] border-[var(--color-warning)]/30',
  };

  const colorClass = colorMap[status] || colorMap.active;
  const label = status === 'active' ? t('active') : t('comingSoon');

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${colorClass}`}>
      {label}
    </span>
  );
}

// Infrastructure Card
function InfraCard({ item }: { item: InfraItem }) {
  const t = useTranslations('infrastructure');

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <GlassCard className="p-4 h-full hover:border-[var(--color-primary)]/50 transition-all duration-300">
        <div className="flex items-start justify-between mb-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center">
            <span className="text-sm font-bold text-white">{item.name.charAt(0)}</span>
          </div>
          <StatusBadge status={item.status} />
        </div>
        <h4 className="font-semibold mb-1 group-hover:text-[var(--color-primary)] transition-colors">{item.name}</h4>
        <p className="text-xs text-[var(--color-text-muted)]">{t(item.descriptionKey)}</p>
      </GlassCard>
    </a>
  );
}

// Category Section
function CategorySection({ title, icon, items }: { title: string; icon: JSX.Element; items: InfraItem[] }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)]">
          {icon}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <InfraCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function InfrastructurePage() {
  const t = useTranslations('infrastructure');

  return (
    <div className="py-4 md:py-6 lg:py-8">
      {/* Page Header */}
      <GlassCard className="p-4 md:p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-lg flex-shrink-0">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl md:text-4xl font-bold">{t('title')}</h1>
            <p className="text-[var(--color-text-muted)] text-sm md:text-base">{t('subtitle')}</p>
          </div>
        </div>
      </GlassCard>

      {/* Wallets */}
      <CategorySection
        title={t('wallets.title')}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        }
        items={WALLETS}
      />

      {/* Block Explorer */}
      <CategorySection
        title={t('explorer.title')}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        }
        items={EXPLORERS}
      />

      {/* Tools */}
      <CategorySection
        title={t('tools.title')}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        }
        items={TOOLS}
      />

      {/* Developer Resources */}
      <CategorySection
        title={t('dev.title')}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        }
        items={DEV_RESOURCES}
      />

      {/* Info Banner */}
      <GlassCard className="p-4 border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-[var(--color-text-secondary)]">{t('infoNote')}</p>
        </div>
      </GlassCard>
    </div>
  );
}
