'use client';

import { TokenCard } from '@/components/market/TokenCard';
import { Skeleton } from '@/components/ui/Skeleton';
import type { Krc20TokenWithPrice } from '@/types';

interface TokenGridProps {
  tokens: Krc20TokenWithPrice[];
  isLoading?: boolean;
  startRank?: number;
}

export function TokenGrid({ tokens, isLoading, startRank = 1 }: TokenGridProps) {
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
        <h3 className="text-lg font-semibold mb-2">No tokens found</h3>
        <p className="text-[var(--color-text-muted)]">
          Try adjusting your search or filters
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
