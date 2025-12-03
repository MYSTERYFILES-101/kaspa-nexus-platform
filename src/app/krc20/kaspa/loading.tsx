import { Skeleton } from '@/components/ui/Skeleton';

export default function KaspaLoading() {
  return (
    <div className="py-4 md:py-6 lg:py-8 animate-in fade-in duration-300">
      {/* Banner */}
      <Skeleton className="w-full aspect-[21/9] mb-6 rounded-2xl" variant="rectangular" />

      {/* Token Header */}
      <div className="glass-card p-6 mb-6">
        <div className="flex items-center gap-4">
          <Skeleton className="w-16 h-16 rounded-full" variant="circular" />
          <div>
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-4 w-56" />
          </div>
        </div>
      </div>

      {/* Live Data Badge */}
      <div className="flex items-center justify-end gap-3 mb-6">
        <Skeleton className="h-8 w-28 rounded-full" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="xl:col-span-3 space-y-6">
          {/* Price Widget */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-4 mb-6">
              <Skeleton className="w-16 h-16 rounded-full" variant="circular" />
              <div>
                <Skeleton className="h-6 w-24 mb-2" />
                <Skeleton className="h-10 w-40" />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass-card p-4">
                  <Skeleton className="h-3 w-16 mb-2" />
                  <Skeleton className="h-6 w-20" />
                </div>
              ))}
            </div>
          </div>

          {/* Network Stats */}
          <div className="glass-card p-6">
            <Skeleton className="h-6 w-48 mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="glass-card p-4">
                  <Skeleton className="h-3 w-20 mb-2" />
                  <Skeleton className="h-8 w-24" />
                </div>
              ))}
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="glass-card p-6">
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-64 w-full" variant="rectangular" />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="glass-card p-4">
            <Skeleton className="h-5 w-24 mb-4" />
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-4">
            <Skeleton className="h-5 w-24 mb-4" />
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
