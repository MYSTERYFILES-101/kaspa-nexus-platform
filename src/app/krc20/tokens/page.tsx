'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { GlassCard } from '@/components/ui/GlassCard';
import { TokenGrid } from '@/components/tokens/TokenGrid';
import { TokenSearch } from '@/components/tokens/TokenSearch';
import { TokenSort, SortOption } from '@/components/tokens/TokenSort';
import { TokenPagination } from '@/components/tokens/TokenPagination';
import type { Krc20TokenWithPrice } from '@/types';

const TOKENS_PER_PAGE = 24;

export default function TokensPage() {
  const t = useTranslations('tokens');

  // State
  const [tokens, setTokens] = useState<Krc20TokenWithPrice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('marketCap_desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTokens, setTotalTokens] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Fetch tokens from API
  const fetchTokens = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/krc20/tokens?limit=500');

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        setTokens(result.data);
        setTotalTokens(result.total || result.data.length);
        setLastUpdated(new Date());
      } else {
        throw new Error(result.error?.message || 'Failed to fetch tokens');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setTokens([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchTokens();

    // Refresh every 30 seconds
    const interval = setInterval(fetchTokens, 30000);
    return () => clearInterval(interval);
  }, [fetchTokens]);

  // Filter and sort tokens
  const filteredAndSortedTokens = useMemo(() => {
    let result = [...tokens];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        token =>
          token.tick.toLowerCase().includes(query) ||
          (token.name && token.name.toLowerCase().includes(query))
      );
    }

    // Sort
    result.sort((a, b) => {
      switch (sortOption) {
        case 'marketCap_desc':
          return (b.marketCap || 0) - (a.marketCap || 0);
        case 'marketCap_asc':
          return (a.marketCap || 0) - (b.marketCap || 0);
        case 'volume_desc':
          return (b.volume24h || 0) - (a.volume24h || 0);
        case 'change_desc':
          return (b.change24h || 0) - (a.change24h || 0);
        case 'change_asc':
          return (a.change24h || 0) - (b.change24h || 0);
        case 'holders_desc':
          return (b.holders || 0) - (a.holders || 0);
        case 'name_asc':
          return a.tick.localeCompare(b.tick);
        default:
          return 0;
      }
    });

    return result;
  }, [tokens, searchQuery, sortOption]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedTokens.length / TOKENS_PER_PAGE);
  const paginatedTokens = filteredAndSortedTokens.slice(
    (currentPage - 1) * TOKENS_PER_PAGE,
    currentPage * TOKENS_PER_PAGE
  );
  const startRank = (currentPage - 1) * TOKENS_PER_PAGE + 1;

  // Reset to page 1 when filter/sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortOption]);

  return (
    <div className="py-4 md:py-6 lg:py-8">
      {/* Banner */}
      <div className="relative w-full aspect-[21/9] mb-6 rounded-2xl overflow-hidden">
        <Image
          src="/images/banners/krc20-network.png"
          alt="KRC-20 Network"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg-start)]/60 to-transparent" />
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gradient mb-2">
            {t('title')}
          </h1>
          <p className="text-[var(--color-text-secondary)]">
            {t('subtitle', { count: totalTokens })}
          </p>
        </div>

        {/* Live Data Badge */}
        <div className="flex items-center gap-3">
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
      </div>

      {/* Filters */}
      <GlassCard padding="md" className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <TokenSearch onSearch={setSearchQuery} />
          <TokenSort value={sortOption} onChange={setSortOption} />
        </div>
      </GlassCard>

      {/* Error State */}
      {error && (
        <GlassCard padding="lg" className="mb-6 border-[var(--color-error)]/30">
          <div className="flex items-center gap-3 text-[var(--color-error)]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
            <button
              onClick={fetchTokens}
              className="ml-auto px-4 py-2 text-sm glass-input hover:border-[var(--color-primary)]"
            >
              {t('retry')}
            </button>
          </div>
        </GlassCard>
      )}

      {/* Results Info */}
      {!isLoading && !error && searchQuery && (
        <p className="text-sm text-[var(--color-text-muted)] mb-4">
          {t('resultsFound', { count: filteredAndSortedTokens.length })}
        </p>
      )}

      {/* Token Grid */}
      <TokenGrid
        tokens={paginatedTokens}
        isLoading={isLoading}
        startRank={startRank}
      />

      {/* Pagination */}
      {!isLoading && !error && totalPages > 1 && (
        <TokenPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
