'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { GlassCard } from '@/components/ui/GlassCard';

interface ApiPackageProps {
  name: string;
  price: string;
  description: string;
  endpoints: string[];
  requests: string;
  rateLimit: string;
  highlighted?: boolean;
  disabled?: boolean;
}

function ApiPackageCard({ name, price, description, endpoints, requests, rateLimit, highlighted, disabled }: ApiPackageProps) {
  const t = useTranslations('account');

  return (
    <GlassCard className={`p-6 h-full flex flex-col ${highlighted ? 'border-[var(--color-primary)]/50 bg-[var(--color-primary)]/5' : ''}`}>
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-1">{name}</h3>
        <p className="text-sm text-[var(--color-text-secondary)]">{description}</p>
      </div>

      <div className="mb-4">
        <div className="text-3xl font-bold text-[var(--color-primary)]">{price}</div>
        <span className="text-sm text-[var(--color-text-muted)]">{t('api.perMonth')}</span>
      </div>

      <div className="mb-4 p-3 rounded-lg bg-[var(--color-bg-tertiary)]">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-[var(--color-text-muted)]">{t('api.requestsMonth')}</span>
          <span className="font-semibold">{requests}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[var(--color-text-muted)]">{t('api.rateLimit')}</span>
          <span className="font-semibold">{rateLimit}</span>
        </div>
      </div>

      <div className="mb-4 flex-grow">
        <p className="text-sm font-medium mb-2">{t('api.includes')}</p>
        <ul className="space-y-2">
          {endpoints.map((endpoint, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm">
              <svg className="w-4 h-4 text-[var(--color-success)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[var(--color-text-secondary)]">{endpoint}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        disabled={disabled}
        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
          highlighted
            ? 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white'
            : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] border border-[var(--color-border)]'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
      >
        {t('api.subscribe')}
      </button>
    </GlassCard>
  );
}

export default function ApiPage() {
  const t = useTranslations('account');

  const packages = [
    {
      name: t('api.kaspaApi'),
      price: t('api.tbd'),
      description: t('api.kaspaApiDesc'),
      endpoints: [
        t('api.endpoint.kaspaPrice'),
        t('api.endpoint.kaspaMarket'),
        t('api.endpoint.kaspaHistory'),
        t('api.endpoint.kaspaNetwork'),
      ],
      requests: t('api.tbd'),
      rateLimit: t('api.tbd'),
    },
    {
      name: t('api.krc20Api'),
      price: t('api.tbd'),
      description: t('api.krc20ApiDesc'),
      endpoints: [
        t('api.endpoint.allKaspa'),
        t('api.endpoint.tokenList'),
        t('api.endpoint.tokenPrices'),
        t('api.endpoint.tokenOhlc'),
        t('api.endpoint.tokenHolders'),
      ],
      requests: t('api.tbd'),
      rateLimit: t('api.tbd'),
      highlighted: true,
    },
    {
      name: t('api.signalApi'),
      price: t('api.tbd'),
      description: t('api.signalApiDesc'),
      endpoints: [
        t('api.endpoint.liveSignals'),
        t('api.endpoint.signalHistory'),
        t('api.endpoint.signalStats'),
        t('api.endpoint.webhooks'),
      ],
      requests: t('api.tbd'),
      rateLimit: t('api.tbd'),
    },
    {
      name: t('api.completeApi'),
      price: t('api.tbd'),
      description: t('api.completeApiDesc'),
      endpoints: [
        t('api.endpoint.everything'),
        t('api.endpoint.priorityAccess'),
        t('api.endpoint.dedicatedSupport'),
        t('api.endpoint.customLimits'),
      ],
      requests: t('api.unlimited'),
      rateLimit: t('api.custom'),
    },
  ];

  return (
    <div className="py-4 md:py-6 lg:py-8">
      {/* Account Banner */}
      <div className="mb-6 rounded-xl overflow-hidden shadow-2xl">
        <Image
          src="/images/banners/banner-account.png"
          alt="Account & Shop"
          width={1920}
          height={400}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* Page Header */}
      <GlassCard className="p-4 md:p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-lg flex-shrink-0">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-4xl font-bold">{t('api.title')}</h1>
            <p className="text-[var(--color-text-muted)] text-sm md:text-base">{t('api.subtitle')}</p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-warning)]/10 text-[var(--color-warning)] border border-[var(--color-warning)]/30 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t('comingSoon')}
          </span>
        </div>
      </GlassCard>

      {/* API Info */}
      <GlassCard className="p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">{t('api.whatIsApi')}</h2>
        <p className="text-[var(--color-text-secondary)] mb-4">{t('api.whatIsApiDesc')}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[var(--color-bg-tertiary)]">
            <div className="w-10 h-10 mb-3 rounded-full bg-cyan-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="font-medium mb-1">{t('api.feature1')}</h4>
            <p className="text-xs text-[var(--color-text-muted)]">{t('api.feature1Desc')}</p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--color-bg-tertiary)]">
            <div className="w-10 h-10 mb-3 rounded-full bg-purple-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 className="font-medium mb-1">{t('api.feature2')}</h4>
            <p className="text-xs text-[var(--color-text-muted)]">{t('api.feature2Desc')}</p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--color-bg-tertiary)]">
            <div className="w-10 h-10 mb-3 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h4 className="font-medium mb-1">{t('api.feature3')}</h4>
            <p className="text-xs text-[var(--color-text-muted)]">{t('api.feature3Desc')}</p>
          </div>
        </div>
      </GlassCard>

      {/* API Packages */}
      <h2 className="text-xl font-semibold mb-4">{t('api.choosePackage')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {packages.map((pkg, idx) => (
          <ApiPackageCard
            key={idx}
            name={pkg.name}
            price={pkg.price}
            description={pkg.description}
            endpoints={pkg.endpoints}
            requests={pkg.requests}
            rateLimit={pkg.rateLimit}
            highlighted={pkg.highlighted}
            disabled
          />
        ))}
      </div>

      {/* API Key Management (for existing users) */}
      <GlassCard className="p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">{t('api.yourKeys')}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">{t('api.activeKey')}</h4>
            <div className="p-4 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] opacity-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-sm">knx_****-****-****-****</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">{t('api.noActiveKey')}</p>
                </div>
                <button disabled className="p-2 rounded-lg bg-[var(--color-bg-secondary)] cursor-not-allowed">
                  <svg className="w-5 h-5 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-3">{t('api.usageStats')}</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-bg-tertiary)] opacity-50">
                <span className="text-sm text-[var(--color-text-secondary)]">{t('api.requestsUsed')}</span>
                <span className="font-semibold">0 / 0</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[var(--color-bg-tertiary)] opacity-50">
                <div className="h-full w-0 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]"></div>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Documentation Link */}
      <GlassCard className="p-6 mb-6 border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-1">{t('api.documentation')}</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">{t('api.documentationDesc')}</p>
          </div>
          <a
            href="https://api.kaspa-nexus.io/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-[var(--color-primary)]/20 text-[var(--color-primary)] font-medium hover:bg-[var(--color-primary)]/30 transition-colors opacity-50 pointer-events-none"
          >
            {t('api.viewDocs')}
          </a>
        </div>
      </GlassCard>

      {/* Coming Soon Info */}
      <GlassCard className="p-4 border-[var(--color-warning)]/30 bg-[var(--color-warning)]/5">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-[var(--color-warning)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-[var(--color-text-secondary)]">{t('comingSoonDesc')}</p>
        </div>
      </GlassCard>
    </div>
  );
}
