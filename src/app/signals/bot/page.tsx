'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { GlassCard } from '@/components/ui/GlassCard';
import { SignalsSwitchbar } from '@/components/signals/SignalsSwitchbar';

// Types
interface TrailingEvent {
  type: 'entry' | 'tp_hit' | 'sl_moved' | 'closed';
  price: number;
  oldSL?: number;
  newSL?: number;
  tpLevel?: number;
  profit?: number;
  timestamp: string;
}

interface BotTrade {
  id: string;
  signalId: string;
  coin: 'BTC' | 'ETH' | 'KAS';
  type: 'BUY' | 'SELL';
  status: 'active' | 'closed';
  // Signal data
  signalEntry: number;
  signalSL: number;
  signalTP1: number;
  signalTP2: number;
  signalTP3: number;
  signalTP4: number;
  signalTP5: number;
  signalConfidence: number;
  // Bot execution
  botEntry: number;
  botAmount: number;
  botAmountUsd: number;
  currentPrice: number;
  currentSL: number;
  tpHit: number;
  // Trailing
  trailingHistory: TrailingEvent[];
  // Results
  unrealizedPnl: number;
  unrealizedPnlPercent: number;
  realizedPnl?: number;
  realizedPnlPercent?: number;
  // Timestamps
  createdAt: string;
  closedAt?: string;
}

interface BotUser {
  id: string;
  name: string;
  avatar?: string;
  tier: 'PRO+';
  activeTrades: number;
  totalTrades: number;
  totalProfit: number;
  winRate: number;
  isOnline: boolean;
  lastActive: string;
}

interface BotStats {
  totalUsers: number;
  activeUsers: number;
  totalActiveTrades: number;
  totalTradesExecuted: number;
  avgWinRate: number;
  totalVolume: number;
}

// Coin config
const coinConfig: Record<string, { color: string; gradient: string; icon: string; name: string }> = {
  BTC: { color: '#F7931A', gradient: 'from-orange-500 to-amber-500', icon: '₿', name: 'Bitcoin' },
  ETH: { color: '#627EEA', gradient: 'from-purple-500 to-indigo-500', icon: 'Ξ', name: 'Ethereum' },
  KAS: { color: '#49EACB', gradient: 'from-cyan-400 to-teal-500', icon: 'K', name: 'Kaspa' },
};

// Mock Bot Users
const mockBotUsers: BotUser[] = [
  { id: 'U1', name: 'CryptoKing', tier: 'PRO+', activeTrades: 2, totalTrades: 45, totalProfit: 2340.50, winRate: 84.4, isOnline: true, lastActive: 'Jetzt' },
  { id: 'U2', name: 'KaspaWhale', tier: 'PRO+', activeTrades: 3, totalTrades: 67, totalProfit: 4520.00, winRate: 88.1, isOnline: true, lastActive: 'Jetzt' },
  { id: 'U3', name: 'TraderMax', tier: 'PRO+', activeTrades: 1, totalTrades: 23, totalProfit: 890.25, winRate: 78.3, isOnline: true, lastActive: 'Jetzt' },
  { id: 'U4', name: 'BlockchainBob', tier: 'PRO+', activeTrades: 0, totalTrades: 34, totalProfit: 1567.80, winRate: 82.4, isOnline: false, lastActive: 'vor 2h' },
  { id: 'U5', name: 'SatoshiFan', tier: 'PRO+', activeTrades: 2, totalTrades: 56, totalProfit: 3210.00, winRate: 85.7, isOnline: true, lastActive: 'Jetzt' },
  { id: 'U6', name: 'MoonHunter', tier: 'PRO+', activeTrades: 1, totalTrades: 41, totalProfit: 1890.40, winRate: 80.5, isOnline: false, lastActive: 'vor 30min' },
];

// Mock Bot Stats
const mockBotStats: BotStats = {
  totalUsers: 127,
  activeUsers: 89,
  totalActiveTrades: 156,
  totalTradesExecuted: 3420,
  avgWinRate: 83.7,
  totalVolume: 2450000,
};

// Mock Active Bot Trades
const mockBotTrades: BotTrade[] = [
  {
    id: 'BOT-001',
    signalId: 'SIG-1248',
    coin: 'KAS',
    type: 'BUY',
    status: 'active',
    signalEntry: 0.1280,
    signalSL: 0.1180,
    signalTP1: 0.1380,
    signalTP2: 0.1480,
    signalTP3: 0.1580,
    signalTP4: 0.1720,
    signalTP5: 0.1900,
    signalConfidence: 91,
    botEntry: 0.1282,
    botAmount: 5000,
    botAmountUsd: 641.00,
    currentPrice: 0.1345,
    currentSL: 0.1282,
    tpHit: 1,
    trailingHistory: [
      { type: 'entry', price: 0.1282, timestamp: '2025-12-05 16:23:01' },
      { type: 'tp_hit', price: 0.1380, tpLevel: 1, profit: 7.6, timestamp: '2025-12-05 19:45:22' },
      { type: 'sl_moved', price: 0.1380, oldSL: 0.1180, newSL: 0.1282, timestamp: '2025-12-05 19:45:23' },
    ],
    unrealizedPnl: 31.50,
    unrealizedPnlPercent: 4.91,
    createdAt: '2025-12-05 16:23:01',
  },
  {
    id: 'BOT-002',
    signalId: 'SIG-1247',
    coin: 'BTC',
    type: 'BUY',
    status: 'active',
    signalEntry: 97450.00,
    signalSL: 94200.00,
    signalTP1: 99500.00,
    signalTP2: 101200.00,
    signalTP3: 103000.00,
    signalTP4: 105500.00,
    signalTP5: 108000.00,
    signalConfidence: 87,
    botEntry: 97480.00,
    botAmount: 0.0103,
    botAmountUsd: 1004.04,
    currentPrice: 99200.00,
    currentSL: 97480.00,
    tpHit: 1,
    trailingHistory: [
      { type: 'entry', price: 97480.00, timestamp: '2025-12-05 14:33:15' },
      { type: 'tp_hit', price: 99500.00, tpLevel: 1, profit: 2.1, timestamp: '2025-12-05 18:45:22' },
      { type: 'sl_moved', price: 99500.00, oldSL: 94200.00, newSL: 97480.00, timestamp: '2025-12-05 18:45:23' },
    ],
    unrealizedPnl: 17.72,
    unrealizedPnlPercent: 1.77,
    createdAt: '2025-12-05 14:33:15',
  },
  {
    id: 'BOT-003',
    signalId: 'SIG-1246',
    coin: 'ETH',
    type: 'BUY',
    status: 'active',
    signalEntry: 3850.00,
    signalSL: 3720.00,
    signalTP1: 3950.00,
    signalTP2: 4050.00,
    signalTP3: 4150.00,
    signalTP4: 4300.00,
    signalTP5: 4500.00,
    signalConfidence: 82,
    botEntry: 3855.00,
    botAmount: 0.26,
    botAmountUsd: 1002.30,
    currentPrice: 3920.00,
    currentSL: 3720.00,
    tpHit: 0,
    trailingHistory: [
      { type: 'entry', price: 3855.00, timestamp: '2025-12-05 12:16:08' },
    ],
    unrealizedPnl: 16.90,
    unrealizedPnlPercent: 1.69,
    createdAt: '2025-12-05 12:16:08',
  },
];

// Mock Closed Trades
const mockClosedTrades: BotTrade[] = [
  {
    id: 'BOT-004',
    signalId: 'SIG-1245',
    coin: 'KAS',
    type: 'BUY',
    status: 'closed',
    signalEntry: 0.1234,
    signalSL: 0.1100,
    signalTP1: 0.1350,
    signalTP2: 0.1450,
    signalTP3: 0.1550,
    signalTP4: 0.1700,
    signalTP5: 0.1900,
    signalConfidence: 91,
    botEntry: 0.1236,
    botAmount: 4850,
    botAmountUsd: 599.46,
    currentPrice: 0.1456,
    currentSL: 0.1450,
    tpHit: 3,
    trailingHistory: [
      { type: 'entry', price: 0.1236, timestamp: '2025-12-04 10:09:00' },
      { type: 'tp_hit', price: 0.1350, tpLevel: 1, profit: 9.2, timestamp: '2025-12-04 16:22:11' },
      { type: 'sl_moved', price: 0.1350, oldSL: 0.1100, newSL: 0.1236, timestamp: '2025-12-04 16:22:12' },
      { type: 'tp_hit', price: 0.1450, tpLevel: 2, profit: 17.3, timestamp: '2025-12-04 22:45:33' },
      { type: 'sl_moved', price: 0.1450, oldSL: 0.1236, newSL: 0.1350, timestamp: '2025-12-04 22:45:34' },
      { type: 'tp_hit', price: 0.1550, tpLevel: 3, profit: 25.4, timestamp: '2025-12-05 08:12:45' },
      { type: 'sl_moved', price: 0.1550, oldSL: 0.1350, newSL: 0.1450, timestamp: '2025-12-05 08:12:46' },
      { type: 'closed', price: 0.1456, profit: 17.8, timestamp: '2025-12-05 10:33:18' },
    ],
    unrealizedPnl: 0,
    unrealizedPnlPercent: 0,
    realizedPnl: 106.70,
    realizedPnlPercent: 17.8,
    createdAt: '2025-12-04 10:09:00',
    closedAt: '2025-12-05 10:33:18',
  },
  {
    id: 'BOT-005',
    signalId: 'SIG-1244',
    coin: 'BTC',
    type: 'SELL',
    status: 'closed',
    signalEntry: 95800.00,
    signalSL: 97500.00,
    signalTP1: 94500.00,
    signalTP2: 93200.00,
    signalTP3: 91800.00,
    signalTP4: 90000.00,
    signalTP5: 88000.00,
    signalConfidence: 79,
    botEntry: 95750.00,
    botAmount: 0.0105,
    botAmountUsd: 1005.38,
    currentPrice: 94200.00,
    currentSL: 94500.00,
    tpHit: 2,
    trailingHistory: [
      { type: 'entry', price: 95750.00, timestamp: '2025-12-03 14:31:00' },
      { type: 'tp_hit', price: 94500.00, tpLevel: 1, profit: 1.3, timestamp: '2025-12-03 20:15:44' },
      { type: 'sl_moved', price: 94500.00, oldSL: 97500.00, newSL: 95750.00, timestamp: '2025-12-03 20:15:45' },
      { type: 'tp_hit', price: 93200.00, tpLevel: 2, profit: 2.7, timestamp: '2025-12-04 04:22:11' },
      { type: 'sl_moved', price: 93200.00, oldSL: 95750.00, newSL: 94500.00, timestamp: '2025-12-04 04:22:12' },
      { type: 'closed', price: 94200.00, profit: 1.6, timestamp: '2025-12-04 08:45:33' },
    ],
    unrealizedPnl: 0,
    unrealizedPnlPercent: 0,
    realizedPnl: 16.28,
    realizedPnlPercent: 1.6,
    createdAt: '2025-12-03 14:31:00',
    closedAt: '2025-12-04 08:45:33',
  },
  {
    id: 'BOT-006',
    signalId: 'SIG-1243',
    coin: 'ETH',
    type: 'BUY',
    status: 'closed',
    signalEntry: 3720.00,
    signalSL: 3600.00,
    signalTP1: 3820.00,
    signalTP2: 3920.00,
    signalTP3: 4020.00,
    signalTP4: 4150.00,
    signalTP5: 4300.00,
    signalConfidence: 74,
    botEntry: 3725.00,
    botAmount: 0.27,
    botAmountUsd: 1005.75,
    currentPrice: 3600.00,
    currentSL: 3600.00,
    tpHit: 0,
    trailingHistory: [
      { type: 'entry', price: 3725.00, timestamp: '2025-12-02 22:46:00' },
      { type: 'closed', price: 3600.00, profit: -3.4, timestamp: '2025-12-03 06:12:55' },
    ],
    unrealizedPnl: 0,
    unrealizedPnlPercent: 0,
    realizedPnl: -33.75,
    realizedPnlPercent: -3.4,
    createdAt: '2025-12-02 22:46:00',
    closedAt: '2025-12-03 06:12:55',
  },
];

export default function TradingBotPage() {
  const t = useTranslations('tradingBot');
  const [selectedTrade, setSelectedTrade] = useState<BotTrade | null>(null);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [historyFilter, setHistoryFilter] = useState<'all' | 'wins' | 'losses'>('all');

  const formatPrice = (price: number, coin: string) => {
    if (coin === 'KAS') return `$${price.toFixed(4)}`;
    return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatPnl = (value: number) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}$${Math.abs(value).toFixed(2)}`;
  };

  const formatPercent = (value: number) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
  };

  const filteredClosedTrades = mockClosedTrades.filter(trade => {
    if (historyFilter === 'wins') return (trade.realizedPnlPercent || 0) > 0;
    if (historyFilter === 'losses') return (trade.realizedPnlPercent || 0) < 0;
    return true;
  });

  const displayedUsers = showAllUsers ? mockBotUsers : mockBotUsers.slice(0, 4);

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
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg flex-shrink-0">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl md:text-4xl font-bold">{t('title')}</h1>
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold">
                PRO+
              </span>
            </div>
            <p className="text-[var(--color-text-muted)] text-sm md:text-base">{t('subtitle')}</p>
          </div>
        </div>
      </GlassCard>

      {/* Global Bot Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <GlassCard className="p-4 text-center">
          <div className="text-2xl font-bold text-[var(--color-primary)]">{mockBotStats.totalUsers}</div>
          <div className="text-xs text-[var(--color-text-muted)]">Bot Nutzer</div>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-2xl font-bold text-green-400">{mockBotStats.activeUsers}</span>
          </div>
          <div className="text-xs text-[var(--color-text-muted)]">Gerade Online</div>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <div className="text-2xl font-bold text-cyan-400">{mockBotStats.totalActiveTrades}</div>
          <div className="text-xs text-[var(--color-text-muted)]">Aktive Trades</div>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <div className="text-2xl font-bold">{mockBotStats.totalTradesExecuted.toLocaleString()}</div>
          <div className="text-xs text-[var(--color-text-muted)]">Trades Gesamt</div>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{mockBotStats.avgWinRate}%</div>
          <div className="text-xs text-[var(--color-text-muted)]">Ø Win Rate</div>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <div className="text-2xl font-bold">${(mockBotStats.totalVolume / 1000000).toFixed(2)}M</div>
          <div className="text-xs text-[var(--color-text-muted)]">Volumen</div>
        </GlassCard>
      </div>

      {/* How Signal → Bot Works */}
      <GlassCard className="p-6 mb-6 border-cyan-500/30 bg-cyan-500/5">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Signal → Bot Automatik
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="flex flex-col items-center text-center p-3 rounded-lg bg-[var(--color-bg-tertiary)]">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-2">
              <span className="text-white text-lg">📊</span>
            </div>
            <h4 className="font-semibold text-sm mb-1">Signal BUY</h4>
            <p className="text-xs text-[var(--color-text-muted)]">Bot kauft sofort</p>
          </div>
          <div className="flex flex-col items-center text-center p-3 rounded-lg bg-[var(--color-bg-tertiary)]">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center mb-2">
              <span className="text-white text-lg">🎯</span>
            </div>
            <h4 className="font-semibold text-sm mb-1">TP1 erreicht</h4>
            <p className="text-xs text-[var(--color-text-muted)]">SL → Breakeven</p>
          </div>
          <div className="flex flex-col items-center text-center p-3 rounded-lg bg-[var(--color-bg-tertiary)]">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mb-2">
              <span className="text-white text-lg">📈</span>
            </div>
            <h4 className="font-semibold text-sm mb-1">TP2+ erreicht</h4>
            <p className="text-xs text-[var(--color-text-muted)]">SL nachziehen</p>
          </div>
          <div className="flex flex-col items-center text-center p-3 rounded-lg bg-[var(--color-bg-tertiary)]">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-2">
              <span className="text-white text-lg">🛡️</span>
            </div>
            <h4 className="font-semibold text-sm mb-1">Trailing SL</h4>
            <p className="text-xs text-[var(--color-text-muted)]">Gewinne sichern</p>
          </div>
          <div className="flex flex-col items-center text-center p-3 rounded-lg bg-[var(--color-bg-tertiary)]">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center mb-2">
              <span className="text-white text-lg">✅</span>
            </div>
            <h4 className="font-semibold text-sm mb-1">Signal Close</h4>
            <p className="text-xs text-[var(--color-text-muted)]">Bot schließt</p>
          </div>
        </div>
      </GlassCard>

      {/* Active Bot Trades */}
      <GlassCard className="p-4 md:p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <h2 className="text-lg font-bold">Aktive Bot-Trades</h2>
            <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-bold">
              {mockBotTrades.length} Live
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {mockBotTrades.map((trade) => {
            const config = coinConfig[trade.coin];
            const isExpanded = selectedTrade?.id === trade.id;

            return (
              <div
                key={trade.id}
                className={`rounded-xl border transition-all ${
                  isExpanded
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                    : 'border-green-500/30 bg-green-500/5 hover:bg-green-500/10'
                }`}
              >
                {/* Trade Header */}
                <div
                  className="p-4 cursor-pointer"
                  onClick={() => setSelectedTrade(isExpanded ? null : trade)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                        {config.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg">{trade.coin}</span>
                          <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                            trade.type === 'BUY' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {trade.type}
                          </span>
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                            LIVE
                          </span>
                        </div>
                        <p className="text-xs text-[var(--color-text-muted)]">
                          Signal #{trade.signalId} • {trade.createdAt}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${trade.unrealizedPnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {formatPnl(trade.unrealizedPnl)}
                      </p>
                      <p className={`text-sm ${trade.unrealizedPnlPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {formatPercent(trade.unrealizedPnlPercent)}
                      </p>
                    </div>
                  </div>

                  {/* Quick Stats Row */}
                  <div className="grid grid-cols-4 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-[var(--color-text-muted)]">Bot Entry</p>
                      <p className="font-mono font-semibold text-sm">{formatPrice(trade.botEntry, trade.coin)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--color-text-muted)]">Aktuell</p>
                      <p className="font-mono font-semibold text-sm">{formatPrice(trade.currentPrice, trade.coin)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--color-text-muted)]">Stop-Loss</p>
                      <p className="font-mono font-semibold text-sm text-red-400">{formatPrice(trade.currentSL, trade.coin)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--color-text-muted)]">Position</p>
                      <p className="font-semibold text-sm">${trade.botAmountUsd.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* TP Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-[var(--color-text-muted)]">Take-Profit Fortschritt</span>
                      <span className="text-green-400 font-semibold">{trade.tpHit}/5 TPs erreicht</span>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((tp) => (
                        <div
                          key={tp}
                          className={`flex-1 h-2 rounded-full transition-all ${
                            tp <= trade.tpHit
                              ? 'bg-gradient-to-r from-green-500 to-emerald-400'
                              : 'bg-white/10'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-white/10">
                    {/* TP Levels */}
                    <div className="py-4 grid grid-cols-5 gap-2">
                      {[
                        { level: 1, price: trade.signalTP1 },
                        { level: 2, price: trade.signalTP2 },
                        { level: 3, price: trade.signalTP3 },
                        { level: 4, price: trade.signalTP4 },
                        { level: 5, price: trade.signalTP5 },
                      ].map((tp) => {
                        const hit = tp.level <= trade.tpHit;
                        const pnl = ((tp.price - trade.botEntry) / trade.botEntry) * 100;
                        return (
                          <div
                            key={tp.level}
                            className={`p-2 rounded-lg text-center ${
                              hit ? 'bg-green-500/20 border border-green-500/50' : 'bg-white/5'
                            }`}
                          >
                            <div className={`text-xs font-bold ${hit ? 'text-green-400' : 'text-[var(--color-text-muted)]'}`}>
                              TP{tp.level} {hit && '✓'}
                            </div>
                            <div className="font-mono text-sm">{formatPrice(tp.price, trade.coin)}</div>
                            <div className={`text-xs ${hit ? 'text-green-400' : 'text-[var(--color-text-muted)]'}`}>
                              +{pnl.toFixed(1)}%
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Trailing History */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Trailing-Verlauf
                      </h4>
                      <div className="space-y-2">
                        {trade.trailingHistory.map((event, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-sm">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              event.type === 'entry' ? 'bg-cyan-500/20' :
                              event.type === 'tp_hit' ? 'bg-green-500/20' :
                              event.type === 'sl_moved' ? 'bg-yellow-500/20' :
                              'bg-purple-500/20'
                            }`}>
                              {event.type === 'entry' && '🚀'}
                              {event.type === 'tp_hit' && '🎯'}
                              {event.type === 'sl_moved' && '🛡️'}
                              {event.type === 'closed' && '✅'}
                            </div>
                            <div className="flex-1">
                              {event.type === 'entry' && (
                                <span className="text-cyan-400">Bot Entry @ {formatPrice(event.price, trade.coin)}</span>
                              )}
                              {event.type === 'tp_hit' && (
                                <span className="text-green-400">
                                  TP{event.tpLevel} erreicht @ {formatPrice(event.price, trade.coin)} (+{event.profit}%)
                                </span>
                              )}
                              {event.type === 'sl_moved' && (
                                <span className="text-yellow-400">
                                  SL nachgezogen: {formatPrice(event.oldSL!, trade.coin)} → {formatPrice(event.newSL!, trade.coin)}
                                </span>
                              )}
                              {event.type === 'closed' && (
                                <span className={event.profit! >= 0 ? 'text-green-400' : 'text-red-400'}>
                                  Geschlossen @ {formatPrice(event.price, trade.coin)} ({formatPercent(event.profit!)})
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-[var(--color-text-muted)]">{event.timestamp}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Manual Close Button */}
                    <button className="w-full py-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 font-semibold hover:bg-red-500/30 transition-all flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Trade manuell schließen
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Bot Users Overview */}
      <GlassCard className="p-4 md:p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Bot-Nutzer Community
          </h2>
          <button
            onClick={() => setShowAllUsers(!showAllUsers)}
            className="text-sm text-[var(--color-primary)] hover:underline"
          >
            {showAllUsers ? 'Weniger anzeigen' : 'Alle anzeigen'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayedUsers.map((user) => (
            <div
              key={user.id}
              className="p-4 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] hover:border-purple-500/50 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0)}
                  </div>
                  {user.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[var(--color-bg-tertiary)]"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{user.name}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold">
                      {user.tier}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--color-text-muted)]">{user.lastActive}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2 rounded-lg bg-white/5">
                  <p className="text-lg font-bold text-green-400">{user.winRate}%</p>
                  <p className="text-[10px] text-[var(--color-text-muted)]">Win Rate</p>
                </div>
                <div className="p-2 rounded-lg bg-white/5">
                  <p className="text-lg font-bold text-green-400">+${user.totalProfit.toFixed(0)}</p>
                  <p className="text-[10px] text-[var(--color-text-muted)]">Profit</p>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                <span>{user.activeTrades} aktive Trades</span>
                <span>{user.totalTrades} gesamt</span>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Trade History */}
      <GlassCard className="p-4 md:p-6 mb-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Trade-Historie
          </h2>
          <div className="flex gap-2">
            {(['all', 'wins', 'losses'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setHistoryFilter(filter)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-all ${
                  historyFilter === filter
                    ? filter === 'wins' ? 'bg-green-500 text-white' :
                      filter === 'losses' ? 'bg-red-500 text-white' :
                      'bg-[var(--color-primary)] text-white'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                {filter === 'all' ? 'Alle' : filter === 'wins' ? 'Gewinne' : 'Verluste'}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-[var(--color-text-muted)] border-b border-[var(--color-border)]">
                <th className="pb-3 font-medium">Signal</th>
                <th className="pb-3 font-medium">Coin</th>
                <th className="pb-3 font-medium">Typ</th>
                <th className="pb-3 font-medium">Entry</th>
                <th className="pb-3 font-medium">Exit</th>
                <th className="pb-3 font-medium">TPs</th>
                <th className="pb-3 font-medium text-right">P/L</th>
                <th className="pb-3 font-medium">Zeit</th>
              </tr>
            </thead>
            <tbody>
              {filteredClosedTrades.map((trade) => {
                const config = coinConfig[trade.coin];
                const isWin = (trade.realizedPnlPercent || 0) > 0;
                return (
                  <tr key={trade.id} className="border-b border-[var(--color-border)]/50 hover:bg-white/5">
                    <td className="py-3 text-sm">
                      <span className="text-[var(--color-text-muted)]">#{trade.signalId}</span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center`}>
                          <span className="text-white text-xs font-bold">{config.icon}</span>
                        </div>
                        <span className="font-medium">{trade.coin}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        trade.type === 'BUY' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {trade.type}
                      </span>
                    </td>
                    <td className="py-3 font-mono text-sm">{formatPrice(trade.botEntry, trade.coin)}</td>
                    <td className="py-3 font-mono text-sm">
                      {trade.trailingHistory.find(e => e.type === 'closed')
                        ? formatPrice(trade.trailingHistory.find(e => e.type === 'closed')!.price, trade.coin)
                        : '-'
                      }
                    </td>
                    <td className="py-3">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((tp) => (
                          <div
                            key={tp}
                            className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold ${
                              tp <= trade.tpHit
                                ? 'bg-green-500 text-white'
                                : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]'
                            }`}
                          >
                            {tp}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className={`py-3 text-right font-bold ${isWin ? 'text-green-400' : 'text-red-400'}`}>
                      <div>{formatPercent(trade.realizedPnlPercent || 0)}</div>
                      <div className="text-xs">{formatPnl(trade.realizedPnl || 0)}</div>
                    </td>
                    <td className="py-3 text-sm text-[var(--color-text-muted)]">
                      {trade.closedAt?.split(' ')[0]}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Supported Coins */}
      <GlassCard className="p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Unterstützte Coins</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(coinConfig).map(([coin, config]) => (
            <div
              key={coin}
              className="flex items-center gap-4 p-4 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)]"
            >
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-lg`}>
                <span className="text-white font-bold text-xl">{config.icon}</span>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-lg">{coin}</div>
                <div className="text-sm text-[var(--color-text-muted)]">{config.name}</div>
              </div>
              <div className="text-right">
                <div className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400">
                  {coin === 'KAS' ? 'Spot + Futures' : 'Spot'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Info Box */}
      <GlassCard className="p-4 border-purple-500/30 bg-purple-500/5">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-purple-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-purple-400 mb-1">Sicherheit geht vor</p>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Deine Funds bleiben auf CoinEx. Der Bot nutzt nur Trade-Permissions ohne Auszahlungsrechte.
              API-Keys werden mit AES-256 verschlüsselt. Kill-Switch für sofortiges Stoppen verfügbar.
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
