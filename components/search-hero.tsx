"use client";

import { Search } from "lucide-react";
import { useState, type FormEvent } from "react";

const suggestions = [
  "iPhone 16 Pro",
  "Samsung Galaxy S25",
  "MacBook Air M3",
  "Sony Headphones",
  "IKEA Sofa",
  "Nike Air Max",
  "iPad Pro",
  "Gaming Monitor",
];

export function SearchHero({
  onSearch,
  isLoading,
}: {
  onSearch: (query: string) => void;
  isLoading: boolean;
}) {
  const [query, setQuery] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  }

  return (
    <section className="flex flex-col items-center gap-8 px-4 py-16 md:py-24">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
          <span className="inline-block h-2 w-2 rounded-full bg-primary" />
          Compare prices across stores
        </div>
        <h1 className="max-w-3xl text-balance font-serif text-4xl font-bold tracking-tight text-foreground md:text-6xl">
          Find the lowest price for{" "}
          <span className="text-primary">anything</span>
        </h1>
        <p className="max-w-xl text-pretty text-lg text-muted-foreground">
          Search any product and we'll scan multiple online stores to find you
          the best deal. Stop overpaying.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-2xl items-center gap-2"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for any product..."
            className="h-14 w-full rounded-xl border border-input bg-card pl-12 pr-4 text-base text-card-foreground shadow-sm outline-none ring-ring transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-offset-2 focus:ring-offset-background"
            aria-label="Search products"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="h-14 rounded-xl bg-primary px-8 text-base font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isLoading ? "Scanning..." : "Search"}
        </button>
      </form>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-sm text-muted-foreground">Popular:</span>
        {suggestions.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setQuery(item);
              onSearch(item);
            }}
            className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {item}
          </button>
        ))}
      </div>
    </section>
  );
}
