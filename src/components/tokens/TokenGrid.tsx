'use client';

import { useTranslations } from 'next-intl';
import { TokenCard } from '@/components/market/TokenCard';
import { Skeleton } from '@/components/ui/Skeleton';
import type { Krc20TokenWithPrice } from '@/types';

interface TokenGridProps {
  tokens: Krc20TokenWithPrice[];
  isLoading?: boolean;
  startRank?: number;
  isSearching?: boolean;
  isIndexerSyncing?: boolean;
}

export function TokenGrid({ tokens, isLoading, startRank = 1, isSearching = false, isIndexerSyncing = false }: TokenGridProps) {
  const t = useTranslations('tokens');

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="glass-card p-4">
            <div className="flex items-start gap-3 mb-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <Skeleton className="h-6 w-24 mb-3" />
            <div className="grid grid-cols-2 gap-2">
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Indexer syncing state - show skeleton placeholders with info
  if (tokens.length === 0 && isIndexerSyncing && !isSearching) {
    return (
      <div className="space-y-6">
        {/* Info Box */}
        <div className="glass-card p-6 text-center border border-[var(--color-warning)]/30 bg-[var(--color-warning)]/5">
          <div className="flex items-center justify-center gap-3 mb-3">
            <svg className="w-8 h-8 text-[var(--color-warning)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-[var(--color-warning)]">{t('indexerSyncing')}</h3>
          </div>
          <p className="text-[var(--color-text-secondary)] mb-4">
            {t('indexerSyncingDesc')}
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-[var(--color-warning)]">
            <span className="w-2 h-2 rounded-full bg-[var(--color-warning)] animate-pulse" />
            <span>{t('syncInProgress')}</span>
          </div>
        </div>

        {/* Skeleton Token Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="glass-card p-4 opacity-50">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-white/5 animate-pulse" />
                <div className="flex-1">
                  <div className="h-4 w-20 mb-2 bg-white/5 rounded animate-pulse" />
                  <div className="h-3 w-16 bg-white/5 rounded animate-pulse" />
                </div>
              </div>
              <div className="h-6 w-24 mb-3 bg-white/5 rounded animate-pulse" />
              <div className="grid grid-cols-2 gap-2">
                <div className="h-10 bg-white/5 rounded animate-pulse" />
                <div className="h-10 bg-white/5 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Normal empty state (search returned no results)
  if (tokens.length === 0) {
    return (
      <div className="glass-card p-12 text-center">
        <svg
          className="w-16 h-16 mx-auto mb-4 text-[var(--color-text-muted)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-lg font-semibold mb-2">{t('noTokensFound')}</h3>
        <p className="text-[var(--color-text-muted)]">
          {t('noTokensHint')}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {tokens.map((token, index) => (
        <TokenCard
          key={token.tick}
          token={token}
          rank={startRank + index}
        />
      ))}
    </div>
  );
}
