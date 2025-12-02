import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { KaspaWidget } from '@/components/market/KaspaWidget';
import { MarketStats } from '@/components/market/MarketStats';
import { TopTokensList } from '@/components/market/TopTokensList';
import { GainersLosers } from '@/components/market/GainersLosers';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="text-center py-8 mb-8">
        <Badge variant="pro" size="md" className="mb-4">
          LIVE DATA
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-gradient-primary">KASPA-NEXUS</span>
        </h1>
        <p className="text-lg md:text-xl text-text-secondary mb-6 max-w-2xl mx-auto">
          The Most Accurate KRC-20 Data Platform
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button href="/tokens" size="md">
            Explore Tokens
          </Button>
          <Button href="/register" variant="secondary" size="md">
            Get Started Free
          </Button>
        </div>
      </section>

      {/* Kaspa Widget */}
      <section className="mb-8">
        <KaspaWidget />
      </section>

      {/* Market Stats */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">KRC-20 Market Overview</h2>
        <MarketStats />
      </section>

      {/* Top Gainers / Losers */}
      <section className="mb-8">
        <GainersLosers limit={5} />
      </section>

      {/* Top Tokens */}
      <section className="mb-8">
        <TopTokensList title="Top KRC-20 by Market Cap" limit={8} />
      </section>

      {/* Features Section */}
      <section className="py-8">
        <h2 className="text-2xl font-bold text-center mb-8">
          Why KASPA-NEXUS?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <GlassCard padding="lg">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Real-Time Data</h3>
            <p className="text-text-secondary text-sm">
              Live prices, volume, and market cap for all KRC-20 tokens updated every second.
            </p>
          </GlassCard>

          <GlassCard padding="lg">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">
              AI Signals
              <Badge variant="pro" className="ml-2">PRO</Badge>
            </h3>
            <p className="text-text-secondary text-sm">
              Machine learning powered trading signals with entry/exit points and confidence scores.
            </p>
          </GlassCard>

          <GlassCard padding="lg">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Portfolio
              <Badge variant="pro" className="ml-2">PRO</Badge>
            </h3>
            <p className="text-text-secondary text-sm">
              Track your holdings, analyze performance, and get AI-powered portfolio suggestions.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8">
        <GlassCard className="text-center" padding="lg" glow>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Trading Smarter?
          </h2>
          <p className="text-text-secondary mb-6 max-w-md mx-auto">
            Join thousands of traders using KASPA-NEXUS to make better investment decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/register" size="lg">
              Create Free Account
            </Button>
            <Button href="https://api.kaspa-nexus.io/docs" variant="secondary" size="lg" external>
              API Documentation
            </Button>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
