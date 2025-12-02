'use client';

interface StatsCardProps {
  label: string;
  value: string | number;
  suffix?: string;
  variant?: 'default' | 'success' | 'warning';
}

export function StatsCard({ label, value, suffix, variant = 'default' }: StatsCardProps) {
  const valueClasses = {
    default: 'text-[var(--color-text-primary)]',
    success: 'text-[var(--color-success)]',
    warning: 'text-[var(--color-warning)]',
  };

  return (
    <div className="glass-card p-5 text-center">
      <div className={`text-2xl md:text-3xl font-bold ${valueClasses[variant]} mb-1`}>
        {value}
        {suffix && <span className="text-lg ml-1">{suffix}</span>}
      </div>
      <div className="text-sm text-[var(--color-text-muted)] uppercase tracking-wide">
        {label}
      </div>
    </div>
  );
}
