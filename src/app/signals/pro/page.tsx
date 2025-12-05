'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { GlassCard } from '@/components/ui/GlassCard';
import { SignalsSwitchbar } from '@/components/signals/SignalsSwitchbar';

// Types
interface TrailingEvent {
  type: 'tp_hit' | 'sl_moved' | 'closed';
  price: number;
  oldSL?: number;
  newSL?: number;
  tpLevel?: number;
  profit?: number;
  timestamp: string;
}

interface Signal {
  id: string;
  coin: 'BTC' | 'ETH' | 'KAS';
  type: 'BUY' | 'SELL';
  status: 'active' | 'closed';
  entryPrice: number;
  currentPrice: number;
  initialSL: number;
  currentSL: number;
  tp1: number;
  tp2: number;
  tp3: number;
  tp4: number;
  tp5: number;
  confidence: number;
  tpHit: number;
  trailingHistory: TrailingEvent[];
  result?: 'win' | 'loss';
  finalProfit?: number;
  createdAt: string;
  closedAt?: string;
}

interface CoinStats {
  coin: 'BTC' | 'ETH' | 'KAS';
  signals: number;
  wins: number;
  losses: number;
  winRate: number;
  avgProfit: number;
  icon: string;
  color: string;
  // Stats by time period
  week: { signals: number; wins: number; losses: number; winRate: number; avgProfit: number };
  month: { signals: number; wins: number; losses: number; winRate: number; avgProfit: number };
  total: { signals: number; wins: number; losses: number; winRate: number; avgProfit: number };
}

// Mock Data - Extended with time periods
const mockCoinStats: CoinStats[] = [
  {
    coin: 'BTC',
    signals: 45,
    wins: 38,
    losses: 7,
    winRate: 84.4,
    avgProfit: 12.3,
    icon: '₿',
    color: 'from-orange-500 to-yellow-500',
    week: { signals: 8, wins: 7, losses: 1, winRate: 87.5, avgProfit: 14.2 },
    month: { signals: 24, wins: 21, losses: 3, winRate: 87.5, avgProfit: 13.1 },
    total: { signals: 45, wins: 38, losses: 7, winRate: 84.4, avgProfit: 12.3 },
  },
  {
    coin: 'ETH',
    signals: 32,
    wins: 26,
    losses: 6,
    winRate: 81.3,
    avgProfit: 9.8,
    icon: 'Ξ',
    color: 'from-purple-500 to-blue-500',
    week: { signals: 5, wins: 4, losses: 1, winRate: 80.0, avgProfit: 8.5 },
    month: { signals: 18, wins: 15, losses: 3, winRate: 83.3, avgProfit: 10.2 },
    total: { signals: 32, wins: 26, losses: 6, winRate: 81.3, avgProfit: 9.8 },
  },
  {
    coin: 'KAS',
    signals: 28,
    wins: 25,
    losses: 3,
    winRate: 89.3,
    avgProfit: 18.5,
    icon: 'K',
    color: 'from-cyan-500 to-teal-500',
    week: { signals: 6, wins: 6, losses: 0, winRate: 100.0, avgProfit: 22.3 },
    month: { signals: 15, wins: 14, losses: 1, winRate: 93.3, avgProfit: 19.8 },
    total: { signals: 28, wins: 25, losses: 3, winRate: 89.3, avgProfit: 18.5 },
  },
];

// Mock Signals
const mockSignals: Signal[] = [
  {
    id: 'SIG-1247',
    coin: 'BTC',
    type: 'BUY',
    status: 'active',
    entryPrice: 97450.00,
    currentPrice: 99200.00,
    initialSL: 94200.00,
    currentSL: 97450.00,
    tp1: 99500.00,
    tp2: 101200.00,
    tp3: 103000.00,
    tp4: 105500.00,
    tp5: 108000.00,
    confidence: 87,
    tpHit: 1,
    trailingHistory: [
      { type: 'tp_hit', price: 99500.00, tpLevel: 1, profit: 2.1, timestamp: '2025-12-05 18:45:22' },
      { type: 'sl_moved', price: 99500.00, oldSL: 94200.00, newSL: 97450.00, timestamp: '2025-12-05 18:45:23' },
    ],
    createdAt: '2025-12-05 14:32:15',
  },
  {
    id: 'SIG-1246',
    coin: 'ETH',
    type: 'BUY',
    status: 'active',
    entryPrice: 3850.00,
    currentPrice: 3920.00,
    initialSL: 3720.00,
    currentSL: 3720.00,
    tp1: 3950.00,
    tp2: 4050.00,
    tp3: 4150.00,
    tp4: 4300.00,
    tp5: 4500.00,
    confidence: 82,
    tpHit: 0,
    trailingHistory: [],
    createdAt: '2025-12-05 12:15:08',
  },
  {
    id: 'SIG-1248',
    coin: 'KAS',
    type: 'BUY',
    status: 'active',
    entryPrice: 0.1280,
    currentPrice: 0.1345,
    initialSL: 0.1180,
    currentSL: 0.1180,
    tp1: 0.1380,
    tp2: 0.1480,
    tp3: 0.1580,
    tp4: 0.1720,
    tp5: 0.1900,
    confidence: 91,
    tpHit: 0,
    trailingHistory: [],
    createdAt: '2025-12-05 16:22:44',
  },
  {
    id: 'SIG-1245',
    coin: 'KAS',
    type: 'BUY',
    status: 'closed',
    entryPrice: 0.1234,
    currentPrice: 0.1456,
    initialSL: 0.1100,
    currentSL: 0.1350,
    tp1: 0.1350,
    tp2: 0.1450,
    tp3: 0.1550,
    tp4: 0.1700,
    tp5: 0.1900,
    confidence: 91,
    tpHit: 3,
    result: 'win',
    finalProfit: 17.5,
    trailingHistory: [
      { type: 'tp_hit', price: 0.1350, tpLevel: 1, profit: 9.4, timestamp: '2025-12-04 16:22:11' },
      { type: 'sl_moved', price: 0.1350, oldSL: 0.1100, newSL: 0.1234, timestamp: '2025-12-04 16:22:12' },
      { type: 'tp_hit', price: 0.1450, tpLevel: 2, profit: 17.5, timestamp: '2025-12-04 22:45:33' },
      { type: 'sl_moved', price: 0.1450, oldSL: 0.1234, newSL: 0.1350, timestamp: '2025-12-04 22:45:34' },
      { type: 'tp_hit', price: 0.1550, tpLevel: 3, profit: 25.6, timestamp: '2025-12-05 08:12:45' },
      { type: 'sl_moved', price: 0.1550, oldSL: 0.1350, newSL: 0.1450, timestamp: '2025-12-05 08:12:46' },
      { type: 'closed', price: 0.1456, profit: 17.5, timestamp: '2025-12-05 10:33:18' },
    ],
    createdAt: '2025-12-04 10:08:22',
    closedAt: '2025-12-05 10:33:18',
  },
  {
    id: 'SIG-1244',
    coin: 'BTC',
    type: 'SELL',
    status: 'closed',
    entryPrice: 95800.00,
    currentPrice: 94200.00,
    initialSL: 97500.00,
    currentSL: 95800.00,
    tp1: 94500.00,
    tp2: 93200.00,
    tp3: 91800.00,
    tp4: 90000.00,
    tp5: 88000.00,
    confidence: 79,
    tpHit: 2,
    result: 'win',
    finalProfit: 2.7,
    trailingHistory: [
      { type: 'tp_hit', price: 94500.00, tpLevel: 1, profit: 1.4, timestamp: '2025-12-03 20:15:44' },
      { type: 'sl_moved', price: 94500.00, oldSL: 97500.00, newSL: 95800.00, timestamp: '2025-12-03 20:15:45' },
      { type: 'tp_hit', price: 93200.00, tpLevel: 2, profit: 2.7, timestamp: '2025-12-04 04:22:11' },
      { type: 'sl_moved', price: 93200.00, oldSL: 95800.00, newSL: 94500.00, timestamp: '2025-12-04 04:22:12' },
      { type: 'closed', price: 94200.00, profit: 1.7, timestamp: '2025-12-04 08:45:33' },
    ],
    createdAt: '2025-12-03 14:30:00',
    closedAt: '2025-12-04 08:45:33',
  },
  {
    id: 'SIG-1243',
    coin: 'ETH',
    type: 'BUY',
    status: 'closed',
    entryPrice: 3720.00,
    currentPrice: 3650.00,
    initialSL: 3600.00,
    currentSL: 3600.00,
    tp1: 3820.00,
    tp2: 3920.00,
    tp3: 4020.00,
    tp4: 4150.00,
    tp5: 4300.00,
    confidence: 74,
    tpHit: 0,
    result: 'loss',
    finalProfit: -3.2,
    trailingHistory: [
      { type: 'closed', price: 3600.00, profit: -3.2, timestamp: '2025-12-03 06:12:55' },
    ],
    createdAt: '2025-12-02 22:45:00',
    closedAt: '2025-12-03 06:12:55',
  },
  {
    id: 'SIG-1242',
    coin: 'BTC',
    type: 'BUY',
    status: 'closed',
    entryPrice: 92500.00,
    currentPrice: 95800.00,
    initialSL: 89500.00,
    currentSL: 94500.00,
    tp1: 94500.00,
    tp2: 96500.00,
    tp3: 98500.00,
    tp4: 101000.00,
    tp5: 104000.00,
    confidence: 88,
    tpHit: 2,
    result: 'win',
    finalProfit: 3.6,
    trailingHistory: [
      { type: 'tp_hit', price: 94500.00, tpLevel: 1, profit: 2.2, timestamp: '2025-12-02 14:33:22' },
      { type: 'sl_moved', price: 94500.00, oldSL: 89500.00, newSL: 92500.00, timestamp: '2025-12-02 14:33:23' },
      { type: 'tp_hit', price: 96500.00, tpLevel: 2, profit: 4.3, timestamp: '2025-12-03 02:15:11' },
      { type: 'sl_moved', price: 96500.00, oldSL: 92500.00, newSL: 94500.00, timestamp: '2025-12-03 02:15:12' },
      { type: 'closed', price: 95800.00, profit: 3.6, timestamp: '2025-12-03 10:22:45' },
    ],
    createdAt: '2025-12-02 08:15:00',
    closedAt: '2025-12-03 10:22:45',
  },
];

export default function SignalsProPage() {
  const t = useTranslations('signalsPro');
  const [selectedCoin, setSelectedCoin] = useState<'BTC' | 'ETH' | 'KAS' | null>(null);
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'total'>('total');
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);

  // Get active signals
  const activeSignals = mockSignals.filter(s => s.status === 'active');

  // Get signals for selected coin
  const coinSignals = selectedCoin
    ? mockSignals.filter(s => s.coin === selectedCoin)
    : [];

  // Get stats for selected time period
  const getStatsForPeriod = (stats: CoinStats) => {
    return stats[timeFilter];
  };

  // Calculate total stats for time period
  const getTotalStats = () => {
    const totals = mockCoinStats.reduce(
      (acc, stat) => {
        const periodStats = getStatsForPeriod(stat);
        return {
          signals: acc.signals + periodStats.signals,
          wins: acc.wins + periodStats.wins,
          losses: acc.losses + periodStats.losses,
        };
      },
      { signals: 0, wins: 0, losses: 0 }
    );
    const winRate = totals.signals > 0 ? (totals.wins / totals.signals) * 100 : 0;
    const avgProfit = mockCoinStats.reduce((acc, stat) => acc + getStatsForPeriod(stat).avgProfit, 0) / mockCoinStats.length;
    return { ...totals, winRate, avgProfit };
  };

  const formatPrice = (price: number, coin: string) => {
    if (coin === 'KAS') return `$${price.toFixed(4)}`;
    return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatPercent = (value: number) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  };

  const getTPProgress = (signal: Signal) => {
    return (signal.tpHit / 5) * 100;
  };

  const getCurrentProfit = (signal: Signal) => {
    if (signal.type === 'BUY') {
      return ((signal.currentPrice - signal.entryPrice) / signal.entryPrice) * 100;
    } else {
      return ((signal.entryPrice - signal.currentPrice) / signal.entryPrice) * 100;
    }
  };

  return (
    <div className="py-4 md:py-6 lg:py-8">
      {/* Signals Network Banner */}
      <div className="mb-6 rounded-xl overflow-hidden shadow-2xl">
        <Image
          src="/images/banners/banner-singal.png"
          alt="Signals Network"
          width={1920}
          height={400}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* Signals Switchbar */}
      <SignalsSwitchbar />

      {/* Page Header */}
      <GlassCard className="p-4 md:p-6 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-lg flex-shrink-0">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl md:text-4xl font-bold">{t('title')}</h1>
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white text-sm font-bold">
                  PRO
                </span>
              </div>
              <p className="text-[var(--color-text-muted)] text-sm md:text-base">{t('subtitle')}</p>
            </div>
          </div>
          {/* BTC Status Indicator */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-success)]/10 border border-[var(--color-success)]/30">
            <div className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse"></div>
            <span className="text-sm text-[var(--color-success)] font-medium">{t('btcStatus.normal')}</span>
          </div>
        </div>
      </GlassCard>

      {/* 3 Coin Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {mockCoinStats.map((coinStat) => {
          const periodStats = getStatsForPeriod(coinStat);
          const isSelected = selectedCoin === coinStat.coin;

          return (
            <GlassCard
              key={coinStat.coin}
              className={`p-6 cursor-pointer transition-all hover:scale-[1.02] ${
                isSelected
                  ? 'ring-2 ring-[var(--color-primary)] bg-[var(--color-primary)]/10'
                  : 'hover:bg-white/5'
              }`}
              onClick={() => setSelectedCoin(isSelected ? null : coinStat.coin)}
            >
              {/* Coin Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${coinStat.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                    {coinStat.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{coinStat.coin}</h3>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {periodStats.signals} {t('coinBox.signals')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${periodStats.winRate >= 80 ? 'text-[var(--color-success)]' : 'text-[var(--color-warning)]'}`}>
                    {periodStats.winRate.toFixed(1)}%
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">{t('coinBox.winRate')}</p>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-2 rounded-lg bg-white/5">
                  <p className="text-lg font-bold text-[var(--color-success)]">{periodStats.wins}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{t('coinBox.wins')}</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-white/5">
                  <p className="text-lg font-bold text-[var(--color-error)]">{periodStats.losses}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{t('coinBox.losses')}</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-white/5">
                  <p className="text-lg font-bold text-[var(--color-success)]">+{periodStats.avgProfit.toFixed(1)}%</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{t('coinBox.avgProfit')}</p>
                </div>
              </div>

              {/* Click hint */}
              <div className="flex items-center justify-center gap-2 text-xs text-[var(--color-text-muted)]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                <span>{t('coinBox.clickToView')}</span>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Time Filter */}
      <GlassCard className="p-4 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-[var(--color-text-muted)]">{t('timeFilter.label')}:</span>
            <div className="flex gap-2">
              {(['week', 'month', 'total'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setTimeFilter(period)}
                  className={`px-4 py-2 text-sm rounded-lg transition-all ${
                    timeFilter === period
                      ? 'bg-[var(--color-primary)] text-white shadow-lg'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  {t(`timeFilter.${period}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Total Stats for Period */}
          <div className="flex items-center gap-6">
            {(() => {
              const totals = getTotalStats();
              return (
                <>
                  <div className="text-center">
                    <p className="text-lg font-bold">{totals.signals}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{t('totalStats.signals')}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-[var(--color-success)]">{totals.winRate.toFixed(1)}%</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{t('totalStats.winRate')}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-[var(--color-success)]">+{totals.avgProfit.toFixed(1)}%</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{t('totalStats.avgProfit')}</p>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </GlassCard>

      {/* Selected Coin Signals */}
      {selectedCoin && (
        <GlassCard className="p-4 md:p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${mockCoinStats.find(c => c.coin === selectedCoin)?.color} flex items-center justify-center text-white font-bold`}>
                {mockCoinStats.find(c => c.coin === selectedCoin)?.icon}
              </div>
              <div>
                <h2 className="text-lg font-bold">{selectedCoin} {t('coinSignals.title')}</h2>
                <p className="text-xs text-[var(--color-text-muted)]">
                  {coinSignals.length} {t('coinSignals.total')}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedCoin(null)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            {coinSignals.map((signal) => (
              <div
                key={signal.id}
                className={`p-4 rounded-xl border transition-all cursor-pointer hover:bg-white/5 ${
                  signal.status === 'active'
                    ? 'border-[var(--color-success)]/30 bg-[var(--color-success)]/5'
                    : signal.result === 'win'
                    ? 'border-[var(--color-success)]/20'
                    : 'border-[var(--color-error)]/20'
                }`}
                onClick={() => setSelectedSignal(selectedSignal?.id === signal.id ? null : signal)}
              >
                {/* Signal Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      signal.type === 'BUY' ? 'bg-[var(--color-success)]/20 text-[var(--color-success)]' : 'bg-[var(--color-error)]/20 text-[var(--color-error)]'
                    }`}>
                      {signal.type}
                    </span>
                    <span className="text-sm text-[var(--color-text-muted)]">#{signal.id}</span>
                    {signal.status === 'active' && (
                      <span className="px-2 py-0.5 rounded-full bg-[var(--color-success)]/20 text-[var(--color-success)] text-xs flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse"></span>
                        {t('signals.live')}
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    {signal.status === 'active' ? (
                      <p className={`font-bold ${getCurrentProfit(signal) >= 0 ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>
                        {formatPercent(getCurrentProfit(signal))}
                      </p>
                    ) : (
                      <p className={`font-bold ${signal.result === 'win' ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>
                        {formatPercent(signal.finalProfit || 0)}
                        <span className="ml-2 text-xs">{signal.result === 'win' ? '✓' : '✗'}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Price Info */}
                <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                  <div>
                    <p className="text-[var(--color-text-muted)] text-xs">{t('signals.entry')}</p>
                    <p className="font-mono font-semibold">{formatPrice(signal.entryPrice, signal.coin)}</p>
                  </div>
                  <div>
                    <p className="text-[var(--color-text-muted)] text-xs">{t('signals.current')}</p>
                    <p className="font-mono font-semibold">{formatPrice(signal.currentPrice, signal.coin)}</p>
                  </div>
                  <div>
                    <p className="text-[var(--color-text-muted)] text-xs">{t('signals.stopLoss')}</p>
                    <p className="font-mono font-semibold text-[var(--color-error)]">{formatPrice(signal.currentSL, signal.coin)}</p>
                  </div>
                </div>

                {/* TP Progress */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[var(--color-text-muted)]">{t('signals.tpProgress')}</span>
                    <span className="text-[var(--color-success)]">{signal.tpHit}/5 TPs</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[var(--color-success)] to-emerald-400 rounded-full transition-all"
                      style={{ width: `${getTPProgress(signal)}%` }}
                    />
                  </div>
                </div>

                {/* Timestamp */}
                <p className="text-xs text-[var(--color-text-muted)]">{signal.createdAt}</p>

                {/* Expanded: Trailing History */}
                {selectedSignal?.id === signal.id && signal.trailingHistory.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <h4 className="text-sm font-semibold mb-3">{t('signals.trailingHistory')}</h4>
                    <div className="space-y-2">
                      {signal.trailingHistory.map((event, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-xs">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            event.type === 'tp_hit' ? 'bg-[var(--color-success)]/20' :
                            event.type === 'sl_moved' ? 'bg-[var(--color-warning)]/20' :
                            'bg-[var(--color-primary)]/20'
                          }`}>
                            {event.type === 'tp_hit' && (
                              <svg className="w-3 h-3 text-[var(--color-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                            {event.type === 'sl_moved' && (
                              <svg className="w-3 h-3 text-[var(--color-warning)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                              </svg>
                            )}
                            {event.type === 'closed' && (
                              <svg className="w-3 h-3 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1">
                            {event.type === 'tp_hit' && (
                              <span className="text-[var(--color-success)]">
                                TP{event.tpLevel} {t('signals.hitAt')} {formatPrice(event.price, signal.coin)} (+{event.profit}%)
                              </span>
                            )}
                            {event.type === 'sl_moved' && (
                              <span className="text-[var(--color-warning)]">
                                SL {t('signals.movedFrom')} {formatPrice(event.oldSL!, signal.coin)} → {formatPrice(event.newSL!, signal.coin)}
                              </span>
                            )}
                            {event.type === 'closed' && (
                              <span className={event.profit! >= 0 ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}>
                                {t('signals.closedAt')} {formatPrice(event.price, signal.coin)} ({formatPercent(event.profit!)})
                              </span>
                            )}
                          </div>
                          <span className="text-[var(--color-text-muted)]">{event.timestamp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Active Signals Section */}
      <GlassCard className="p-4 md:p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 rounded-full bg-[var(--color-success)] animate-pulse"></div>
          <h2 className="text-lg font-bold">{t('activeSignals.title')}</h2>
          <span className="px-2 py-0.5 rounded-full bg-[var(--color-success)]/20 text-[var(--color-success)] text-xs font-bold">
            {activeSignals.length} {t('activeSignals.active')}
          </span>
        </div>

        {activeSignals.length === 0 ? (
          <div className="text-center py-8 text-[var(--color-text-muted)]">
            <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>{t('activeSignals.noActive')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeSignals.map((signal) => (
              <div
                key={signal.id}
                className="p-4 rounded-xl border border-[var(--color-success)]/30 bg-[var(--color-success)]/5 hover:bg-[var(--color-success)]/10 transition-all cursor-pointer"
                onClick={() => {
                  setSelectedCoin(signal.coin);
                  setSelectedSignal(signal);
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${mockCoinStats.find(c => c.coin === signal.coin)?.color} flex items-center justify-center text-white font-bold text-sm`}>
                      {mockCoinStats.find(c => c.coin === signal.coin)?.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{signal.coin}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          signal.type === 'BUY' ? 'bg-[var(--color-success)]/20 text-[var(--color-success)]' : 'bg-[var(--color-error)]/20 text-[var(--color-error)]'
                        }`}>
                          {signal.type}
                        </span>
                      </div>
                      <p className="text-[10px] text-[var(--color-text-muted)]">#{signal.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse"></span>
                    <span className="text-xs text-[var(--color-success)]">{t('signals.live')}</span>
                  </div>
                </div>

                {/* Profit */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)]">{t('signals.current')}</p>
                    <p className="font-mono font-semibold">{formatPrice(signal.currentPrice, signal.coin)}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xl font-bold ${getCurrentProfit(signal) >= 0 ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>
                      {formatPercent(getCurrentProfit(signal))}
                    </p>
                  </div>
                </div>

                {/* TP Progress Mini */}
                <div>
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className="text-[var(--color-text-muted)]">TP {t('signals.tpProgress')}</span>
                    <span className="text-[var(--color-success)]">{signal.tpHit}/5</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[var(--color-success)] to-emerald-400 rounded-full"
                      style={{ width: `${getTPProgress(signal)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </GlassCard>

      {/* Take Profit Levels Info */}
      <GlassCard className="p-4 md:p-6 mb-6">
        <h2 className="text-lg font-bold mb-4">{t('tpLevels.title')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { tp: 1, target: '+5-10%', action: t('tpLevels.action1') },
            { tp: 2, target: '+15-20%', action: t('tpLevels.action2') },
            { tp: 3, target: '+25-35%', action: t('tpLevels.action3') },
            { tp: 4, target: '+40-55%', action: t('tpLevels.action4') },
            { tp: 5, target: '+60-80%', action: t('tpLevels.action5') },
          ].map((level) => (
            <div key={level.tp} className="p-3 rounded-lg bg-white/5 text-center">
              <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-[var(--color-success)]/20 flex items-center justify-center">
                <span className="text-[var(--color-success)] font-bold text-sm">TP{level.tp}</span>
              </div>
              <p className="font-bold text-[var(--color-success)]">{level.target}</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">{level.action}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Info Box */}
      <GlassCard className="p-4 border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-[var(--color-primary)] mb-1">{t('info.title')}</p>
            <p className="text-xs text-[var(--color-text-secondary)]">{t('info.description')}</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
