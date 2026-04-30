import { ExternalLink, Tag, TrendingDown } from "lucide-react";
import type { ProductResult } from "@/app/api/search/route";
import { Badge } from "@/components/ui/badge";
import FavoriteButton from "./favoriteButton";
import { sileo } from "sileo";
import { useFavoritesStore } from "@/hooks/FavoriteStore";
import { ProductImage } from "./ui/ProductImage";
import StarRating from "./ui/Rating";



type StoreConfig = {
  logo: string;
  color: string;
};

export const STORE_CONFIG: Record<string, StoreConfig> = {
  amazon: {
    logo: "https://imgs.search.brave.com/we4J9Nce1CapScBva4Ygw_EXcYv5Jcson02x0CePSjs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE2LzEw/L0FtYXpvbi1Mb2dv/LTIwMDAtNTAweDI4/MS5wbmc",
    color: "#FF9900",
  },
  walmart: {
    logo: "https://imgs.search.brave.com/K5ss7ZLCMcJdko1VuSAeLeKClYqmp6nm7igtm_kGTjE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy1tYXJjYXMuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDIx/LzExL1dhbG1hcnQt/TG9nby02NTB4MzY2/LnBuZw",
    color: "#0071CE",
  },
  mercadolibre: {
    logo: "https://imgs.search.brave.com/o4oxhmbFyszxhjOJJL3CWqgCzAAbyR_zZRh8gvfmeBg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bG9nby53aW5lL2Ev/bG9nby9NZXJjYWRv/TGlicmUvTWVyY2Fk/b0xpYnJlLUxvZ28u/d2luZS5zdmc",
    color: "#FFE600",
  },
  target: {
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Target_logo.svg",
    color: "#CC0000",
  },
  aurrera: {
    logo: "https://imgs.search.brave.com/aF-9uiL2odfNnMr4nhQT0VOm07dsecWNkQsrfDaRuhk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzUwLzIvYm9kZWdh/LWF1cnJlcmEtbG9n/by1wbmdfc2Vla2xv/Z28tNTA0ODc5LnBu/Zw",
    color: "#2E7D32",
  },
  costco: {
    logo: "https://imgs.search.brave.com/e9CQbyArAzpo8UWkl53MJfA-msXbqdxMZ6xM6y34IJw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE3LzA4/L0Nvc3Rjby1Mb2dv/LTE5OTMtNzAweDM5/NC5wbmc",
    color: "#C8102E",
  },
  liverpool: {
    logo: "https://imgs.search.brave.com/s3ungnCbDHA8bBuf9Am2bM1UQLuMCDXCkDMrxS_j-M8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzI1LzIvbGl2ZXJw/b29sLWxvZ28tcG5n/X3NlZWtsb2dvLTI1/MjcwMC5wbmc",
    color: "#E10098",
  },
  coppel: {
    logo:"https://imgs.search.brave.com/4qa9iW_pMwO2I8RSlYS3gtKMof_1vv07jfXzEFNXI9c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuY2RubG9nby5j/b20vbG9nb3MvYy8x/OC9jb3BwZWxfdGh1/bWIucG5n",
    color: "#FFD600",
  },
}; 

function getStoreConfig(store: string): StoreConfig {
  return STORE_CONFIG[store] || {
    logo: "https://via.placeholder.com/80?text=Store",
    color: "#999",
  };
}

export function ProductCard({
  product,
  isLowest,
  lowestPrice,
  
}: {
  product: ProductResult;
  isLowest: boolean;
  lowestPrice: number;
 
}) {

   const { toggleFavorite, isFavorite } = useFavoritesStore();

    const storeConfig = getStoreConfig(product.store);
    
  const savings =
    !isLowest && lowestPrice > 0
      ? ((product.price - lowestPrice) / product.price) * 100
      : 0;

      console.log(product.url)
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
            <div className="h-10 flex items-center justify-center">
  <img
    src={storeConfig.logo}
    alt={product.store}
    className="max-h-full max-w-full object-contain"
  />
</div>
         
           
            {!isLowest && savings > 0 && (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Tag className="h-3 w-3" />
                {savings.toFixed(0)}% more
              </span>
            )}
          </div>
           {/* 🖼 IMAGE HERE */}
  <div className="relative w-full h-44 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
    <ProductImage src={product.imageUrl} alt={product.title} />
  </div>
          <h3 className="line-clamp-2 text-sm font-medium leading-snug text-card-foreground group-hover:text-primary pt-10">
            {product.title}
          </h3>

        </div>
        
        <FavoriteButton  size={32} defaultFaved={isFavorite(product.id)} onClick={(e) => {  
            e.preventDefault();
            e.stopPropagation();
            if(!isFavorite(product.id)) {
              sileo.success({title: "Added to favorites", description: product.title,});
            } else {
              sileo.info({title: "Removed from favorites", description: product.title,});
            }

            toggleFavorite(product);  
            
        }} />

        
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
           <StarRating value={product.rating} />
        </div>
        
        <span className="text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
          Visit store
        </span>
      </div>
    </a>
  );
}
