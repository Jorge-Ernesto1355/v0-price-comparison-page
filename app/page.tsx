"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SearchHero } from "@/components/search-hero";
import { ResultsSection } from "@/components/results-section";
import { SearchLoading } from "@/components/search-loading";
import type { ProductResult } from "@/app/api/search/route";


interface SearchResponse {
  query: string;
  resultCount: number;
  results: ProductResult[];
  scraped: boolean;
  originalResults?: ProductResult[];
}

export function enhanceProducts(products: ProductResult[]) {
  if (!products.length) return [];

  const cheapestPrice = Math.min(...products.map(p => p.price));

  return products.map(p => {
    const discount =
      p.originalPrice && p.originalPrice > p.price
        ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
        : 0;

    return {
      ...p,
      discount,
      isBestDeal: p.price === cheapestPrice,
    };
  });
}

export const STORE_NAMES: Record<string, string> = {
  amazon: "Amazon",
  walmart: "Walmart",
  mercadolibre: "Mercado Libre",
  target: "Target",
  aurrera: "Bodega Aurrera",
  costco: "Costco",
  liverpool: "Liverpool",
  coppel: "Coppel",
};

export default function Page() {
  const [query, setQuery] = useState<string | null>(null);
  const [selectedStores, setSelectedStores] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<SearchResponse>({
    queryKey: ["search", query],
    queryFn: async () => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query!)}`);
      const data = await res.json();
      if (!res.ok) throw new Error("Search failed");
      const enhancedResults = enhanceProducts(data.results);

       return { ...data, results: enhancedResults };

    },
    enabled: !!query,
  });

   useEffect(() => {
  if (data && data.results.length > 0) {
    const originalResults = data.originalResults || data.results;

    if(selectedStores.length === 0) {
      queryClient.setQueryData(["search", query], {
        ...data,    
        originalResults,
        results: originalResults,
      });
      return;
    }

    const filteredResults = originalResults.filter(r =>
      selectedStores.includes(r.store)
    );

    queryClient.setQueryData(["search", query], {
      ...data,
      originalResults,
      results: filteredResults,
    });
  }
}, [selectedStores]);


  

  const handleSearch = useCallback((q: string) => {
    setQuery(q);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
    
      <SiteHeader />
      <main className="flex-1">
      
        <SearchHero onSearch={handleSearch} isLoading={isLoading} />
        {isLoading && <SearchLoading />}
       
        {data && !isLoading && data.results.length > 0 && (
          <ResultsSection results={data.results} query={data.query} selectedStores={selectedStores} SelectStore={setSelectedStores} />
        )}
        {data && !isLoading && data.results.length === 0 && (
          <div className="mx-auto max-w-6xl px-4 pb-20 text-center">
            <p className="text-lg text-muted-foreground">
              no resultados encontrados&ldquo;{data.query}&rdquo;. Encuentra o busca otro producto.
            </p>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
