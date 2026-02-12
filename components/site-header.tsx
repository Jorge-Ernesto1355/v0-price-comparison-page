import { ScanSearch } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <a href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <ScanSearch className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-serif text-lg font-bold text-foreground">
            PriceScan
          </span>
        </a>
        <nav className="flex items-center gap-6">
          <span className="hidden text-sm text-muted-foreground sm:block">
            Compare prices instantly
          </span>
        </nav>
      </div>
    </header>
  );
}
