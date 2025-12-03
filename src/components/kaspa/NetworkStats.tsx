'use client';

import { useEffect, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { GlassCard } from '@/components/ui/GlassCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatCompact } from '@/lib/utils';
import type { KaspaNetworkStats } from '@/types';

interface NetworkStatsProps {
  className?: string;
}

export function NetworkStats({ className }: NetworkStatsProps) {
  const t = useTranslations('kaspaPage');
  const [stats, setStats] = useState<KaspaNetworkStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('https://api.kaspa-nexus.io/v1/kaspa/stats');
      if (!res.ok) throw new Error('Failed to fetch');
      const json = await res.json();
      if (json.success && json.data) {
        setStats(json.data);
        setError(null);
      }
    } catch {
      setError('Failed to load network stats');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 10000); // Update every 10s
    return () => clearInterval(interval);
  }, [fetchStats]);

  // Calculate mined percentage
  const circulatingSupply = 26780000000; // ~26.78B
  const maxSupply = 28700000000; // 28.7B
  const minedPercentage = ((circulatingSupply / maxSupply) * 100).toFixed(2);

  // Format hashrate
  const formatHashrate = (hashrate: number) => {
    if (hashrate >= 1e15) return `${(hashrate / 1e15).toFixed(2)} PH/s`;
    if (hashrate >= 1e12) return `${(hashrate / 1e12).toFixed(2)} TH/s`;
    if (hashrate >= 1e9) return `${(hashrate / 1e9).toFixed(2)} GH/s`;
    if (hashrate >= 1e6) return `${(hashrate / 1e6).toFixed(2)} MH/s`;
    return `${hashrate.toFixed(2)} H/s`;
  };

  if (loading) {
    return (
      <GlassCard className={`p-6 ${className}`}>
        <Skeleton width={200} height={24} className="mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} height={80} variant="rectangular" />
          ))}
        </div>
      </GlassCard>
    );
  }

  if (error || !stats) {
    return (
      <GlassCard className={`p-6 border-[var(--color-error)]/30 ${className}`}>
        <p className="text-[var(--color-error)]">{error}</p>
      </GlassCard>
    );
  }

  const statsData = [
    {
      label: t('daaScore'),
      value: formatCompact(parseInt(stats.network.virtualDaaScore)),
      color: 'primary',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      label: t('hashrate'),
      value: formatHashrate(stats.mining.hashrate * 1e12), // API returns in TH/s
      color: 'secondary',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      label: t('realTimeBps'),
      value: '10 BPS',
      color: 'success',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
        </svg>
      ),
    },
    {
      label: t('blockCount'),
      value: formatCompact(parseInt(stats.network.blockCount)),
      color: 'primary',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      label: t('minedPercent'),
      value: `${minedPercentage}%`,
      color: 'warning',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      ),
    },
  ];

  return (
    <GlassCard className={`p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gradient">{t('liveNetworkStats')}</h3>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
          <span className="text-xs text-[var(--color-text-muted)]">{t('liveUpdate')}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="glass-card p-4 text-center hover:border-[var(--color-primary)]/50 transition-all"
          >
            <div className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-[var(--color-${stat.color})]/20 flex items-center justify-center text-[var(--color-${stat.color})]`}>
              {stat.icon}
            </div>
            <p className="text-xs text-[var(--color-text-muted)] uppercase mb-1">{stat.label}</p>
            <p className={`text-lg font-bold text-[var(--color-${stat.color})]`}>{stat.value}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
