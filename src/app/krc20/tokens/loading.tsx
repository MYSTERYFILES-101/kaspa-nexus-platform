import { Skeleton } from '@/components/ui/Skeleton';

export default function TokensLoading() {
  return (
    <div className="py-4 md:py-6 lg:py-8 animate-in fade-in duration-300">
      {/* Banner */}
      <Skeleton className="w-full aspect-[21/9] mb-6 rounded-2xl" variant="rectangular" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-8 w-28 rounded-full" />
      </div>

      {/* Filters */}
      <div className="glass-card p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-48" />
        </div>
      </div>

      {/* Token Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="glass-card p-4">
            <div className="flex items-start gap-3 mb-3">
              <Skeleton className="w-10 h-10 rounded-full" variant="circular" />
              <div className="flex-1">
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <Skeleton className="h-6 w-24 mb-3" />
            <div className="grid grid-cols-2 gap-2">
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
