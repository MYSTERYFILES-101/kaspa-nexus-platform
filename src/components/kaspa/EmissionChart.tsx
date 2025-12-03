'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { GlassCard } from '@/components/ui/GlassCard';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';

interface EmissionChartProps {
  className?: string;
}

// Kaspa emission schedule data
const EMISSION_DATA = [
  { date: '2022-11', reward: 440.00 },
  { date: '2023-05', reward: 415.16 },
  { date: '2023-11', reward: 391.71 },
  { date: '2024-05', reward: 369.61 },
  { date: '2024-11', reward: 348.76 },
  { date: '2025-05', reward: 329.15 },
  { date: '2025-11', reward: 310.72 },
  { date: '2026-05', reward: 293.33 },
  { date: '2026-11', reward: 276.98 },
  { date: '2027-05', reward: 261.46 },
  { date: '2027-11', reward: 246.77 },
  { date: '2028-05', reward: 232.99 },
  { date: '2028-11', reward: 220.00 },
  { date: '2029-05', reward: 207.70 },
  { date: '2029-11', reward: 196.09 },
  { date: '2030-05', reward: 185.13 },
];

// Custom tooltip component
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 border border-[var(--color-primary)]/30">
        <p className="text-sm font-semibold text-[var(--color-text-primary)]">{label}</p>
        <p className="text-sm text-[var(--color-primary)]">
          {payload[0].value.toFixed(2)} KAS/s
        </p>
        <p className="text-xs text-[var(--color-text-muted)]">
          {(payload[0].value / 10).toFixed(4)} KAS/block
        </p>
      </div>
    );
  }
  return null;
}

export function EmissionChart({ className }: EmissionChartProps) {
  const t = useTranslations('kaspaPage');
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        if (width > 0 && height > 0) {
          setDimensions({ width, height });
        }
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    const timer = setTimeout(updateDimensions, 100);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timer);
    };
  }, []);

  return (
    <GlassCard className={`p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gradient">{t('emissionSchedule')}</h3>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[var(--color-primary)]" />
          <span className="text-xs text-[var(--color-text-muted)]">{t('blockReward')}</span>
        </div>
      </div>

      <div ref={containerRef} className="h-[300px] w-full">
        {dimensions.width > 0 && dimensions.height > 0 ? (
          <AreaChart
            width={dimensions.width}
            height={dimensions.height}
            data={EMISSION_DATA}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="emissionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00D4FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.1)"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              stroke="rgba(255,255,255,0.5)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="rgba(255,255,255,0.5)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
              domain={[150, 450]}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              x="2028-11"
              stroke="#9D4EDD"
              strokeDasharray="5 5"
              label={{
                value: 'Crescendo',
                fill: '#9D4EDD',
                fontSize: 10,
                position: 'top',
              }}
            />
            <ReferenceLine
              x="2025-05"
              stroke="#00FF88"
              strokeDasharray="3 3"
              label={{
                value: 'Now',
                fill: '#00FF88',
                fontSize: 10,
                position: 'insideTopRight',
              }}
            />
            <Area
              type="stepAfter"
              dataKey="reward"
              stroke="#00D4FF"
              strokeWidth={2}
              fill="url(#emissionGradient)"
              dot={{ fill: '#00D4FF', strokeWidth: 0, r: 3 }}
              activeDot={{ fill: '#00D4FF', stroke: '#fff', strokeWidth: 2, r: 5 }}
            />
          </AreaChart>
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <div className="animate-pulse text-[var(--color-text-muted)]">Loading chart...</div>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-xs text-[var(--color-text-muted)]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 bg-[var(--color-success)]" />
          <span>{t('currentPosition')}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 bg-[var(--color-secondary)]" style={{ borderStyle: 'dashed' }} />
          <span>{t('crescendoHardfork')}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[var(--color-text-secondary)]">{t('reductionInfo')}</span>
        </div>
      </div>
    </GlassCard>
  );
}
