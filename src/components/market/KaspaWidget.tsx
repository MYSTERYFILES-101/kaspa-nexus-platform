'use client';

import { useEffect, useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { PriceChange } from '@/components/ui/PriceChange';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatCurrency, formatCompact } from '@/lib/utils';
import type { KaspaPrice } from '@/types';

interface KaspaWidgetProps {
  initialData?: KaspaPrice;
}

export function KaspaWidget({ initialData }: KaspaWidgetProps) {
  const [data, setData] = useState<KaspaPrice | null>(initialData || null);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://api.kaspa-nexus.io/v1/kaspa/price');
        if (!res.ok) throw new Error('Failed to fetch');
        const json = await res.json();
        setData(json.data || json);
        setError(null);
      } catch {
        setError('Failed to load Kaspa price');
      } finally {
        setLoading(false);
      }
    }

    if (!initialData) {
      fetchData();
    }

    // Refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [initialData]);

  if (loading) {
    return (
      <GlassCard glow className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <Skeleton variant="circular" width={48} height={48} />
          <div className="flex-1">
            <Skeleton width={100} height={24} className="mb-2" />
            <Skeleton width={80} height={16} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Skeleton height={60} variant="rectangular" />
          <Skeleton height={60} variant="rectangular" />
        </div>
      </GlassCard>
    );
  }

  if (error || !data) {
    return (
      <GlassCard className="p-6">
        <p className="text-error text-center">{error || 'No data available'}</p>
      </GlassCard>
    );
  }

  return (
    <GlassCard glow className="p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#49EACB] to-[#00A884] flex items-center justify-center shadow-lg">
          <span className="text-xl font-bold text-white">K</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold">KASPA</h3>
            <span className="text-text-muted text-sm">KAS</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold">{formatCurrency(data.price)}</span>
            <PriceChange value={data.change24h} size="md" />
          </div>
        </div>
        {data.rank && (
          <div className="text-right">
            <span className="text-text-muted text-xs">Rank</span>
            <p className="text-lg font-semibold">#{data.rank}</p>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-3 text-center">
          <p className="text-text-muted text-xs uppercase mb-1">Market Cap</p>
          <p className="font-semibold">{formatCompact(data.marketCap)}</p>
        </div>
        <div className="glass-card p-3 text-center">
          <p className="text-text-muted text-xs uppercase mb-1">24h Volume</p>
          <p className="font-semibold">{formatCompact(data.volume24h)}</p>
        </div>
        <div className="glass-card p-3 text-center">
          <p className="text-text-muted text-xs uppercase mb-1">Circulating</p>
          <p className="font-semibold">{formatCompact(data.circulatingSupply)}</p>
        </div>
        <div className="glass-card p-3 text-center">
          <p className="text-text-muted text-xs uppercase mb-1">Max Supply</p>
          <p className="font-semibold">{formatCompact(data.maxSupply)}</p>
        </div>
      </div>

      {/* Live Indicator */}
      <div className="mt-4 flex items-center justify-end gap-2 text-xs text-text-muted">
        <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
        <span>Live from api.kaspa-nexus.io</span>
      </div>
    </GlassCard>
  );
}
