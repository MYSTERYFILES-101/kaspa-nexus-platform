'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { SignalsSwitchbar } from '@/components/signals/SignalsSwitchbar';

export default function SignalsBoardPage() {
  const t = useTranslations('signalsBoard');

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
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-lg flex-shrink-0">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl md:text-4xl font-bold">{t('title')}</h1>
            <p className="text-[var(--color-text-muted)] text-sm md:text-base">{t('subtitle')}</p>
          </div>
        </div>
      </GlassCard>

      {/* Was sind Trading-Signale? */}
      <GlassCard className="p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">📊</span>
          {t('whatAreSignals.title')}
        </h2>
        <p className="text-[var(--color-text-secondary)] mb-4">
          {t('whatAreSignals.description')}
        </p>
        <div className="p-4 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)]">
          <p className="text-sm text-[var(--color-text-muted)] mb-3">{t('whatAreSignals.example')}</p>
          <div className="font-mono text-sm bg-black/30 rounded-lg p-4">
            <div className="text-green-400 font-bold mb-2">[BUY] KAS/USDT</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>Entry: <span className="text-white">$0.1485</span></div>
              <div>Stop-Loss: <span className="text-red-400">$0.1337 (-10.0%)</span></div>
            </div>
            <div className="mt-2 text-xs text-[var(--color-text-muted)]">
              Take-Profit: TP1 +8% | TP2 +15% | TP3 +25% | TP4 +40% | TP5 +60%
            </div>
            <div className="mt-2 text-xs">
              Confidence: <span className="text-cyan-400">91%</span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* 3-KI Validierung */}
      <GlassCard className="p-6 mb-6 border-cyan-500/30 bg-cyan-500/5">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">🤖</span>
          {t('tripleAi.title')}
        </h2>
        <p className="text-[var(--color-text-secondary)] mb-6">
          {t('tripleAi.description')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* KI 1 */}
          <div className="p-4 rounded-xl bg-[var(--color-bg-tertiary)] border border-purple-500/30 text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <span className="text-2xl">🧠</span>
            </div>
            <h3 className="font-bold text-lg mb-1">KI #1</h3>
            <p className="text-xs text-[var(--color-text-muted)]">{t('tripleAi.ai1')}</p>
          </div>

          {/* KI 2 */}
          <div className="p-4 rounded-xl bg-[var(--color-bg-tertiary)] border border-blue-500/30 text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="font-bold text-lg mb-1">KI #2</h3>
            <p className="text-xs text-[var(--color-text-muted)]">{t('tripleAi.ai2')}</p>
          </div>

          {/* KI 3 */}
          <div className="p-4 rounded-xl bg-[var(--color-bg-tertiary)] border border-green-500/30 text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="font-bold text-lg mb-1">KI #3</h3>
            <p className="text-xs text-[var(--color-text-muted)]">{t('tripleAi.ai3')}</p>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
          <div className="flex items-center gap-2 text-green-400 font-semibold mb-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {t('tripleAi.rule')}
          </div>
          <p className="text-sm text-[var(--color-text-muted)]">{t('tripleAi.ruleDesc')}</p>
        </div>
      </GlassCard>

      {/* Unterstützte Coins */}
      <GlassCard className="p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">🪙</span>
          {t('supportedCoins.title')}
        </h2>
        <p className="text-[var(--color-text-secondary)] mb-4">
          {t('supportedCoins.description')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* KAS */}
          <div className="p-4 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              K
            </div>
            <div>
              <h3 className="font-bold text-lg">Kaspa (KAS)</h3>
              <p className="text-xs text-[var(--color-text-muted)]">{t('supportedCoins.kas')}</p>
            </div>
          </div>

          {/* BTC */}
          <div className="p-4 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              ₿
            </div>
            <div>
              <h3 className="font-bold text-lg">Bitcoin (BTC)</h3>
              <p className="text-xs text-[var(--color-text-muted)]">{t('supportedCoins.btc')}</p>
            </div>
          </div>

          {/* ETH */}
          <div className="p-4 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              Ξ
            </div>
            <div>
              <h3 className="font-bold text-lg">Ethereum (ETH)</h3>
              <p className="text-xs text-[var(--color-text-muted)]">{t('supportedCoins.eth')}</p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Signal-Struktur */}
      <GlassCard className="p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">📋</span>
          {t('signalStructure.title')}
        </h2>
        <p className="text-[var(--color-text-secondary)] mb-4">
          {t('signalStructure.description')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
            <h4 className="font-semibold mb-2 text-green-400">{t('signalStructure.entry')}</h4>
            <p className="text-sm text-[var(--color-text-muted)]">{t('signalStructure.entryDesc')}</p>
          </div>
          <div className="p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
            <h4 className="font-semibold mb-2 text-red-400">{t('signalStructure.stopLoss')}</h4>
            <p className="text-sm text-[var(--color-text-muted)]">{t('signalStructure.stopLossDesc')}</p>
          </div>
          <div className="p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
            <h4 className="font-semibold mb-2 text-cyan-400">{t('signalStructure.takeProfit')}</h4>
            <p className="text-sm text-[var(--color-text-muted)]">{t('signalStructure.takeProfitDesc')}</p>
          </div>
          <div className="p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
            <h4 className="font-semibold mb-2 text-purple-400">{t('signalStructure.confidence')}</h4>
            <p className="text-sm text-[var(--color-text-muted)]">{t('signalStructure.confidenceDesc')}</p>
          </div>
        </div>
      </GlassCard>

      {/* Trailing Stop-Loss System */}
      <GlassCard className="p-6 mb-6 border-yellow-500/30 bg-yellow-500/5">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">🛡️</span>
          {t('trailingSystem.title')}
        </h2>
        <p className="text-[var(--color-text-secondary)] mb-4">
          {t('trailingSystem.description')}
        </p>

        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--color-bg-tertiary)]">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold">1</div>
            <div>
              <span className="font-semibold text-green-400">TP1 {t('trailingSystem.reached')}</span>
              <span className="text-[var(--color-text-muted)] ml-2">→ Stop-Loss → Entry (Breakeven)</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--color-bg-tertiary)]">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold">2</div>
            <div>
              <span className="font-semibold text-green-400">TP2 {t('trailingSystem.reached')}</span>
              <span className="text-[var(--color-text-muted)] ml-2">→ Stop-Loss → TP1</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--color-bg-tertiary)]">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold">3</div>
            <div>
              <span className="font-semibold text-green-400">TP3+ {t('trailingSystem.reached')}</span>
              <span className="text-[var(--color-text-muted)] ml-2">→ Stop-Loss → {t('trailingSystem.previousTp')}</span>
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm text-yellow-400">
          💡 {t('trailingSystem.benefit')}
        </p>
      </GlassCard>

      {/* BTC-Watching */}
      <GlassCard className="p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">👁️</span>
          {t('btcWatching.title')}
        </h2>
        <p className="text-[var(--color-text-secondary)] mb-4">
          {t('btcWatching.description')}
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-[var(--color-border)]">
                <th className="pb-2 font-medium text-[var(--color-text-muted)]">{t('btcWatching.movement')}</th>
                <th className="pb-2 font-medium text-[var(--color-text-muted)]">{t('btcWatching.action')}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--color-border)]/50">
                <td className="py-3 text-yellow-400">-3% in 1h</td>
                <td className="py-3">{t('btcWatching.action1')}</td>
              </tr>
              <tr className="border-b border-[var(--color-border)]/50">
                <td className="py-3 text-orange-400">-5% in 4h</td>
                <td className="py-3">{t('btcWatching.action2')}</td>
              </tr>
              <tr className="border-b border-[var(--color-border)]/50">
                <td className="py-3 text-red-400">-8% in 24h</td>
                <td className="py-3">{t('btcWatching.action3')}</td>
              </tr>
              <tr>
                <td className="py-3 text-red-500 font-bold">-12% in 24h</td>
                <td className="py-3 text-red-400 font-semibold">{t('btcWatching.action4')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Qualität vor Quantität */}
      <GlassCard className="p-6 mb-6 border-purple-500/30 bg-purple-500/5">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">⭐</span>
          {t('quality.title')}
        </h2>
        <p className="text-[var(--color-text-secondary)] mb-4">
          {t('quality.description')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
            <h4 className="font-semibold text-red-400 mb-2">❌ {t('quality.notUs')}</h4>
            <ul className="text-sm text-[var(--color-text-muted)] space-y-1">
              <li>• {t('quality.not1')}</li>
              <li>• {t('quality.not2')}</li>
              <li>• {t('quality.not3')}</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
            <h4 className="font-semibold text-green-400 mb-2">✓ {t('quality.ourApproach')}</h4>
            <ul className="text-sm text-[var(--color-text-muted)] space-y-1">
              <li>• {t('quality.our1')}</li>
              <li>• {t('quality.our2')}</li>
              <li>• {t('quality.our3')}</li>
            </ul>
          </div>
        </div>
      </GlassCard>

      {/* Abo-Stufen */}
      <GlassCard className="p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">💎</span>
          {t('tiers.title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pro */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/30">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-sm font-bold">PRO</span>
              <span className="text-xl font-bold">$9.99/mo</span>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {t('tiers.pro1')}
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {t('tiers.pro2')}
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {t('tiers.pro3')}
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {t('tiers.pro4')}
              </li>
            </ul>
            <Link href="/pricing" className="mt-4 block w-full py-2 rounded-lg bg-cyan-500 text-white text-center font-semibold hover:bg-cyan-600 transition-colors">
              {t('tiers.getPro')}
            </Link>
          </div>

          {/* Pro+ */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold">PRO+</span>
              <span className="text-xl font-bold">$29.99/mo</span>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {t('tiers.proPlus1')}
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {t('tiers.proPlus2')}
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {t('tiers.proPlus3')}
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {t('tiers.proPlus4')}
              </li>
            </ul>
            <Link href="/pricing" className="mt-4 block w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center font-semibold hover:opacity-90 transition-opacity">
              {t('tiers.getProPlus')}
            </Link>
          </div>
        </div>
      </GlassCard>

      {/* Risikohinweis */}
      <GlassCard className="p-4 border-red-500/30 bg-red-500/5">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-red-400 mb-1">{t('disclaimer.title')}</p>
            <p className="text-xs text-[var(--color-text-secondary)]">{t('disclaimer.text')}</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
