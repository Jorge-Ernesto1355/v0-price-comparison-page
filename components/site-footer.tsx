export function SiteFooter() {
  const stores = [
    "Amazon",
    "Walmart",
    "Best Buy",
    "Target",
    "eBay",
    "Newegg",
    "B&H Photo",
    "Costco",
  ];

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8 text-center">
          <h3 className="mb-2 text-sm font-semibold text-foreground">
            Tiendas escaneadas
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {stores.map((store) => (
              <span
                key={store}
                className="rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground"
              >
                {store}
              </span>
            ))}
          </div>
        </div>
        <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
          <p>
            DashScan  is a price comparison tool built with Next.js, React Query, and Tailwind CSS. It scrapes prices from multiple online stores to help you find the best deals. This project is open source on{" "}
             
           
          </p>
        </div>
      </div>
    </footer>
  );
}
