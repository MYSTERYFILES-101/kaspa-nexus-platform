'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { GlassCard } from '@/components/ui/GlassCard';
import { InvestmentSwitchbar } from '@/components/investment/InvestmentSwitchbar';

// Risk Level Type
type RiskLevel = 'conservative' | 'balanced' | 'aggressive';

// Tab Type
type TabType = 'generator' | 'analyzer';

// Mock result for UI preview (will be replaced by AI)
interface PortfolioResult {
  marketStatus: {
    trend: 'bullish' | 'bearish' | 'neutral';
    btcDominance: number;
    fearGreedIndex: number;
    totalMarketCap: string;
  };
  allocation: {
    coin: string;
    symbol: string;
    percentage: number;
    amount: number;
    currentPrice: string;
  }[];
  prognosis: {
    bestCase: { percentage: number; value: number };
    likely: { percentage: number; value: number };
    worstCase: { percentage: number; value: number };
  };
  reasoning: string[];
  timestamp: string;
}

export default function PortfolioPage() {
  const t = useTranslations('portfolio');
  const tInvestment = useTranslations('investment');

  // State
  const [activeTab, setActiveTab] = useState<TabType>('generator');
  const [budget, setBudget] = useState<string>('');
  const [riskLevel, setRiskLevel] = useState<RiskLevel>('balanced');
  const [portfolioInput, setPortfolioInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PortfolioResult | null>(null);

  // Handle Generate Portfolio
  const handleGenerate = async () => {
    if (!budget || parseFloat(budget) <= 0) return;

    setIsLoading(true);
    setResult(null);

    // TODO: Replace with actual AI API call
    // Simulate API call for now
    setTimeout(() => {
      setIsLoading(false);
      // Result will come from AI
    }, 2000);
  };

  // Handle Analyze Portfolio
  const handleAnalyze = async () => {
    if (!portfolioInput.trim()) return;

    setIsLoading(true);
    setResult(null);

    // TODO: Replace with actual AI API call
    setTimeout(() => {
      setIsLoading(false);
      // Result will come from AI
    }, 2000);
  };

  return (
    <div className="py-4 md:py-6 lg:py-8">
      {/* Investment Banner */}
      <div className="mb-6 rounded-xl overflow-hidden shadow-2xl">
        <Image
          src="/images/banners/Banner-Investment-Hub.png"
          alt="Investment Hub"
          width={1920}
          height={400}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* Investment Switchbar */}
      <InvestmentSwitchbar />

      {/* Page Header */}
      <GlassCard className="p-4 md:p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-lg flex-shrink-0">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-4xl font-bold">{t('title')}</h1>
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white text-sm font-bold">
                PRO
              </span>
            </div>
            <p className="text-[var(--color-text-muted)] text-sm md:text-base">{t('description')}</p>
          </div>
        </div>
      </GlassCard>

      {/* Requires Pro Banner */}
      <GlassCard className="p-6 mb-6 border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">{tInvestment('requiresPro')}</h3>
              <p className="text-sm text-[var(--color-text-muted)]">{t('unlockFeatures')}</p>
            </div>
          </div>
          <button disabled className="px-6 py-3 rounded-lg bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-semibold opacity-50 cursor-not-allowed">
            {tInvestment('upgradeToPro')}
          </button>
        </div>
      </GlassCard>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('generator')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
            activeTab === 'generator'
              ? 'bg-[var(--color-primary)] text-white shadow-lg'
              : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>{t('tabs.generator')}</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('analyzer')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
            activeTab === 'analyzer'
              ? 'bg-[var(--color-primary)] text-white shadow-lg'
              : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span>{t('tabs.analyzer')}</span>
          </div>
        </button>
      </div>

      {/* Generator Tab */}
      {activeTab === 'generator' && (
        <div className="space-y-6">
          {/* Input Card */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              {t('generator.title')}
            </h3>

            {/* Budget Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-[var(--color-text-secondary)]">
                {t('generator.budget')}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">€</span>
                <input
                  type="number"
                  min="100"
                  max="10000000"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="10000"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                />
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">{t('generator.budgetHint')}</p>
            </div>

            {/* Risk Level Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3 text-[var(--color-text-secondary)]">
                {t('generator.riskLevel')}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Conservative */}
                <button
                  onClick={() => setRiskLevel('conservative')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    riskLevel === 'conservative'
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-[var(--color-border)] hover:border-green-500/50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      riskLevel === 'conservative' ? 'bg-green-500' : 'bg-green-500/20'
                    }`}>
                      <svg className={`w-5 h-5 ${riskLevel === 'conservative' ? 'text-white' : 'text-green-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">{t('generator.conservative')}</div>
                      <div className="text-xs text-[var(--color-text-muted)]">{t('generator.lowRisk')}</div>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--color-text-muted)] text-left">{t('generator.conservativeDesc')}</p>
                </button>

                {/* Balanced */}
                <button
                  onClick={() => setRiskLevel('balanced')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    riskLevel === 'balanced'
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                      : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      riskLevel === 'balanced' ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-primary)]/20'
                    }`}>
                      <svg className={`w-5 h-5 ${riskLevel === 'balanced' ? 'text-white' : 'text-[var(--color-primary)]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">{t('generator.balanced')}</div>
                      <div className="text-xs text-[var(--color-text-muted)]">{t('generator.mediumRisk')}</div>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--color-text-muted)] text-left">{t('generator.balancedDesc')}</p>
                </button>

                {/* Aggressive */}
                <button
                  onClick={() => setRiskLevel('aggressive')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    riskLevel === 'aggressive'
                      ? 'border-orange-500 bg-orange-500/10'
                      : 'border-[var(--color-border)] hover:border-orange-500/50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      riskLevel === 'aggressive' ? 'bg-orange-500' : 'bg-orange-500/20'
                    }`}>
                      <svg className={`w-5 h-5 ${riskLevel === 'aggressive' ? 'text-white' : 'text-orange-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">{t('generator.aggressive')}</div>
                      <div className="text-xs text-[var(--color-text-muted)]">{t('generator.highRisk')}</div>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--color-text-muted)] text-left">{t('generator.aggressiveDesc')}</p>
                </button>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!budget || parseFloat(budget) <= 0 || isLoading}
              className="w-full py-4 rounded-lg bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-[var(--color-primary)]/30 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{t('generator.analyzing')}</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span>{t('generator.generate')}</span>
                </>
              )}
            </button>
          </GlassCard>

          {/* Result Placeholder */}
          {isLoading && (
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[var(--color-primary)] animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">{t('generator.aiWorking')}</h3>
                  <p className="text-sm text-[var(--color-text-muted)]">{t('generator.aiWorkingDesc')}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-[var(--color-bg-tertiary)] rounded animate-pulse"></div>
                <div className="h-4 bg-[var(--color-bg-tertiary)] rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-[var(--color-bg-tertiary)] rounded animate-pulse w-1/2"></div>
              </div>
            </GlassCard>
          )}
        </div>
      )}

      {/* Analyzer Tab */}
      {activeTab === 'analyzer' && (
        <div className="space-y-6">
          {/* Input Card */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              {t('analyzer.title')}
            </h3>

            {/* Portfolio Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-[var(--color-text-secondary)]">
                {t('analyzer.inputLabel')}
              </label>
              <textarea
                value={portfolioInput}
                onChange={(e) => setPortfolioInput(e.target.value)}
                placeholder={t('analyzer.placeholder')}
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:outline-none transition-colors resize-none"
              />
              <p className="text-xs text-[var(--color-text-muted)] mt-1">{t('analyzer.inputHint')}</p>
            </div>

            {/* Usage Counter */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-bg-tertiary)] mb-4">
              <span className="text-sm text-[var(--color-text-secondary)]">{t('analyzer.usageThisMonth')}</span>
              <span className="font-bold text-[var(--color-primary)]">0 / 2</span>
            </div>

            {/* Analyze Button */}
            <button
              onClick={handleAnalyze}
              disabled={!portfolioInput.trim() || isLoading}
              className="w-full py-4 rounded-lg bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-[var(--color-primary)]/30 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{t('analyzer.analyzing')}</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>{t('analyzer.analyze')}</span>
                </>
              )}
            </button>
          </GlassCard>

          {/* Example Format */}
          <GlassCard className="p-4 border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t('analyzer.exampleTitle')}
            </h4>
            <code className="block text-sm text-[var(--color-text-secondary)] bg-[var(--color-bg-tertiary)] p-3 rounded-lg">
              0.5 BTC, 2 ETH, 5000 KAS, 10000 NACHO, 5000 KASPER
            </code>
          </GlassCard>

          {/* Result Placeholder */}
          {isLoading && (
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[var(--color-primary)] animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">{t('analyzer.aiWorking')}</h3>
                  <p className="text-sm text-[var(--color-text-muted)]">{t('analyzer.aiWorkingDesc')}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-[var(--color-bg-tertiary)] rounded animate-pulse"></div>
                <div className="h-4 bg-[var(--color-bg-tertiary)] rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-[var(--color-bg-tertiary)] rounded animate-pulse w-1/2"></div>
              </div>
            </GlassCard>
          )}
        </div>
      )}

      {/* Disclaimer */}
      <GlassCard className="p-4 mt-6 border-[var(--color-warning)]/30 bg-[var(--color-warning)]/5">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-[var(--color-warning)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <h4 className="font-medium text-[var(--color-warning)] mb-1">{t('disclaimer.title')}</h4>
            <p className="text-sm text-[var(--color-text-secondary)]">{t('disclaimer.text')}</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
