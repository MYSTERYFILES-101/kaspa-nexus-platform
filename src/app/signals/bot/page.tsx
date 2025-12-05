'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { GlassCard } from '@/components/ui/GlassCard';
import { SignalsSwitchbar } from '@/components/signals/SignalsSwitchbar';

// Mock Bot Status
const mockBotStatus = {
  isRunning: false,
  connectedExchange: null as string | null,
  activeSignals: 0,
  executedTrades: 0,
  totalProfit: 0,
  todayProfit: 0,
  todayTrades: 0,
};

// Mock executed trades history
const mockTradeHistory = [
  {
    id: 'TRADE-001',
    signalId: 'SIG-1245',
    coin: 'KAS',
    type: 'BUY',
    entryPrice: 0.142,
    exitPrice: 0.167,
    amount: 5000,
    profit: 17.6,
    profitUsd: 125.00,
    status: 'closed',
    tpHit: 3,
    executedAt: '2025-12-04 14:32',
    closedAt: '2025-12-05 09:15',
  },
  {
    id: 'TRADE-002',
    signalId: 'SIG-1247',
    coin: 'BTC',
    type: 'BUY',
    entryPrice: 97450,
    exitPrice: null,
    amount: 0.01,
    profit: 1.8,
    profitUsd: 17.55,
    status: 'active',
    tpHit: 1,
    executedAt: '2025-12-05 08:15',
    closedAt: null,
  },
  {
    id: 'TRADE-003',
    signalId: 'SIG-1244',
    coin: 'ETH',
    type: 'BUY',
    entryPrice: 3580,
    exitPrice: 3465,
    amount: 0.5,
    profit: -3.2,
    profitUsd: -57.50,
    status: 'closed',
    tpHit: 0,
    executedAt: '2025-12-03 16:45',
    closedAt: '2025-12-04 02:30',
  },
];

// Coin colors and icons
const coinConfig: Record<string, { color: string; gradient: string; icon: string }> = {
  BTC: { color: '#F7931A', gradient: 'from-orange-500 to-amber-500', icon: '₿' },
  ETH: { color: '#627EEA', gradient: 'from-purple-500 to-indigo-500', icon: 'Ξ' },
  KAS: { color: '#49EACB', gradient: 'from-cyan-400 to-teal-500', icon: 'K' },
};

export default function TradingBotPage() {
  const t = useTranslations('tradingBot');
  const tSignals = useTranslations('signals');

  const [botConfig, setBotConfig] = useState({
    tradeAmount: 100,
    leverage: 1,
    maxOpenTrades: 3,
    autoTakeProfit: true,
    trailingSL: true,
    dailyLossLimit: 20,
  });

  const [showApiModal, setShowApiModal] = useState(false);

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

      {/* How it works - Bot follows Signals */}
      <GlassCard className="p-6 mb-6 border-cyan-500/30 bg-cyan-500/5">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          {t('howItWorks.title')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Step 1: Signal */}
          <div className="flex flex-col items-center text-center p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center mb-3">
              <span className="text-white font-bold">1</span>
            </div>
            <h4 className="font-semibold mb-1">{t('howItWorks.step1.title')}</h4>
            <p className="text-sm text-[var(--color-text-muted)]">{t('howItWorks.step1.desc')}</p>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex items-center justify-center">
            <svg className="w-8 h-8 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>

          {/* Step 2: Entry */}
          <div className="flex flex-col items-center text-center p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-3">
              <span className="text-white font-bold">2</span>
            </div>
            <h4 className="font-semibold mb-1">{t('howItWorks.step2.title')}</h4>
            <p className="text-sm text-[var(--color-text-muted)]">{t('howItWorks.step2.desc')}</p>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex items-center justify-center">
            <svg className="w-8 h-8 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>

          {/* Step 3: Manage */}
          <div className="flex flex-col items-center text-center p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mb-3">
              <span className="text-white font-bold">3</span>
            </div>
            <h4 className="font-semibold mb-1">{t('howItWorks.step3.title')}</h4>
            <p className="text-sm text-[var(--color-text-muted)]">{t('howItWorks.step3.desc')}</p>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex items-center justify-center">
            <svg className="w-8 h-8 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>

          {/* Step 4: Exit */}
          <div className="flex flex-col items-center text-center p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-3">
              <span className="text-white font-bold">4</span>
            </div>
            <h4 className="font-semibold mb-1">{t('howItWorks.step4.title')}</h4>
            <p className="text-sm text-[var(--color-text-muted)]">{t('howItWorks.step4.desc')}</p>
          </div>
        </div>
      </GlassCard>

      {/* Requires Pro+ Banner */}
      <GlassCard className="p-6 mb-6 border-purple-500/30 bg-purple-500/5">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">{tSignals('requiresProPlus')}</h3>
              <p className="text-sm text-[var(--color-text-muted)]">{t('unlockBot')}</p>
            </div>
          </div>
          <button disabled className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold opacity-50 cursor-not-allowed">
            {tSignals('upgradeToProPlus')}
          </button>
        </div>
      </GlassCard>

      {/* Supported Coins */}
      <GlassCard className="p-6 mb-6 opacity-60">
        <h3 className="text-lg font-semibold mb-4">{t('supportedCoins')}</h3>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(coinConfig).map(([coin, config]) => (
            <div
              key={coin}
              className="flex items-center gap-3 p-4 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)]"
            >
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center`}>
                <span className="text-white font-bold text-lg">{config.icon}</span>
              </div>
              <div>
                <div className="font-semibold">{coin}</div>
                <div className="text-xs text-[var(--color-text-muted)]">
                  {coin === 'KAS' ? 'Spot + Futures' : 'Spot'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Bot Configuration & Status Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* API Connection */}
        <GlassCard className="p-6 opacity-60">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            {t('apiConnection.title')}
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <span className="font-bold text-blue-400">CX</span>
                </div>
                <div>
                  <div className="font-medium">CoinEx</div>
                  <div className="text-xs text-[var(--color-text-muted)]">{t('apiConnection.recommended')}</div>
                </div>
              </div>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--color-text-muted)]"></span>
                <span className="text-sm text-[var(--color-text-muted)]">{t('apiConnection.notConnected')}</span>
              </span>
            </div>

            <button
              disabled
              className="w-full py-3 px-4 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-[var(--color-text-secondary)] cursor-not-allowed"
            >
              {t('apiConnection.connectApi')}
            </button>

            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div className="text-sm text-green-400">
                  <strong>{t('apiConnection.security.title')}:</strong> {t('apiConnection.security.desc')}
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Bot Settings */}
        <GlassCard className="p-6 opacity-60">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {t('settings.title')}
          </h3>

          <div className="space-y-4">
            {/* Trade Amount */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--color-text-secondary)]">
                {t('settings.tradeAmount')} ($50 - $1,000)
              </label>
              <input
                type="number"
                disabled
                value={botConfig.tradeAmount}
                className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] cursor-not-allowed"
              />
            </div>

            {/* Leverage (only KAS) */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--color-text-secondary)]">
                {t('settings.leverage')} ({t('settings.onlyKas')})
              </label>
              <div className="flex gap-2">
                {['x1', 'x3', 'x4', 'x5'].map((lev) => (
                  <button
                    key={lev}
                    disabled
                    className={`flex-1 py-2 px-4 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-sm cursor-not-allowed ${lev === 'x1' ? 'border-cyan-500/50' : ''}`}
                  >
                    {lev}
                  </button>
                ))}
              </div>
            </div>

            {/* Max Open Trades */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--color-text-secondary)]">
                {t('settings.maxTrades')} (1-5)
              </label>
              <input
                type="number"
                disabled
                value={botConfig.maxOpenTrades}
                min={1}
                max={5}
                className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] cursor-not-allowed"
              />
            </div>

            {/* Toggles */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-bg-tertiary)]">
                <span className="text-sm">{t('settings.autoTp')}</span>
                <div className="w-10 h-6 rounded-full bg-cyan-500/50 flex items-center justify-end px-1 cursor-not-allowed">
                  <div className="w-4 h-4 rounded-full bg-white"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-bg-tertiary)]">
                <span className="text-sm">{t('settings.trailingSl')}</span>
                <div className="w-10 h-6 rounded-full bg-cyan-500/50 flex items-center justify-end px-1 cursor-not-allowed">
                  <div className="w-4 h-4 rounded-full bg-white"></div>
                </div>
              </div>
            </div>

            {/* Daily Loss Limit */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--color-text-secondary)]">
                {t('settings.dailyLossLimit')}
              </label>
              <div className="flex gap-2">
                {['10%', '20%', '30%'].map((limit) => (
                  <button
                    key={limit}
                    disabled
                    className={`flex-1 py-2 px-4 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-sm cursor-not-allowed ${limit === '20%' ? 'border-cyan-500/50' : ''}`}
                  >
                    {limit}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Bot Status Dashboard */}
      <GlassCard className="p-6 mb-6 opacity-60">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            {t('status.title')}
          </h3>
          <button disabled className="px-6 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold cursor-not-allowed opacity-50">
            {t('status.startBot')}
          </button>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
            <div className="text-sm text-[var(--color-text-muted)] mb-1">{t('status.botStatus')}</div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-text-muted)]"></span>
              <span className="font-semibold">{t('status.offline')}</span>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
            <div className="text-sm text-[var(--color-text-muted)] mb-1">{t('status.activeTrades')}</div>
            <div className="font-semibold text-xl">0</div>
          </div>
          <div className="p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
            <div className="text-sm text-[var(--color-text-muted)] mb-1">{t('status.todayTrades')}</div>
            <div className="font-semibold text-xl">0</div>
          </div>
          <div className="p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
            <div className="text-sm text-[var(--color-text-muted)] mb-1">{t('status.todayProfit')}</div>
            <div className="font-semibold text-xl text-[var(--color-text-muted)]">$0.00</div>
          </div>
        </div>

        {/* Kill Switch */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-red-500/10 border border-red-500/30">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
            <div>
              <div className="font-semibold text-red-400">{t('status.killSwitch')}</div>
              <div className="text-sm text-[var(--color-text-muted)]">{t('status.killSwitchDesc')}</div>
            </div>
          </div>
          <button disabled className="px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 font-semibold cursor-not-allowed opacity-50">
            {t('status.stopAll')}
          </button>
        </div>
      </GlassCard>

      {/* Trade History (Example) */}
      <GlassCard className="p-6 mb-6 opacity-60">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          {t('history.title')}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-[var(--color-text-muted)] border-b border-[var(--color-border)]">
                <th className="pb-3 font-medium">{t('history.signal')}</th>
                <th className="pb-3 font-medium">{t('history.coin')}</th>
                <th className="pb-3 font-medium">{t('history.type')}</th>
                <th className="pb-3 font-medium">{t('history.entry')}</th>
                <th className="pb-3 font-medium">{t('history.exit')}</th>
                <th className="pb-3 font-medium">{t('history.tpHit')}</th>
                <th className="pb-3 font-medium text-right">{t('history.profit')}</th>
                <th className="pb-3 font-medium">{t('history.status')}</th>
              </tr>
            </thead>
            <tbody>
              {mockTradeHistory.map((trade) => {
                const config = coinConfig[trade.coin];
                return (
                  <tr key={trade.id} className="border-b border-[var(--color-border)]/50">
                    <td className="py-3 text-sm text-[var(--color-text-muted)]">{trade.signalId}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center`}>
                          <span className="text-white text-xs font-bold">{config.icon}</span>
                        </div>
                        <span className="font-medium">{trade.coin}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${trade.type === 'BUY' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {trade.type}
                      </span>
                    </td>
                    <td className="py-3 font-mono text-sm">
                      {trade.coin === 'KAS' ? `$${trade.entryPrice.toFixed(3)}` : `$${trade.entryPrice.toLocaleString()}`}
                    </td>
                    <td className="py-3 font-mono text-sm">
                      {trade.exitPrice
                        ? (trade.coin === 'KAS' ? `$${trade.exitPrice.toFixed(3)}` : `$${trade.exitPrice.toLocaleString()}`)
                        : '-'
                      }
                    </td>
                    <td className="py-3">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((tp) => (
                          <div
                            key={tp}
                            className={`w-4 h-4 rounded-full text-xs flex items-center justify-center ${
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
                    <td className={`py-3 text-right font-semibold ${trade.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {trade.profit >= 0 ? '+' : ''}{trade.profit.toFixed(1)}%
                      <div className="text-xs text-[var(--color-text-muted)]">
                        {trade.profitUsd >= 0 ? '+' : ''}${trade.profitUsd.toFixed(2)}
                      </div>
                    </td>
                    <td className="py-3">
                      {trade.status === 'active' ? (
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                          <span className="text-green-400 text-sm">{t('history.active')}</span>
                        </span>
                      ) : (
                        <span className="text-[var(--color-text-muted)] text-sm">{t('history.closed')}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Coming Soon Info */}
      <GlassCard className="p-4 border-[var(--color-warning)]/30 bg-[var(--color-warning)]/5">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-[var(--color-warning)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm text-[var(--color-text-secondary)]">
              <strong>{t('comingSoon.title')}:</strong> {t('comingSoon.desc')}
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
