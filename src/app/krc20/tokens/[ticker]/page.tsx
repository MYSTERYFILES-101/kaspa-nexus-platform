'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { PriceChange } from '@/components/ui/PriceChange';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatCurrency, formatCompact } from '@/lib/utils';
import type { Krc20TokenWithPrice, TokenHolder } from '@/types';

// Mock holders data until API is ready
const MOCK_HOLDERS: TokenHolder[] = [
  { address: 'kaspa:qr...x7k9', balance: '1500000000', percentage: 15.0, rank: 1 },
  { address: 'kaspa:qq...m3f2', balance: '800000000', percentage: 8.0, rank: 2 },
  { address: 'kaspa:qp...j8n4', balance: '500000000', percentage: 5.0, rank: 3 },
  { address: 'kaspa:qz...k2l5', balance: '350000000', percentage: 3.5, rank: 4 },
  { address: 'kaspa:qw...p9r6', balance: '280000000', percentage: 2.8, rank: 5 },
  { address: 'kaspa:qe...t4v7', balance: '220000000', percentage: 2.2, rank: 6 },
  { address: 'kaspa:qt...b1c8', balance: '180000000', percentage: 1.8, rank: 7 },
  { address: 'kaspa:qy...n5d9', balance: '150000000', percentage: 1.5, rank: 8 },
  { address: 'kaspa:qu...f2g0', balance: '120000000', percentage: 1.2, rank: 9 },
  { address: 'kaspa:qi...h7j1', balance: '100000000', percentage: 1.0, rank: 10 },
];

export default function TokenDetailPage() {
  const params = useParams();
  const ticker = (params.ticker as string)?.toUpperCase();
  const t = useTranslations('tokenDetail');
  const tCommon = useTranslations('common');

  const [token, setToken] = useState<Krc20TokenWithPrice | null>(null);
  const [holders] = useState<TokenHolder[]>(MOCK_HOLDERS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchToken = useCallback(async () => {
    if (!ticker) return;

    try {
      const res = await fetch(`/api/krc20/tokens/${ticker}`);
      const json = await res.json();

      if (json.success && json.data) {
        setToken(json.data);
        setError(null);
        setLastUpdated(new Date());
      } else {
        setError(json.error || 'Token not found');
      }
    } catch {
      setError('Failed to load token data');
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
    if (!token) return 0;
    const minted = parseFloat(token.mintedSupply || '0');
    const max = parseFloat(token.maxSupply || '1');
    return Math.min(100, (minted / max) * 100);
  };

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

  if (error) {
    return (
      <div className="py-4 md:py-6 lg:py-8">
        <GlassCard className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-error)]/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-[var(--color-error)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">{t('tokenNotFound')}</h2>
          <p className="text-[var(--color-text-muted)] mb-4">{t('tokenNotFoundDesc', { ticker })}</p>
          <Link href="/krc20/tokens" className="btn-primary inline-block">
            {t('backToTokens')}
          </Link>
        </GlassCard>
      </div>
    );
  }

  // Use mock data if no real data
  const displayToken = token || {
    tick: ticker,
    name: ticker,
    price: 0.00123,
    priceKas: 0.0156,
    change24h: 5.67,
    change7d: 12.34,
    marketCap: 45000000,
    volume24h: 2500000,
    holders: 12500,
    maxSupply: '10000000000',
    mintedSupply: '7500000000',
    circulatingSupply: 7500000000,
    transfers: 156789,
    mints: 89000,
    deployedAt: '2024-03-15',
    state: 'minting' as const,
    decimal: 8,
    deployTxId: '',
    preMint: '0',
    limit: '1000',
    rank: 5,
    logoUrl: undefined as string | undefined,
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

      {/* Token Header */}
      <GlassCard className="p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Token Icon + Name */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-lg">
              {displayToken.logoUrl ? (
                <img src={displayToken.logoUrl} alt={displayToken.tick} className="w-full h-full rounded-full object-cover" />
              ) : (
                <span className="text-2xl font-bold text-white">{displayToken.tick.slice(0, 2)}</span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-bold">{displayToken.tick}</h1>
                {displayToken.rank && (
                  <span className="px-2 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-medium">
                    #{displayToken.rank}
                  </span>
                )}
              </div>
              {displayToken.name && displayToken.name !== displayToken.tick && (
                <p className="text-[var(--color-text-muted)]">{displayToken.name}</p>
              )}
            </div>
          </div>

          {/* Price + Change */}
          <div className="md:ml-auto text-left md:text-right">
            <div className="flex items-center gap-3 md:justify-end">
              <span className="text-2xl md:text-3xl font-bold">{formatCurrency(displayToken.price)}</span>
              <PriceChange value={displayToken.change24h} size="md" />
            </div>
            {displayToken.priceKas && (
              <p className="text-sm text-[var(--color-text-muted)]">
                {displayToken.priceKas.toFixed(8)} KAS
              </p>
            )}
          </div>
        </div>

        {/* Live Badge */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
          <span className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
          <span className="text-xs text-[var(--color-text-muted)]">
            {tCommon('liveData')}
          </span>
          {lastUpdated && (
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
                <p className="text-lg font-bold">{formatCompact(displayToken.marketCap)}</p>
              </div>
              <div className="glass-card p-4">
                <p className="text-xs text-[var(--color-text-muted)] uppercase mb-1">{t('volume24h')}</p>
                <p className="text-lg font-bold">{formatCompact(displayToken.volume24h)}</p>
              </div>
              <div className="glass-card p-4">
                <p className="text-xs text-[var(--color-text-muted)] uppercase mb-1">{t('holders')}</p>
                <p className="text-lg font-bold">{formatCompact(displayToken.holders || 0)}</p>
              </div>
              <div className="glass-card p-4">
                <p className="text-xs text-[var(--color-text-muted)] uppercase mb-1">{t('circulatingSupply')}</p>
                <p className="text-lg font-bold">{formatCompact(parseFloat(displayToken.mintedSupply || '0'))}</p>
              </div>
              <div className="glass-card p-4">
                <p className="text-xs text-[var(--color-text-muted)] uppercase mb-1">{t('maxSupply')}</p>
                <p className="text-lg font-bold">{formatCompact(parseFloat(displayToken.maxSupply || '0'))}</p>
              </div>
              <div className="glass-card p-4">
                <p className="text-xs text-[var(--color-text-muted)] uppercase mb-1">{t('transfers')}</p>
                <p className="text-lg font-bold">{formatCompact(displayToken.transfers || 0)}</p>
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
                <p className="text-[var(--color-text-muted)] font-medium">{t('chartComingSoon')}</p>
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
                  <span className="font-medium">{getMintProgress().toFixed(2)}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-success)] transition-all duration-500"
                    style={{ width: `${getMintProgress()}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[var(--color-text-muted)] uppercase mb-1">{t('state')}</p>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    displayToken.state === 'finished'
                      ? 'bg-[var(--color-success)]/20 text-[var(--color-success)]'
                      : displayToken.state === 'minting'
                      ? 'bg-[var(--color-warning)]/20 text-[var(--color-warning)]'
                      : 'bg-[var(--color-primary)]/20 text-[var(--color-primary)]'
                  }`}>
                    {displayToken.state?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-muted)] uppercase mb-1">{t('decimals')}</p>
                  <p className="font-medium">{displayToken.decimal}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-muted)] uppercase mb-1">{t('mintLimit')}</p>
                  <p className="font-medium">{formatCompact(parseFloat(displayToken.limit || '0'))}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-muted)] uppercase mb-1">{t('totalMints')}</p>
                  <p className="font-medium">{formatCompact(displayToken.mints || 0)}</p>
                </div>
              </div>

              {displayToken.deployedAt && (
                <div>
                  <p className="text-xs text-[var(--color-text-muted)] uppercase mb-1">{t('deployedAt')}</p>
                  <p className="font-medium">{new Date(displayToken.deployedAt).toLocaleDateString()}</p>
                </div>
              )}
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
                <PriceChange value={displayToken.change24h} size="sm" />
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-[var(--color-text-muted)]">{t('change7d')}</span>
                <PriceChange value={displayToken.change7d || 0} size="sm" />
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-[var(--color-text-muted)]">{t('priceInKas')}</span>
                <span className="font-medium">{displayToken.priceKas?.toFixed(8)} KAS</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-[var(--color-text-muted)]">{t('rank')}</span>
                <span className="font-medium">#{displayToken.rank || '-'}</span>
              </div>
            </div>
          </GlassCard>

          {/* Top Holders */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold mb-4">{t('topHolders')}</h3>
            <div className="space-y-2">
              {holders.slice(0, 10).map((holder) => (
                <div key={holder.rank} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                  <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs font-medium">
                    {holder.rank}
                  </span>
                  <span className="flex-1 font-mono text-xs text-[var(--color-text-muted)] truncate">
                    {holder.address}
                  </span>
                  <span className="text-sm font-medium">{holder.percentage.toFixed(2)}%</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-[var(--color-text-muted)] mt-3 text-center">
              {t('holdersNote')}
            </p>
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
