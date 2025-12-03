'use client';

import { useEffect, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { GlassCard } from '@/components/ui/GlassCard';
import { Skeleton } from '@/components/ui/Skeleton';
import type { KaspaNetworkStats } from '@/types';

interface MiningInfoProps {
  className?: string;
}

// Kaspa emission schedule - chromatic phase halving every ~1 year
const EMISSION_SCHEDULE = [
  { date: '2022-11-07', reward: 440.00, event: 'Launch' },
  { date: '2023-05-07', reward: 415.16, event: 'Reduction 1' },
  { date: '2023-11-07', reward: 391.71, event: 'Reduction 2' },
  { date: '2024-05-07', reward: 369.61, event: 'Reduction 3' },
  { date: '2024-11-07', reward: 348.76, event: 'Reduction 4' },
  { date: '2025-05-08', reward: 329.15, event: 'Reduction 5' },
  { date: '2025-11-07', reward: 310.72, event: 'Reduction 6' },
  { date: '2026-05-08', reward: 293.33, event: 'Reduction 7' },
  { date: '2026-11-07', reward: 276.98, event: 'Reduction 8' },
  { date: '2027-05-08', reward: 261.46, event: 'Reduction 9' },
  { date: '2027-11-07', reward: 246.77, event: 'Reduction 10' },
];

// Find current and next reduction
function getCurrentReductionInfo() {
  const now = new Date();
  for (let i = 0; i < EMISSION_SCHEDULE.length - 1; i++) {
    const current = new Date(EMISSION_SCHEDULE[i].date);
    const next = new Date(EMISSION_SCHEDULE[i + 1].date);
    if (now >= current && now < next) {
      return {
        currentReward: EMISSION_SCHEDULE[i].reward,
        nextReward: EMISSION_SCHEDULE[i + 1].reward,
        nextDate: next,
        reductionNumber: i + 1,
      };
    }
  }
  // Return last known
  const last = EMISSION_SCHEDULE[EMISSION_SCHEDULE.length - 1];
  return {
    currentReward: last.reward,
    nextReward: last.reward * 0.9438, // ~5.62% reduction
    nextDate: new Date(last.date),
    reductionNumber: EMISSION_SCHEDULE.length,
  };
}

function calculateTimeRemaining(targetDate: Date) {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

export function MiningInfo({ className }: MiningInfoProps) {
  const t = useTranslations('kaspaPage');
  const [stats, setStats] = useState<KaspaNetworkStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(calculateTimeRemaining(getCurrentReductionInfo().nextDate));

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('https://api.kaspa-nexus.io/v1/kaspa/stats');
      if (!res.ok) throw new Error('Failed to fetch');
      const json = await res.json();
      if (json.success && json.data) {
        setStats(json.data);
      }
    } catch {
      // Silent fail, use calculated values
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  // Update countdown every second
  useEffect(() => {
    const reductionInfo = getCurrentReductionInfo();
    const timer = setInterval(() => {
      setCountdown(calculateTimeRemaining(reductionInfo.nextDate));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const reductionInfo = getCurrentReductionInfo();
  const currentReward = stats?.mining?.blockReward || reductionInfo.currentReward;
  const rewardPerBlock = currentReward / 10; // 10 BPS

  if (loading) {
    return (
      <GlassCard className={`p-6 ${className}`}>
        <Skeleton width={200} height={24} className="mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} height={120} variant="rectangular" />
          ))}
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className={`p-6 ${className}`}>
      <h3 className="text-lg font-bold text-gradient mb-4">{t('miningRewards')}</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Current Reward */}
        <div className="glass-card p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--color-success)]/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-[var(--color-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-muted)] uppercase">{t('currentReward')}</p>
              <p className="text-xl font-bold text-[var(--color-success)]">{rewardPerBlock.toFixed(4)} KAS</p>
            </div>
          </div>
          <p className="text-xs text-[var(--color-text-muted)]">{t('perBlock')}</p>
          <p className="text-sm font-medium">{currentReward.toFixed(4)} KAS/s</p>
        </div>

        {/* Next Reduction Countdown */}
        <div className="glass-card p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--color-warning)]/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-[var(--color-warning)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-muted)] uppercase">{t('nextReduction')}</p>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {reductionInfo.nextDate.toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div>
              <p className="text-lg font-bold text-[var(--color-warning)]">{countdown.days}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{t('days')}</p>
            </div>
            <div>
              <p className="text-lg font-bold text-[var(--color-warning)]">{countdown.hours}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{t('hours')}</p>
            </div>
            <div>
              <p className="text-lg font-bold text-[var(--color-warning)]">{countdown.minutes}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{t('minutes')}</p>
            </div>
            <div>
              <p className="text-lg font-bold text-[var(--color-warning)]">{countdown.seconds}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{t('seconds')}</p>
            </div>
          </div>
        </div>

        {/* Next Reward */}
        <div className="glass-card p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--color-secondary)]/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-[var(--color-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-muted)] uppercase">{t('rewardAfterReduction')}</p>
              <p className="text-xl font-bold text-[var(--color-secondary)]">
                {(reductionInfo.nextReward / 10).toFixed(4)} KAS
              </p>
            </div>
          </div>
          <p className="text-xs text-[var(--color-text-muted)]">{t('reductionPercent')}</p>
          <p className="text-sm font-medium text-[var(--color-error)]">-5.62%</p>
        </div>
      </div>
    </GlassCard>
  );
}
