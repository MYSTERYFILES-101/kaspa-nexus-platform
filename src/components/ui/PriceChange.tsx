interface PriceChangeProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export function PriceChange({
  value,
  size = 'md',
  showIcon = true,
  className = '',
}: PriceChangeProps) {
  const isPositive = value >= 0;
  const colorClass = isPositive ? 'text-positive' : 'text-negative';

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const formattedValue = `${isPositive ? '+' : ''}${value.toFixed(2)}%`;

  return (
    <span className={`inline-flex items-center gap-0.5 font-medium ${colorClass} ${sizeClasses[size]} ${className}`}>
      {showIcon && (
        <svg
          className={`w-3 h-3 ${isPositive ? '' : 'rotate-180'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      )}
      {formattedValue}
    </span>
  );
}
