import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'pro' | 'pro-plus' | 'success' | 'error' | 'warning';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
}: BadgeProps) {
  const baseClasses = 'inline-flex items-center justify-center font-bold rounded-full';

  const variantClasses = {
    default: 'bg-white/10 text-text-secondary',
    pro: 'badge-pro',
    'pro-plus': 'badge-pro-plus',
    success: 'bg-success/20 text-success',
    error: 'bg-error/20 text-error',
    warning: 'bg-warning/20 text-warning',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-xs',
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
      {children}
    </span>
  );
}
