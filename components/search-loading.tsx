import { Skeleton } from "@/components/ui/skeleton";

const stores = ["Amazon", "Walmart", "Best Buy", "Target", "eBay", "Newegg"];

export function SearchLoading() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20">
      <div className="mb-6">
        <Skeleton className="mb-2 h-7 w-64" />
        <Skeleton className="h-4 w-48" />
      </div>

      <div className="mb-8 flex items-center gap-4 rounded-xl border border-border bg-card p-4">
        <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-muted">
          <div className="absolute inset-0 animate-pulse bg-primary/20" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">
            Scanning stores for the best prices...
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {stores.map((store, i) => (
              <span
                key={store}
                className="inline-flex animate-pulse items-center rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                {store}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <Skeleton className="mb-2 h-5 w-20" />
                <Skeleton className="mb-1 h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
            <Skeleton className="mt-auto h-8 w-24" />
          </div>
        ))}
      </div>
    </section>
  );
}
