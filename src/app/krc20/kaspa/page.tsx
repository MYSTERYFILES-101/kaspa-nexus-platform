'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { GlassCard } from '@/components/ui/GlassCard';
import { PriceChange } from '@/components/ui/PriceChange';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatCurrency, formatCompact } from '@/lib/utils';
import { NetworkStats } from '@/components/kaspa/NetworkStats';
import { MiningInfo } from '@/components/kaspa/MiningInfo';
import { EmissionChart } from '@/components/kaspa/EmissionChart';
import { MarketWidget } from '@/components/kaspa/MarketWidget';
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
      {/* Banner - nur Bild */}
      <div className="relative w-full aspect-[21/9] mb-6 rounded-2xl overflow-hidden">
        <Image
          src="/images/banners/kaspa-banner.png"
          alt="Kaspa"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-start)]/30 to-transparent" />
      </div>

      {/* Token Header - unter dem Banner */}
      <GlassCard className="p-4 md:p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#49EACB] to-[#00A884] flex items-center justify-center shadow-lg flex-shrink-0">
            <span className="text-2xl md:text-3xl font-bold text-white">K</span>
          </div>
          <div>
            <h1 className="text-2xl md:text-4xl font-bold">KASPA</h1>
            <p className="text-[var(--color-text-muted)] text-sm md:text-base">{t('tagline')}</p>
          </div>
        </div>
      </GlassCard>

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

      {/* Two Column Layout: Main Content + Sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main Content (3/4) */}
        <div className="xl:col-span-3 space-y-6">
          {/* Price Widget */}
          {isLoading ? (
            <GlassCard glow className="p-6">
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
            <GlassCard className="p-6 border-[var(--color-error)]/30">
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
            <GlassCard glow className="p-6">
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

          {/* Live Network Stats */}
          <NetworkStats />

          {/* Mining Rewards */}
          <MiningInfo />

          {/* Emission Schedule Chart */}
          <EmissionChart />

          {/* TradingView Chart Placeholder */}
          <GlassCard className="p-6">
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
          <GlassCard className="p-6">
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
          <GlassCard className="p-6">
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

        {/* Sidebar (1/4) */}
        <div className="xl:col-span-1 space-y-6">
          {/* Market Widget - Compact */}
          <MarketWidget />

          {/* Quick Stats */}
          <GlassCard className="p-4">
            <h4 className="text-sm font-semibold mb-3 text-[var(--color-text-muted)] uppercase">Quick Facts</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[var(--color-text-muted)]">Launch</span>
                <span className="text-sm font-medium">Nov 2022</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[var(--color-text-muted)]">Algorithm</span>
                <span className="text-sm font-medium">kHeavyHash</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[var(--color-text-muted)]">Block Time</span>
                <span className="text-sm font-medium text-[var(--color-primary)]">1 second</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[var(--color-text-muted)]">BPS</span>
                <span className="text-sm font-medium text-[var(--color-primary)]">10</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[var(--color-text-muted)]">Max Supply</span>
                <span className="text-sm font-medium">28.7B KAS</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[var(--color-text-muted)]">Halving</span>
                <span className="text-sm font-medium">Chromatic (~6mo)</span>
              </div>
            </div>
          </GlassCard>

          {/* Links */}
          <GlassCard className="p-4">
            <h4 className="text-sm font-semibold mb-3 text-[var(--color-text-muted)] uppercase">Resources</h4>
            <div className="space-y-2">
              <a
                href="https://kaspa.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--color-primary)]/10 transition-colors"
              >
                <svg className="w-4 h-4 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                </svg>
                <span className="text-sm">kaspa.org</span>
              </a>
              <a
                href="https://github.com/kaspanet"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--color-primary)]/10 transition-colors"
              >
                <svg className="w-4 h-4 text-[var(--color-primary)]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="text-sm">GitHub</span>
              </a>
              <a
                href="https://discord.gg/kaspa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--color-primary)]/10 transition-colors"
              >
                <svg className="w-4 h-4 text-[var(--color-primary)]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                </svg>
                <span className="text-sm">Discord</span>
              </a>
              <a
                href="https://twitter.com/kaaborDAO"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--color-primary)]/10 transition-colors"
              >
                <svg className="w-4 h-4 text-[var(--color-primary)]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span className="text-sm">Twitter/X</span>
              </a>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
