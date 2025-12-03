import { Skeleton } from '@/components/ui/Skeleton';

export default function TokenDetailLoading() {
  return (
    <div className="py-4 md:py-6 lg:py-8 animate-in fade-in duration-300">
      {/* Back Button */}
      <Skeleton className="h-8 w-32 mb-6" />

      {/* Banner */}
      <Skeleton className="w-full aspect-[21/9] mb-6 rounded-2xl" variant="rectangular" />

      {/* Token Header */}
      <div className="glass-card p-6 mb-6">
        <div className="flex items-center gap-4">
          <Skeleton className="w-16 h-16 rounded-full" variant="circular" />
          <div className="flex-1">
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-10 w-40" />
          </div>
          <div className="text-right">
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="glass-card p-4">
            <Skeleton className="h-3 w-20 mb-2" />
            <Skeleton className="h-6 w-24" />
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="xl:col-span-2 space-y-6">
          {/* Chart */}
          <div className="glass-card p-6">
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-64 w-full" variant="rectangular" />
          </div>

          {/* Token Info */}
          <div className="glass-card p-6">
            <Skeleton className="h-6 w-40 mb-4" />
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="glass-card p-4">
            <Skeleton className="h-5 w-24 mb-4" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-4">
            <Skeleton className="h-5 w-32 mb-4" />
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
