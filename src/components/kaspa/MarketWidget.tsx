'use client';

import { useEffect, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { GlassCard } from '@/components/ui/GlassCard';
import { PriceChange } from '@/components/ui/PriceChange';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatCurrency, formatCompact } from '@/lib/utils';
import type { KaspaPrice } from '@/types';

interface MarketWidgetProps {
  className?: string;
  compact?: boolean;
}

export function MarketWidget({ className, compact = false }: MarketWidgetProps) {
  const t = useTranslations('kaspaPage');
  const tWidget = useTranslations('kaspaWidget');
  const [data, setData] = useState<KaspaPrice | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('https://api.kaspa-nexus.io/v1/kaspa/price');
      if (!res.ok) throw new Error('Failed to fetch');
      const json = await res.json();
      setData(json.data || json);
    } catch {
      // Silent fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  if (loading) {
    return (
      <GlassCard glow className={`p-4 ${className}`}>
        <div className="flex items-center gap-3">
          <Skeleton variant="circular" width={40} height={40} />
          <div className="flex-1">
            <Skeleton width={80} height={20} className="mb-1" />
            <Skeleton width={60} height={16} />
          </div>
        </div>
      </GlassCard>
    );
  }

  if (!data) return null;

  if (compact) {
    return (
      <GlassCard glow className={`p-4 ${className}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#49EACB] to-[#00A884] flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold text-white">K</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-bold">KASPA</span>
              <span className="text-xs text-[var(--color-text-muted)]">KAS</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">{formatCurrency(data.price)}</span>
              <PriceChange value={data.change24h} size="sm" />
            </div>
          </div>
          {data.rank && (
            <div className="text-right">
              <span className="text-xs text-[var(--color-text-muted)]">#{data.rank}</span>
            </div>
          )}
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard glow className={`p-6 ${className}`}>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#49EACB] to-[#00A884] flex items-center justify-center shadow-lg">
          <span className="text-2xl font-bold text-white">K</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold">KASPA</h3>
            <span className="text-[var(--color-text-muted)]">KAS</span>
            {data.rank && (
              <span className="px-2 py-0.5 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-medium">
                #{data.rank}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold">{formatCurrency(data.price)}</span>
            <PriceChange value={data.change24h} size="md" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="glass-card p-3">
          <p className="text-xs text-[var(--color-text-muted)] uppercase mb-1">{tWidget('marketCap')}</p>
          <p className="font-bold">{formatCompact(data.marketCap)}</p>
        </div>
        <div className="glass-card p-3">
          <p className="text-xs text-[var(--color-text-muted)] uppercase mb-1">{tWidget('volume24h')}</p>
          <p className="font-bold">{formatCompact(data.volume24h)}</p>
        </div>
        <div className="glass-card p-3">
          <p className="text-xs text-[var(--color-text-muted)] uppercase mb-1">{tWidget('circulatingSupply')}</p>
          <p className="font-bold">{formatCompact(data.circulatingSupply)}</p>
        </div>
        <div className="glass-card p-3">
          <p className="text-xs text-[var(--color-text-muted)] uppercase mb-1">{tWidget('maxSupply')}</p>
          <p className="font-bold">{formatCompact(data.maxSupply)}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-end gap-2 text-xs text-[var(--color-text-muted)]">
        <span className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
        <span>{t('liveData')}</span>
      </div>
    </GlassCard>
  );
}
