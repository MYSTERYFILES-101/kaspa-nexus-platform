'use client';

import { useTranslations } from 'next-intl';
import { GlassCard } from '@/components/ui/GlassCard';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

interface EmissionChartProps {
  className?: string;
}

// Kaspa emission schedule data
const EMISSION_DATA = [
  { date: '2022-11', reward: 440.00, label: 'Launch' },
  { date: '2023-05', reward: 415.16, label: '' },
  { date: '2023-11', reward: 391.71, label: '' },
  { date: '2024-05', reward: 369.61, label: '' },
  { date: '2024-11', reward: 348.76, label: '' },
  { date: '2025-05', reward: 329.15, label: 'Current' },
  { date: '2025-11', reward: 310.72, label: '' },
  { date: '2026-05', reward: 293.33, label: '' },
  { date: '2026-11', reward: 276.98, label: '' },
  { date: '2027-05', reward: 261.46, label: '' },
  { date: '2027-11', reward: 246.77, label: '' },
  { date: '2028-05', reward: 232.99, label: '' },
  { date: '2028-11', reward: 220.00, label: 'Crescendo HF' },
  { date: '2029-05', reward: 207.70, label: '' },
  { date: '2029-11', reward: 196.09, label: '' },
  { date: '2030-05', reward: 185.13, label: '' },
];

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
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
};

export function EmissionChart({ className }: EmissionChartProps) {
  const t = useTranslations('kaspaPage');

  return (
    <GlassCard className={`p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gradient">{t('emissionSchedule')}</h3>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[var(--color-primary)]" />
          <span className="text-xs text-[var(--color-text-muted)]">{t('blockReward')}</span>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
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
            {/* Mark Crescendo Hardfork */}
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
            {/* Mark current position */}
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
              dot={{
                fill: '#00D4FF',
                strokeWidth: 0,
                r: 3,
              }}
              activeDot={{
                fill: '#00D4FF',
                stroke: '#fff',
                strokeWidth: 2,
                r: 5,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
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
