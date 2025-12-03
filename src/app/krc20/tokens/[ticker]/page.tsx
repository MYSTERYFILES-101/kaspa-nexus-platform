'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { PriceChange } from '@/components/ui/PriceChange';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatCurrency, formatCompact } from '@/lib/utils';
import type { Krc20TokenWithPrice } from '@/types';

export default function TokenDetailPage() {
  const params = useParams();
  const ticker = (params.ticker as string)?.toUpperCase();
  const t = useTranslations('tokenDetail');
  const tCommon = useTranslations('common');

  const [token, setToken] = useState<Krc20TokenWithPrice | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasData, setHasData] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchToken = useCallback(async () => {
    if (!ticker) return;

    try {
      const res = await fetch(`/api/krc20/tokens/${ticker}`);
      const json = await res.json();

      if (json.success && json.data) {
        setToken(json.data);
        setHasData(true);
        setLastUpdated(new Date());
      } else {
        // No error - just no data available yet
        setHasData(false);
      }
    } catch {
      setHasData(false);
    } finally {
      setLoading(false);
    }
  }, [ticker]);

  useEffect(() => {
    fetchToken();
    const interval = setInterval(fetchToken, 30000);
    return () => clearInterval(interval);
  }, [fetchToken]);

  // Calculate mint progress
  const getMintProgress = () => {
    if (!token) return null;
    const minted = parseFloat(token.mintedSupply || '0');
    const max = parseFloat(token.maxSupply || '1');
    return Math.min(100, (minted / max) * 100);
  };

  // Initial loading state
  if (loading) {
    return (
      <div className="py-4 md:py-6 lg:py-8">
        <div className="mb-6">
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-40" />
            <Skeleton className="h-80" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-60" />
            <Skeleton className="h-80" />
          </div>
        </div>
      </div>
    );
  }

  // Helper component for placeholder values
  const PlaceholderValue = ({ children, showSkeleton = true }: { children?: React.ReactNode; showSkeleton?: boolean }) => {
    if (hasData && children !== undefined && children !== null) {
      return <>{children}</>;
    }
    if (showSkeleton) {
      return <Skeleton className="h-6 w-20" inline />;
    }
    return <span className="text-[var(--color-text-muted)]">-</span>;
  };

  return (
    <div className="py-4 md:py-6 lg:py-8">
      {/* Back Link */}
      <Link
        href="/krc20/tokens"
        className="inline-flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] mb-4 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {t('backToTokens')}
      </Link>

      {/* Indexer Status Banner - Show when no data */}
      {!hasData && (
        <GlassCard className="p-4 mb-6 border border-[var(--color-warning)]/30 bg-[var(--color-warning)]/5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--color-warning)]/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-[var(--color-warning)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[var(--color-warning)] mb-1">{t('indexerSyncing')}</h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                {t('indexerSyncingDesc')}
              </p>
              <div className="flex items-center gap-4 mt-2 text-xs text-[var(--color-text-muted)]">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-warning)] animate-pulse" />
                  {t('syncInProgress')}
                </span>
              </div>
            </div>
          </div>
        </GlassCard>
      )}

      {/* Token Header */}
      <GlassCard className="p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Token Icon + Name */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-lg">
              {token?.logoUrl ? (
                <img src={token.logoUrl} alt={ticker} className="w-full h-full rounded-full object-cover" />
              ) : (
                <span className="text-2xl font-bold text-white">{ticker.slice(0, 2)}</span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-bold">{ticker}</h1>
                {hasData && token?.rank && (
                  <span className="px-2 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-medium">
                    #{token.rank}
                  </span>
                )}
                {!hasData && (
                  <span className="px-2 py-1 rounded-full bg-white/5 text-[var(--color-text-muted)] text-sm">
                    {t('dataLoading')}
                  </span>
                )}
              </div>
              {token?.name && token.name !== ticker && (
                <p className="text-[var(--color-text-muted)]">{token.name}</p>
              )}
            </div>
          </div>

          {/* Price + Change */}
          <div className="md:ml-auto text-left md:text-right">
            <div className="flex items-center gap-3 md:justify-end">
              {hasData && token?.price ? (
                <>
                  <span className="text-2xl md:text-3xl font-bold">{formatCurrency(token.price)}</span>
                  <PriceChange value={token.change24h} size="md" />
                </>
              ) : (
                <>
                  <Skeleton className="h-9 w-32" />
                  <Skeleton className="h-6 w-16" />
                </>
              )}
            </div>
            {hasData && token?.priceKas ? (
              <p className="text-sm text-[var(--color-text-muted)]">
                {token.priceKas.toFixed(8)} KAS
              </p>
            ) : (
              <Skeleton className="h-4 w-24 mt-1" />
            )}
          </div>
        </div>

        {/* Live Badge */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
          <span className={`w-2 h-2 rounded-full ${hasData ? 'bg-[var(--color-success)]' : 'bg-[var(--color-warning)]'} animate-pulse`} />
          <span className="text-xs text-[var(--color-text-muted)]">
            {hasData ? tCommon('liveData') : t('waitingForData')}
          </span>
          {lastUpdated && hasData && (
            <span className="text-xs text-[var(--color-text-muted)]">
              • {t('updated')}: {lastUpdated.toLocaleTimeString()}
            </span>
          )}
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Grid */}
          <GlassCard className="p-6">
            <h2 className="text-lg font-bold mb-4">{t('marketStats')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="glass-card p-4">
                <p className="text-xs text-[var(--color-text-muted)] uppercase mb-1">{t('marketCap')}</p>
                <p className="text-lg font-bold">
                  <PlaceholderValue>{hasData && token?.marketCap ? formatCompact(token.marketCap) : null}</PlaceholderValue>
                </p>
              </div>
              <div className="glass-card p-4">
                <p className="text-xs text-[var(--color-text-muted)] uppercase mb-1">{t('volume24h')}</p>
                <p className="text-lg font-bold">
                  <PlaceholderValue>{hasData && token?.volume24h ? formatCompact(token.volume24h) : null}</PlaceholderValue>
                </p>
              </div>
              <div className="glass-card p-4">
                <p className="text-xs text-[var(--color-text-muted)] uppercase mb-1">{t('holders')}</p>
                <p className="text-lg font-bold">
                  <PlaceholderValue>{hasData && token?.holders ? formatCompact(token.holders) : null}</PlaceholderValue>
                </p>
              </div>
              <div className="glass-card p-4">
                <p className="text-xs text-[var(--color-text-muted)] uppercase mb-1">{t('circulatingSupply')}</p>
                <p className="text-lg font-bold">
                  <PlaceholderValue>{hasData && token?.mintedSupply ? formatCompact(parseFloat(token.mintedSupply)) : null}</PlaceholderValue>
                </p>
              </div>
              <div className="glass-card p-4">
                <p className="text-xs text-[var(--color-text-muted)] uppercase mb-1">{t('maxSupply')}</p>
                <p className="text-lg font-bold">
                  <PlaceholderValue>{hasData && token?.maxSupply ? formatCompact(parseFloat(token.maxSupply)) : null}</PlaceholderValue>
                </p>
              </div>
              <div className="glass-card p-4">
                <p className="text-xs text-[var(--color-text-muted)] uppercase mb-1">{t('transfers')}</p>
                <p className="text-lg font-bold">
                  <PlaceholderValue>{hasData && token?.transfers ? formatCompact(token.transfers) : null}</PlaceholderValue>
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Price Chart Placeholder */}
          <GlassCard className="p-6">
            <h2 className="text-lg font-bold mb-4">{t('priceChart')}</h2>
            <div className="h-[300px] flex items-center justify-center border border-dashed border-white/10 rounded-lg">
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto mb-3 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
                <p className="text-[var(--color-text-muted)] font-medium">
                  {hasData ? t('chartComingSoon') : t('chartWaitingData')}
                </p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">{t('chartDescription')}</p>
              </div>
            </div>
          </GlassCard>

          {/* Token Info */}
          <GlassCard className="p-6">
            <h2 className="text-lg font-bold mb-4">{t('tokenInfo')}</h2>
            <div className="space-y-4">
              {/* Mint Progress */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[var(--color-text-muted)]">{t('mintProgress')}</span>
                  <span className="font-medium">
                    {getMintProgress() !== null ? `${getMintProgress()?.toFixed(2)}%` : '-'}
                  </span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  {hasData && getMintProgress() !== null ? (
                    <div
                      className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-success)] transition-all duration-500"
                      style={{ width: `${getMintProgress()}%` }}
                    />
                  ) : (
                    <div className="h-full w-full bg-white/10 animate-pulse" />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[var(--color-text-muted)] uppercase mb-1">{t('state')}</p>
                  {hasData && token?.state ? (
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      token.state === 'finished'
                        ? 'bg-[var(--color-success)]/20 text-[var(--color-success)]'
                        : token.state === 'minting'
                        ? 'bg-[var(--color-warning)]/20 text-[var(--color-warning)]'
                        : 'bg-[var(--color-primary)]/20 text-[var(--color-primary)]'
                    }`}>
                      {token.state.toUpperCase()}
                    </span>
                  ) : (
                    <Skeleton className="h-6 w-20" />
                  )}
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-muted)] uppercase mb-1">{t('decimals')}</p>
                  <p className="font-medium">
                    <PlaceholderValue showSkeleton={false}>{hasData && token?.decimal}</PlaceholderValue>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-muted)] uppercase mb-1">{t('mintLimit')}</p>
                  <p className="font-medium">
                    <PlaceholderValue>{hasData && token?.limit ? formatCompact(parseFloat(token.limit)) : null}</PlaceholderValue>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-muted)] uppercase mb-1">{t('totalMints')}</p>
                  <p className="font-medium">
                    <PlaceholderValue>{hasData && token?.mints ? formatCompact(token.mints) : null}</PlaceholderValue>
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-[var(--color-text-muted)] uppercase mb-1">{t('deployedAt')}</p>
                <p className="font-medium">
                  {hasData && token?.deployedAt ? (
                    new Date(token.deployedAt).toLocaleDateString()
                  ) : (
                    <span className="text-[var(--color-text-muted)]">-</span>
                  )}
                </p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Sidebar (1/3) */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold mb-4">{t('quickStats')}</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-[var(--color-text-muted)]">{t('change24h')}</span>
                {hasData && token?.change24h !== undefined ? (
                  <PriceChange value={token.change24h} size="sm" />
                ) : (
                  <Skeleton className="h-5 w-14" />
                )}
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-[var(--color-text-muted)]">{t('change7d')}</span>
                {hasData && token?.change7d !== undefined ? (
                  <PriceChange value={token.change7d} size="sm" />
                ) : (
                  <Skeleton className="h-5 w-14" />
                )}
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-[var(--color-text-muted)]">{t('priceInKas')}</span>
                {hasData && token?.priceKas ? (
                  <span className="font-medium">{token.priceKas.toFixed(8)} KAS</span>
                ) : (
                  <Skeleton className="h-5 w-24" />
                )}
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-[var(--color-text-muted)]">{t('rank')}</span>
                {hasData && token?.rank ? (
                  <span className="font-medium">#{token.rank}</span>
                ) : (
                  <span className="text-[var(--color-text-muted)]">-</span>
                )}
              </div>
            </div>
          </GlassCard>

          {/* Top Holders */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold mb-4">{t('topHolders')}</h3>
            {hasData ? (
              <>
                <div className="space-y-2">
                  {/* Real holder data would go here */}
                  <p className="text-sm text-[var(--color-text-muted)] text-center py-4">
                    {t('holdersNote')}
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/5 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[var(--color-text-muted)] animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-sm text-[var(--color-text-muted)]">{t('holdersIndexing')}</p>
              </div>
            )}
          </GlassCard>

          {/* Links */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold mb-4">{t('resources')}</h3>
            <div className="space-y-2">
              <a
                href={`https://kas.fyi/token/${ticker}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>kas.fyi</span>
              </a>
              <a
                href={`https://explorer.kaspa.org`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span>Kaspa Explorer</span>
              </a>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
