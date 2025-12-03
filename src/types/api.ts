/**
 * KASPA-NEXUS Platform - API Types
 * Types for api.kaspa-nexus.io responses
 */

// ═══════════════════════════════════════════════════════════════
// KASPA TYPES
// ═══════════════════════════════════════════════════════════════

export interface KaspaPrice {
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number;
  rank: number;
  lastUpdated: string;
}

export interface KaspaStats {
  blockHeight: number;
  hashrate: number;
  difficulty: number;
  blockTime: number;
  tps: number;
  totalTransactions: number;
}

export interface KaspaNetworkStats {
  network: {
    networkName: string;
    blockCount: string;
    headerCount: string;
    tipHashes: string[];
    difficulty: number;
    pastMedianTime: string;
    virtualParentHashes: string[];
    pruningPointHash: string;
    virtualDaaScore: string;
    sink: string;
  };
  mining: {
    blockReward: number;
    hashrate: number;
    hashrateFormatted: string;
  };
  market: {
    price: number;
    priceFormatted: string;
    marketCap: number;
    marketCapFormatted: string;
  };
  dag: {
    blueScore: number;
  };
}

// ═══════════════════════════════════════════════════════════════
// KRC-20 TOKEN TYPES
// ═══════════════════════════════════════════════════════════════

export interface Krc20Token {
  tick: string;
  name: string;
  maxSupply: string;
  mintedSupply: string;
  holders: number;
  transfers: number;
  mints: number;
  deployedAt: string;
  deployTxId: string;
  state: 'deployed' | 'minting' | 'finished';
  preMint: string;
  limit: string;
  decimal: number;
}

export interface Krc20TokenWithPrice extends Krc20Token {
  price: number;
  priceKas: number;
  change24h: number;
  change7d: number;
  volume24h: number;
  marketCap: number;
  rank: number;
  logoUrl?: string;
}

export interface Krc20MarketOverview {
  totalTokens: number;
  totalMarketCap: number;
  totalVolume24h: number;
  topGainers: Krc20TokenWithPrice[];
  topLosers: Krc20TokenWithPrice[];
  trending: Krc20TokenWithPrice[];
}

// ═══════════════════════════════════════════════════════════════
// OHLC / CHART TYPES
// ═══════════════════════════════════════════════════════════════

export interface OhlcCandle {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export type TimeInterval = '1m' | '5m' | '15m' | '1h' | '4h' | '1d' | '1w';

// ═══════════════════════════════════════════════════════════════
// HOLDER TYPES
// ═══════════════════════════════════════════════════════════════

export interface TokenHolder {
  address: string;
  balance: string;
  percentage: number;
  rank: number;
}

export interface HolderDistribution {
  whales: number; // > 1%
  large: number; // 0.1% - 1%
  medium: number; // 0.01% - 0.1%
  small: number; // < 0.01%
}

// ═══════════════════════════════════════════════════════════════
// API RESPONSE TYPES
// ═══════════════════════════════════════════════════════════════

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  timestamp: string;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  timestamp: string;
}

// ═══════════════════════════════════════════════════════════════
// WEBSOCKET TYPES
// ═══════════════════════════════════════════════════════════════

export interface WsPriceUpdate {
  type: 'price_update';
  tick: string;
  price: number;
  priceKas: number;
  change24h: number;
  volume24h: number;
  timestamp: number;
}

export interface WsTradeUpdate {
  type: 'trade';
  tick: string;
  price: number;
  amount: string;
  side: 'buy' | 'sell';
  txId: string;
  timestamp: number;
}

export interface WsBlockUpdate {
  type: 'block';
  height: number;
  hash: string;
  transactions: number;
  timestamp: number;
}

export type WsMessage = WsPriceUpdate | WsTradeUpdate | WsBlockUpdate;
