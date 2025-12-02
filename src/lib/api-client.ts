/**
 * KASPA-NEXUS Platform - API Client
 * Client for api.kaspa-nexus.io
 */

import { API_CONFIG, API_ENDPOINTS } from '@/config/api';
import type {
  ApiResponse,
  PaginatedResponse,
  ApiError,
  KaspaPrice,
  KaspaStats,
  Krc20TokenWithPrice,
  Krc20MarketOverview,
  OhlcCandle,
  TimeInterval,
  TokenHolder,
} from '@/types';

// ═══════════════════════════════════════════════════════════════
// API CLIENT CLASS
// ═══════════════════════════════════════════════════════════════

class ApiClient {
  private baseUrl: string;
  private apiKey?: string;
  private timeout: number;

  constructor() {
    this.baseUrl = `${API_CONFIG.baseUrl}/${API_CONFIG.version}`;
    this.apiKey = API_CONFIG.internalKey;
    this.timeout = API_CONFIG.timeout;
  }

  /**
   * Make a fetch request with error handling and retries
   */
  private async fetch<T>(
    endpoint: string,
    options: RequestInit = {},
    retryCount = 0
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(this.apiKey && { 'X-API-Key': this.apiKey }),
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error: ApiError = await response.json().catch(() => ({
          success: false,
          error: {
            code: 'UNKNOWN_ERROR',
            message: `HTTP ${response.status}: ${response.statusText}`,
          },
          timestamp: new Date().toISOString(),
        }));
        throw new ApiClientError(error.error.message, error.error.code, response.status);
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      clearTimeout(timeoutId);

      // Retry on network errors
      if (
        retryCount < API_CONFIG.retry.maxRetries &&
        (error instanceof TypeError || (error as Error).name === 'AbortError')
      ) {
        const delay = Math.min(
          API_CONFIG.retry.baseDelay * Math.pow(2, retryCount),
          API_CONFIG.retry.maxDelay
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
        return this.fetch<T>(endpoint, options, retryCount + 1);
      }

      throw error;
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // KASPA ENDPOINTS
  // ═══════════════════════════════════════════════════════════════

  /**
   * Get current Kaspa price and market data
   */
  async getKaspaPrice(): Promise<KaspaPrice> {
    const response = await this.fetch<ApiResponse<KaspaPrice>>(API_ENDPOINTS.kaspa.price);
    return response.data;
  }

  /**
   * Get Kaspa network statistics
   */
  async getKaspaStats(): Promise<KaspaStats> {
    const response = await this.fetch<ApiResponse<KaspaStats>>(API_ENDPOINTS.kaspa.stats);
    return response.data;
  }

  /**
   * Get Kaspa OHLC data
   */
  async getKaspaOhlc(interval: TimeInterval = '1h', limit = 100): Promise<OhlcCandle[]> {
    const response = await this.fetch<ApiResponse<OhlcCandle[]>>(
      `${API_ENDPOINTS.kaspa.ohlc}?interval=${interval}&limit=${limit}`
    );
    return response.data;
  }

  // ═══════════════════════════════════════════════════════════════
  // KRC-20 ENDPOINTS
  // ═══════════════════════════════════════════════════════════════

  /**
   * Get list of all KRC-20 tokens with prices
   */
  async getTokenList(params?: {
    page?: number;
    limit?: number;
    sort?: 'marketCap' | 'volume' | 'change24h' | 'holders';
    order?: 'asc' | 'desc';
  }): Promise<PaginatedResponse<Krc20TokenWithPrice>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', String(params.page));
    if (params?.limit) queryParams.append('limit', String(params.limit));
    if (params?.sort) queryParams.append('sort', params.sort);
    if (params?.order) queryParams.append('order', params.order);

    const query = queryParams.toString();
    const endpoint = `${API_ENDPOINTS.krc20.list}${query ? `?${query}` : ''}`;
    return this.fetch<PaginatedResponse<Krc20TokenWithPrice>>(endpoint);
  }

  /**
   * Get single token details
   */
  async getToken(tick: string): Promise<Krc20TokenWithPrice> {
    const response = await this.fetch<ApiResponse<Krc20TokenWithPrice>>(
      API_ENDPOINTS.krc20.token(tick)
    );
    return response.data;
  }

  /**
   * Get token OHLC data
   */
  async getTokenOhlc(tick: string, interval: TimeInterval = '1h', limit = 100): Promise<OhlcCandle[]> {
    const response = await this.fetch<ApiResponse<OhlcCandle[]>>(
      `${API_ENDPOINTS.krc20.ohlc(tick)}?interval=${interval}&limit=${limit}`
    );
    return response.data;
  }

  /**
   * Get token holders
   */
  async getTokenHolders(tick: string, params?: { page?: number; limit?: number }): Promise<PaginatedResponse<TokenHolder>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', String(params.page));
    if (params?.limit) queryParams.append('limit', String(params.limit));

    const query = queryParams.toString();
    const endpoint = `${API_ENDPOINTS.krc20.holders(tick)}${query ? `?${query}` : ''}`;
    return this.fetch<PaginatedResponse<TokenHolder>>(endpoint);
  }

  // ═══════════════════════════════════════════════════════════════
  // MARKET ENDPOINTS
  // ═══════════════════════════════════════════════════════════════

  /**
   * Get market overview
   */
  async getMarketOverview(): Promise<Krc20MarketOverview> {
    const response = await this.fetch<ApiResponse<Krc20MarketOverview>>(API_ENDPOINTS.market.overview);
    return response.data;
  }

  /**
   * Get trending tokens
   */
  async getTrendingTokens(limit = 10): Promise<Krc20TokenWithPrice[]> {
    const response = await this.fetch<ApiResponse<Krc20TokenWithPrice[]>>(
      `${API_ENDPOINTS.market.trending}?limit=${limit}`
    );
    return response.data;
  }

  /**
   * Get top gainers
   */
  async getTopGainers(limit = 10): Promise<Krc20TokenWithPrice[]> {
    const response = await this.fetch<ApiResponse<Krc20TokenWithPrice[]>>(
      `${API_ENDPOINTS.market.gainers}?limit=${limit}`
    );
    return response.data;
  }

  /**
   * Get top losers
   */
  async getTopLosers(limit = 10): Promise<Krc20TokenWithPrice[]> {
    const response = await this.fetch<ApiResponse<Krc20TokenWithPrice[]>>(
      `${API_ENDPOINTS.market.losers}?limit=${limit}`
    );
    return response.data;
  }

  // ═══════════════════════════════════════════════════════════════
  // HEALTH
  // ═══════════════════════════════════════════════════════════════

  /**
   * Check API health
   */
  async checkHealth(): Promise<{ status: string; timestamp: string }> {
    return this.fetch<{ status: string; timestamp: string }>(API_ENDPOINTS.health);
  }
}

// ═══════════════════════════════════════════════════════════════
// ERROR CLASS
// ═══════════════════════════════════════════════════════════════

export class ApiClientError extends Error {
  constructor(
    message: string,
    public code: string,
    public status?: number
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

// ═══════════════════════════════════════════════════════════════
// SINGLETON EXPORT
// ═══════════════════════════════════════════════════════════════

export const apiClient = new ApiClient();
