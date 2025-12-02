import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function GlassCard({
  children,
  className = '',
  glow = false,
  hover = true,
  padding = 'md',
}: GlassCardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const baseClass = glow ? 'glass-card-glow' : 'glass-card';
  const hoverClass = hover && !glow ? 'hover:border-primary/30 hover:shadow-glass-glow transition-all duration-300' : '';

  return (
    <div className={`${baseClass} ${paddingClasses[padding]} ${hoverClass} ${className}`}>
      {children}
    </div>
  );
}
