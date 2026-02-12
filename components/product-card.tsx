import { ExternalLink, Tag, TrendingDown } from "lucide-react";
import type { ProductResult } from "@/app/api/search/route";
import { Badge } from "@/components/ui/badge";

const storeColors: Record<string, string> = {
  Amazon: "bg-[#FF9900]/10 text-[#FF9900]",
  Walmart: "bg-[#0071DC]/10 text-[#0071DC]",
  "Best Buy": "bg-[#0046BE]/10 text-[#0046BE]",
  Target: "bg-[#CC0000]/10 text-[#CC0000]",
  eBay: "bg-[#E53238]/10 text-[#E53238]",
  Newegg: "bg-[#F68B1E]/10 text-[#F68B1E]",
  "B&H Photo": "bg-[#000]/10 text-foreground",
  Costco: "bg-[#E31837]/10 text-[#E31837]",
};

export function ProductCard({
  product,
  isLowest,
  lowestPrice,
}: {
  product: ProductResult;
  isLowest: boolean;
  lowestPrice: number;
}) {
  const savings =
    !isLowest && lowestPrice > 0
      ? ((product.price - lowestPrice) / product.price) * 100
      : 0;

  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex flex-col gap-4 rounded-xl border p-5 transition-all hover:shadow-md ${
        isLowest
          ? "border-primary/40 bg-accent shadow-sm"
          : "border-border bg-card hover:border-primary/20"
      }`}
    >
      {isLowest && (
        <div className="absolute -top-3 left-4">
          <Badge className="bg-primary text-primary-foreground shadow-sm">
            <TrendingDown className="mr-1 h-3 w-3" />
            Lowest Price
          </Badge>
        </div>
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <span
              className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ${
                storeColors[product.store] ||
                "bg-secondary text-secondary-foreground"
              }`}
            >
              {product.store}
            </span>
            {!isLowest && savings > 0 && (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Tag className="h-3 w-3" />
                {savings.toFixed(0)}% more
              </span>
            )}
          </div>
          <h3 className="line-clamp-2 text-sm font-medium leading-snug text-card-foreground group-hover:text-primary">
            {product.title}
          </h3>
        </div>
        <ExternalLink className="mt-1 h-4 w-4 flex-shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      <div className="mt-auto flex items-end justify-between">
        <div>
          <p
            className={`text-2xl font-bold tracking-tight ${
              isLowest ? "text-primary" : "text-card-foreground"
            }`}
          >
            {product.currency}
            {product.price.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <span className="text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
          Visit store
        </span>
      </div>
    </a>
  );
}
