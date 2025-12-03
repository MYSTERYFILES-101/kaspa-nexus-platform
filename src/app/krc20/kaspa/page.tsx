'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { GlassCard } from '@/components/ui/GlassCard';
import { PriceChange } from '@/components/ui/PriceChange';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatCurrency, formatCompact } from '@/lib/utils';
import type { KaspaPrice } from '@/types';

export default function KaspaPage() {
  const t = useTranslations('kaspaPage');
  const tWidget = useTranslations('kaspaWidget');

  // State
  const [data, setData] = useState<KaspaPrice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Fetch Kaspa data
  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('https://api.kaspa-nexus.io/v1/kaspa/price');
      if (!res.ok) throw new Error('Failed to fetch');
      const json = await res.json();
      setData(json.data || json);
      setLastUpdated(new Date());
      setError(null);
    } catch {
      setError('Failed to load Kaspa data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return (
    <div className="py-4 md:py-6 lg:py-8">
      {/* Banner */}
      <div className="relative w-full aspect-[21/9] mb-6 rounded-2xl overflow-hidden">
        <Image
          src="/images/banners/kaspa-banner.png"
          alt="Kaspa"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg-start)]/70 to-transparent" />
        <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#49EACB] to-[#00A884] flex items-center justify-center shadow-lg">
              <span className="text-2xl md:text-3xl font-bold text-white">K</span>
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg">KASPA</h1>
              <p className="text-white/80 text-sm md:text-base">{t('tagline')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Data Badge */}
      <div className="flex items-center justify-end gap-3 mb-6">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-success)]/10 border border-[var(--color-success)]/30">
          <span className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
          <span className="text-xs font-medium text-[var(--color-success)]">
            {t('liveData')}
          </span>
        </div>
        {lastUpdated && (
          <span className="text-xs text-[var(--color-text-muted)]">
            {t('lastUpdated')}: {lastUpdated.toLocaleTimeString()}
          </span>
        )}
      </div>

      {/* Price Widget */}
      {isLoading ? (
        <GlassCard glow className="p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Skeleton variant="circular" width={64} height={64} />
            <div className="flex-1">
              <Skeleton width={150} height={32} className="mb-2" />
              <Skeleton width={100} height={20} />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} height={80} variant="rectangular" />
            ))}
          </div>
        </GlassCard>
      ) : error ? (
        <GlassCard className="p-6 mb-6 border-[var(--color-error)]/30">
          <div className="flex items-center gap-3 text-[var(--color-error)]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
            <button
              onClick={fetchData}
              className="ml-auto px-4 py-2 text-sm glass-input hover:border-[var(--color-primary)]"
            >
              {t('retry')}
            </button>
          </div>
        </GlassCard>
      ) : data && (
        <GlassCard glow className="p-6 mb-6">
          {/* Price Header */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#49EACB] to-[#00A884] flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-white">K</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl font-bold">KASPA</h2>
                  <span className="text-text-muted">KAS</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl md:text-4xl font-bold">{formatCurrency(data.price)}</span>
                  <PriceChange value={data.change24h} size="lg" />
                </div>
              </div>
            </div>
            {data.rank && (
              <div className="md:ml-auto text-left md:text-right">
                <span className="text-text-muted text-sm">{tWidget('rank')}</span>
                <p className="text-2xl font-bold text-primary">#{data.rank}</p>
              </div>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="glass-card p-4 text-center">
              <p className="text-text-muted text-xs uppercase mb-2">{tWidget('marketCap')}</p>
              <p className="text-lg font-bold">{formatCompact(data.marketCap)}</p>
            </div>
            <div className="glass-card p-4 text-center">
              <p className="text-text-muted text-xs uppercase mb-2">{tWidget('volume24h')}</p>
              <p className="text-lg font-bold">{formatCompact(data.volume24h)}</p>
            </div>
            <div className="glass-card p-4 text-center">
              <p className="text-text-muted text-xs uppercase mb-2">{tWidget('circulatingSupply')}</p>
              <p className="text-lg font-bold">{formatCompact(data.circulatingSupply)}</p>
            </div>
            <div className="glass-card p-4 text-center">
              <p className="text-text-muted text-xs uppercase mb-2">{tWidget('maxSupply')}</p>
              <p className="text-lg font-bold">{formatCompact(data.maxSupply)}</p>
            </div>
            <div className="glass-card p-4 text-center">
              <p className="text-text-muted text-xs uppercase mb-2">{t('blockTime')}</p>
              <p className="text-lg font-bold text-primary">1s</p>
            </div>
            <div className="glass-card p-4 text-center">
              <p className="text-text-muted text-xs uppercase mb-2">{t('bps')}</p>
              <p className="text-lg font-bold text-primary">10 BPS</p>
            </div>
          </div>
        </GlassCard>
      )}

      {/* TradingView Chart Placeholder */}
      <GlassCard className="p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">{t('priceChart')}</h3>
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-[var(--color-bg-start)]/50 rounded-xl border border-[var(--glass-border)] flex items-center justify-center">
          <div className="text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4v16a1 1 0 001 1h14a1 1 0 001-1V4" />
            </svg>
            <p className="text-xl font-semibold text-[var(--color-text-secondary)] mb-2">{t('chartComingSoon')}</p>
            <p className="text-sm text-[var(--color-text-muted)]">{t('chartDescription')}</p>
          </div>
        </div>
      </GlassCard>

      {/* What is Kaspa Section */}
      <GlassCard className="p-6 mb-6">
        <h3 className="text-xl font-bold mb-4 text-gradient">{t('whatIsKaspa')}</h3>
        <div className="space-y-4 text-[var(--color-text-secondary)]">
          <p>{t('kaspaDescription1')}</p>
          <p>{t('kaspaDescription2')}</p>
        </div>

        {/* Feature Badges */}
        <div className="flex flex-wrap gap-3 mt-6">
          <div className="px-4 py-2 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30">
            <span className="text-sm font-medium text-[var(--color-primary)]">{t('feature1')}</span>
          </div>
          <div className="px-4 py-2 rounded-full bg-[var(--color-secondary)]/10 border border-[var(--color-secondary)]/30">
            <span className="text-sm font-medium text-[var(--color-secondary)]">{t('feature2')}</span>
          </div>
          <div className="px-4 py-2 rounded-full bg-[var(--color-success)]/10 border border-[var(--color-success)]/30">
            <span className="text-sm font-medium text-[var(--color-success)]">{t('feature3')}</span>
          </div>
        </div>
      </GlassCard>

      {/* BlockDAG Technology Section */}
      <GlassCard className="p-6 mb-6">
        <h3 className="text-xl font-bold mb-4 text-gradient">{t('blockdagTitle')}</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4 text-[var(--color-text-secondary)]">
            <p>{t('blockdagDescription1')}</p>
            <p>{t('blockdagDescription2')}</p>
          </div>
          <div className="space-y-4">
            <div className="glass-card p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">{t('speedTitle')}</p>
                  <p className="text-sm text-[var(--color-text-muted)]">{t('speedDescription')}</p>
                </div>
              </div>
            </div>
            <div className="glass-card p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-secondary)]/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[var(--color-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">{t('securityTitle')}</p>
                  <p className="text-sm text-[var(--color-text-muted)]">{t('securityDescription')}</p>
                </div>
              </div>
            </div>
            <div className="glass-card p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-success)]/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[var(--color-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">{t('scalabilityTitle')}</p>
                  <p className="text-sm text-[var(--color-text-muted)]">{t('scalabilityDescription')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Network Stats */}
      <GlassCard className="p-6">
        <h3 className="text-xl font-bold mb-4 text-gradient">{t('networkStats')}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-card p-4 text-center">
            <p className="text-text-muted text-xs uppercase mb-2">{t('blockTime')}</p>
            <p className="text-2xl font-bold text-primary">1s</p>
            <p className="text-xs text-text-muted mt-1">{t('blockTimeDesc')}</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-text-muted text-xs uppercase mb-2">{t('bps')}</p>
            <p className="text-2xl font-bold text-primary">10</p>
            <p className="text-xs text-text-muted mt-1">{t('bpsDesc')}</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-text-muted text-xs uppercase mb-2">{t('consensus')}</p>
            <p className="text-2xl font-bold text-secondary">PoW</p>
            <p className="text-xs text-text-muted mt-1">{t('consensusDesc')}</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-text-muted text-xs uppercase mb-2">{t('protocol')}</p>
            <p className="text-2xl font-bold text-success">GHOSTDAG</p>
            <p className="text-xs text-text-muted mt-1">{t('protocolDesc')}</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
