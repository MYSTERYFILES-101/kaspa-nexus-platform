interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  className = '',
  variant = 'text',
  width,
  height,
}: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-white/10 rounded';

  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
  };

  const style: React.CSSProperties = {
    width: width,
    height: height,
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
}

// Pre-built skeleton components for common use cases
export function SkeletonCard() {
  return (
    <div className="glass-card p-4 space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1 space-y-2">
          <Skeleton width="60%" height={16} />
          <Skeleton width="40%" height={12} />
        </div>
      </div>
      <Skeleton height={60} variant="rectangular" />
      <div className="flex justify-between">
        <Skeleton width="30%" height={14} />
        <Skeleton width="20%" height={14} />
      </div>
    </div>
  );
}

export function SkeletonTokenRow() {
  return (
    <div className="flex items-center gap-4 p-3 border-b border-glass-border">
      <Skeleton width={24} height={14} />
      <Skeleton variant="circular" width={32} height={32} />
      <div className="flex-1 space-y-1">
        <Skeleton width={80} height={14} />
        <Skeleton width={120} height={12} />
      </div>
      <Skeleton width={60} height={14} />
      <Skeleton width={50} height={14} />
    </div>
  );
}
