"use client";

import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
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
}

export default function Page() {
  const [query, setQuery] = useState<string | null>(null);

  const { data, isLoading } = useQuery<SearchResponse>({
    queryKey: ["search", query],
    queryFn: async () => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query!)}`);
      if (!res.ok) throw new Error("Search failed");
      return res.json();
    },
    enabled: !!query,
  });

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
          <ResultsSection results={data.results} query={data.query} />
        )}
        {data && !isLoading && data.results.length === 0 && (
          <div className="mx-auto max-w-6xl px-4 pb-20 text-center">
            <p className="text-lg text-muted-foreground">
              No results found for &ldquo;{data.query}&rdquo;. Try a different
              search term.
            </p>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
