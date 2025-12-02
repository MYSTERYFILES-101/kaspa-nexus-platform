'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { PriceChange } from '@/components/ui/PriceChange';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatCurrency, formatCompact } from '@/lib/utils';
import type { Krc20TokenWithPrice } from '@/types';

interface GainersLosersProps {
  limit?: number;
}

export function GainersLosers({ limit = 5 }: GainersLosersProps) {
  const [gainers, setGainers] = useState<Krc20TokenWithPrice[]>([]);
  const [losers, setLosers] = useState<Krc20TokenWithPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [gainersRes, losersRes] = await Promise.all([
          fetch(`https://api.kaspa-nexus.io/v1/market/gainers?limit=${limit}`),
          fetch(`https://api.kaspa-nexus.io/v1/market/losers?limit=${limit}`),
        ]);

        if (!gainersRes.ok || !losersRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const gainersJson = await gainersRes.json();
        const losersJson = await losersRes.json();

        setGainers(gainersJson.data || []);
        setLosers(losersJson.data || []);
        setError(null);
      } catch {
        setError('Failed to load market data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [limit]);

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard className="p-4">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <span className="text-positive">▲</span> Top Gainers
          </h3>
          {Array.from({ length: limit }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-glass-border last:border-0">
              <Skeleton variant="circular" width={32} height={32} />
              <Skeleton width={60} height={16} />
              <Skeleton width={50} height={14} className="ml-auto" />
            </div>
          ))}
        </GlassCard>
        <GlassCard className="p-4">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <span className="text-negative">▼</span> Top Losers
          </h3>
          {Array.from({ length: limit }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-glass-border last:border-0">
              <Skeleton variant="circular" width={32} height={32} />
              <Skeleton width={60} height={16} />
              <Skeleton width={50} height={14} className="ml-auto" />
            </div>
          ))}
        </GlassCard>
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

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Top Gainers */}
      <GlassCard className="p-4">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <span className="text-positive">▲</span> Top Gainers (24h)
        </h3>
        <div className="space-y-1">
          {gainers.length > 0 ? (
            gainers.map((token, index) => (
              <TokenRow key={token.tick} token={token} rank={index + 1} />
            ))
          ) : (
            <p className="text-text-muted text-sm text-center py-4">No data</p>
          )}
        </div>
      </GlassCard>

      {/* Top Losers */}
      <GlassCard className="p-4">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <span className="text-negative">▼</span> Top Losers (24h)
        </h3>
        <div className="space-y-1">
          {losers.length > 0 ? (
            losers.map((token, index) => (
              <TokenRow key={token.tick} token={token} rank={index + 1} />
            ))
          ) : (
            <p className="text-text-muted text-sm text-center py-4">No data</p>
          )}
        </div>
      </GlassCard>
    </div>
  );
}

function TokenRow({ token, rank }: { token: Krc20TokenWithPrice; rank: number }) {
  return (
    <Link
      href={`/tokens/${token.tick}`}
      className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-white/5 transition-colors"
    >
      <span className="text-text-muted text-xs w-4">{rank}</span>
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
        {token.logoUrl ? (
          <img
            src={token.logoUrl}
            alt={token.tick}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span className="text-xs font-bold text-white">
            {token.tick.slice(0, 2)}
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{token.tick}</p>
        <p className="text-xs text-text-muted">{formatCurrency(token.price)}</p>
      </div>
      <div className="text-right">
        <PriceChange value={token.change24h} size="sm" />
        <p className="text-xs text-text-muted">{formatCompact(token.marketCap)}</p>
      </div>
    </Link>
  );
}
