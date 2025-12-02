/**
 * KASPA-NEXUS Platform - API Configuration
 */

export const API_CONFIG = {
  // Base URL for the KASPA-NEXUS API
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.kaspa-nexus.io',

  // API Version
  version: 'v1',

  // Internal API Key (for server-side requests - no rate limits)
  internalKey: process.env.KASPA_NEXUS_INTERNAL_KEY || '',

  // WebSocket URL
  wsUrl: process.env.NEXT_PUBLIC_WS_URL || 'wss://api.kaspa-nexus.io',

  // Timeouts
  timeout: 30000,

  // Retry configuration
  retry: {
    maxRetries: 3,
    baseDelay: 1000,
    maxDelay: 10000,
  },

  // Cache TTLs (in seconds) - for client-side caching
  cacheTtl: {
    kaspaPrice: 10,
    tokenList: 60,
    tokenDetails: 120,
    ohlc: 300,
    marketOverview: 30,
  },
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  // Kaspa
  kaspa: {
    price: '/kaspa/price',
    stats: '/kaspa/stats',
    ohlc: '/kaspa/ohlc',
  },

  // KRC-20 Tokens
  krc20: {
    list: '/krc20/tokens',
    token: (tick: string) => `/krc20/tokens/${tick}`,
    price: (tick: string) => `/krc20/tokens/${tick}/price`,
    ohlc: (tick: string) => `/krc20/tokens/${tick}/ohlc`,
    holders: (tick: string) => `/krc20/tokens/${tick}/holders`,
    trades: (tick: string) => `/krc20/tokens/${tick}/trades`,
  },

  // Market
  market: {
    overview: '/market/overview',
    trending: '/market/trending',
    gainers: '/market/gainers',
    losers: '/market/losers',
  },

  // Health
  health: '/health',
} as const;

// Build full URL
export function buildApiUrl(endpoint: string, params?: Record<string, string | number>): string {
  const url = new URL(`${API_CONFIG.baseUrl}/${API_CONFIG.version}${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  return url.toString();
}
