'use client';

import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { PriceChange } from '@/components/ui/PriceChange';
import { formatCurrency, formatCompact } from '@/lib/utils';
import type { Krc20TokenWithPrice } from '@/types';

interface TokenCardProps {
  token: Krc20TokenWithPrice;
  rank?: number;
}

export function TokenCard({ token, rank }: TokenCardProps) {
  return (
    <Link href={`/krc20/tokens/${token.tick}`}>
      <GlassCard className="p-4 h-full cursor-pointer group">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          {/* Logo/Placeholder */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
            {token.logoUrl ? (
              <img
                src={token.logoUrl}
                alt={token.tick}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-sm font-bold text-white">
                {token.tick.slice(0, 2)}
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              {rank && (
                <span className="text-text-muted text-xs">#{rank}</span>
              )}
              <h3 className="font-bold text-white truncate group-hover:text-primary transition-colors">
                {token.tick}
              </h3>
            </div>
            {token.name && (
              <p className="text-xs text-text-muted truncate">{token.name}</p>
            )}
          </div>

          <PriceChange value={token.change24h} size="sm" />
        </div>

        {/* Price */}
        <div className="mb-3">
          <p className="text-lg font-semibold">
            {formatCurrency(token.price)}
          </p>
          {token.priceKas && (
            <p className="text-xs text-text-muted">
              {token.priceKas.toFixed(8)} KAS
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <p className="text-text-muted uppercase">MCap</p>
            <p className="font-medium">{formatCompact(token.marketCap)}</p>
          </div>
          <div>
            <p className="text-text-muted uppercase">Vol 24h</p>
            <p className="font-medium">{formatCompact(token.volume24h)}</p>
          </div>
          {token.holders && (
            <div>
              <p className="text-text-muted uppercase">Holders</p>
              <p className="font-medium">{formatCompact(token.holders)}</p>
            </div>
          )}
        </div>
      </GlassCard>
    </Link>
  );
}
