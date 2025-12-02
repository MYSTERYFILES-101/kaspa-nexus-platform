'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { GlassCard } from '@/components/ui/GlassCard';
import { TokenCard } from './TokenCard';
import { SkeletonCard } from '@/components/ui/Skeleton';
import type { Krc20TokenWithPrice } from '@/types';

interface TopTokensListProps {
  limit?: number;
}

export function TopTokensList({ limit = 8 }: TopTokensListProps) {
  const t = useTranslations('topTokens');
  const [tokens, setTokens] = useState<Krc20TokenWithPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTokens() {
      try {
        const res = await fetch(
          `/api/krc20/tokens?limit=${limit}&sort=marketCap&order=desc`
        );
        if (!res.ok) throw new Error('Failed to fetch tokens');
        const json = await res.json();
        setTokens(json.data || []);
        setError(null);
      } catch {
        setError('Failed to load tokens');
      } finally {
        setLoading(false);
      }
    }

    fetchTokens();
    const interval = setInterval(fetchTokens, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, [limit]);

  if (loading) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">{t('title')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: limit }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <GlassCard className="p-6 text-center">
        <p className="text-error">{error}</p>
      </GlassCard>
    );
  }

  if (tokens.length === 0) {
    return (
      <GlassCard className="p-6 text-center">
        <p className="text-text-muted">No tokens found</p>
      </GlassCard>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{t('title')}</h2>
        <a
          href="/tokens"
          className="text-sm text-primary hover:text-primary-light transition-colors"
        >
          {t('viewAll')} →
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tokens.map((token, index) => (
          <TokenCard key={token.tick} token={token} rank={index + 1} />
        ))}
      </div>
    </div>
  );
}
