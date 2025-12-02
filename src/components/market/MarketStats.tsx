'use client';

import { useEffect, useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatCompact, formatNumber } from '@/lib/utils';

interface MarketStatsData {
  totalTokens: number;
  totalMarketCap: number;
  totalVolume24h: number;
  activeTokens: number;
}

export function MarketStats() {
  const [stats, setStats] = useState<MarketStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('https://api.kaspa-nexus.io/v1/market/overview');
        if (!res.ok) throw new Error('Failed to fetch');
        const json = await res.json();
        setStats(json.data || json);
        setError(null);
      } catch {
        setError('Failed to load market stats');
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
    const interval = setInterval(fetchStats, 60000);
    return () => clearInterval(interval);
  }, []);

  const statsConfig = [
    {
      label: 'Total Tokens',
      value: stats?.totalTokens,
      format: (v: number) => formatNumber(v, 0),
      icon: '🪙',
    },
    {
      label: 'Total Market Cap',
      value: stats?.totalMarketCap,
      format: (v: number) => `$${formatCompact(v)}`,
      icon: '📊',
    },
    {
      label: '24h Volume',
      value: stats?.totalVolume24h,
      format: (v: number) => `$${formatCompact(v)}`,
      icon: '📈',
    },
    {
      label: 'Active Tokens',
      value: stats?.activeTokens,
      format: (v: number) => formatNumber(v, 0),
      icon: '🔥',
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <GlassCard key={i} className="p-4">
            <Skeleton width="60%" height={12} className="mb-2" />
            <Skeleton width="80%" height={24} />
          </GlassCard>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <GlassCard className="p-4 text-center">
        <p className="text-error text-sm">{error}</p>
      </GlassCard>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statsConfig.map((stat) => (
        <GlassCard key={stat.label} glow className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-lg">{stat.icon}</span>
            <p className="text-text-muted text-xs uppercase">{stat.label}</p>
          </div>
          <p className="text-xl md:text-2xl font-bold text-gradient-primary">
            {stat.value !== undefined ? stat.format(stat.value) : '-'}
          </p>
        </GlassCard>
      ))}
    </div>
  );
}
