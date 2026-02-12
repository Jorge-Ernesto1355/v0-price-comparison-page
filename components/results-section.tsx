"use client";

import { ArrowDownUp, Store } from "lucide-react";
import type { ProductResult } from "@/app/api/search/route";
import { ProductCard } from "@/components/product-card";
import { useState } from "react";

type SortBy = "price-asc" | "price-desc" | "store";

export function ResultsSection({
  results,
  query,
}: {
  results: ProductResult[];
  query: string;
}) {
  const [sortBy, setSortBy] = useState<SortBy>("price-asc");

  const sorted = [...results].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return a.store.localeCompare(b.store);
  });

  const lowestPrice = sorted.length > 0 ? Math.min(...sorted.map((r) => r.price)) : 0;
  const highestPrice = sorted.length > 0 ? Math.max(...sorted.map((r) => r.price)) : 0;
  const savings = highestPrice - lowestPrice;

  return (
    <section className="mx-auto max-w-6xl px-4 pb-20">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">
            Results for &ldquo;{query}&rdquo;
          </h2>
          <p className="text-sm text-muted-foreground">
            Found {results.length} offers from {new Set(results.map((r) => r.store)).size}{" "}
            stores
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="sr-only">
            Sort by
          </label>
          <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="rounded-lg border border-input bg-card px-3 py-2 text-sm text-card-foreground outline-none ring-ring focus:ring-2"
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="store">Store Name</option>
          </select>
        </div>
      </div>

      {savings > 0 && (
        <div className="mb-8 flex items-center gap-4 rounded-xl border border-primary/20 bg-accent p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <Store className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              You could save up to{" "}
              <span className="text-primary">
                ${savings.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </p>
            <p className="text-xs text-muted-foreground">
              Price difference between the cheapest and most expensive option
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((product, i) => (
          <ProductCard
            key={`${product.store}-${i}`}
            product={product}
            isLowest={product.price === lowestPrice}
            lowestPrice={lowestPrice}
          />
        ))}
      </div>
    </section>
  );
}
