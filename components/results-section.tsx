"use client";

import { ArrowDownUp, Store } from "lucide-react";
import { ProductResult } from "@/app/api/search/route";
import { ProductCard } from "@/components/product-card";
import { useState } from "react";
import { StoreDropdown } from "./ui/StoreDropDown";
import { SortDropdown } from "./FilterByPrice";

type SortBy = "price-asc" | "price-desc" | "store";
import { motion } from "framer-motion";
import { useFavoritesStore } from "@/hooks/FavoriteStore";



export  function FavoritesButton() {

  const {favorites, showFavorites, isFavorite} = useFavoritesStore();
  const isActive = favorites.length > 0  ;
  const handleClick = () => {
    
    showFavorites();
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        flex items-center gap-2 px-4 py-2 
        rounded-full border 
        text-sm font-medium
        shadow-sm transition
        ${  isActive
           
            ? "bg-red-50 text-red-500 border-red-300"
            : "bg-white text-gray-800 hover:bg-gray-100"
        }
      `}
    >
     <motion.span
  animate={{ scale: isActive ? [1, 1.3, 1] : 1 }}
  transition={{ duration: 0.3 }}
  className="text-lg"
>
  {isActive ? "❤️" : "🤍"}
</motion.span>

      Favoritos

      {favorites.length > 0 && (
        <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          {favorites.length}
        </span>
      )}
    </motion.button>
  );
}

export function ResultsSection({
  results,
  query,
  selectedStores,
  SelectStore,
}: {
  results: ProductResult[];
  query: string;
  selectedStores: string[];
  SelectStore: (stores: string[]) => void;
}) {
  const [sortBy, setSortBy] = useState<SortBy>("price-asc");
  
  const {favorites, favoritesShown} = useFavoritesStore();

    
  

  const sorted = [...results].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return a.store.localeCompare(b.store);
  });
  

  const lowestPrice = sorted.length > 0 ? Math.min(...sorted.map((r) => r.price)) : 0;
  const highestPrice = sorted.length > 0 ? Math.max(...sorted.map((r) => r.price)) : 0;
  const savings = highestPrice - lowestPrice;

 const {showFavorites} = useFavoritesStore();

  

  return (
    <section className="mx-auto max-w-6xl px-4 pb-20">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">
            Resultados para  &ldquo;{query}&rdquo;
          </h2>
          <p className="text-sm text-muted-foreground">
            {results.length} articulos  Encontrados  donde  {new Set(results.map((r) => r.store)).size}{" "}
            tiendas diferentes te los ofrecen
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="sr-only">
            Ordenado por
          </label>
          <FavoritesButton/>
          <StoreDropdown selectedStores={selectedStores} setSelectedStores={SelectStore} />
          <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
          <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
        </div>
      </div>

      {savings > 0 && (
        <div className="mb-8 flex items-center gap-4 rounded-xl border border-primary/20 bg-accent p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <Store className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Puedes ahorrar hasta{" "}
              <span className="text-primary">
                ${savings.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </p>
            <p className="text-xs text-muted-foreground">
              Basado en el precio más alto y más bajo encontrado para tu búsqueda.
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 min-h-[60vh]">
  {favoritesShown ? (
    favorites.length > 0 ? (
      favorites.map((product) => (
        <ProductCard
          key={`${product.store}-${product.id}`}
          product={product}
          isLowest={product.price === lowestPrice}
          lowestPrice={lowestPrice}
        />
      ))
    ) : (
      <div className="col-span-full flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-violet-100 text-4xl mb-5">
          💔
        </div>

        <h3 className="text-xl font-semibold text-gray-800">
          No tienes favorites todavia.
        </h3>

        <p className="text-gray-500 mt-2 max-w-md leading-relaxed">
            Guarda tus ofertas favoritas para acceder a ellas fácilmente desde esta sección.  
              
        </p>

        <button onClick={showFavorites} className="mt-6 px-6 py-2.5 rounded-full bg-violet-500 text-white text-sm font-medium hover:bg-violet-600 transition shadow-md">
          Explorar ofertas
        </button>
      </div>
    )
  ) : (
    sorted.map((product, i) => (
      <ProductCard
        key={`${product.store}-${i}`}
        product={product}
        isLowest={product.price === lowestPrice}
        lowestPrice={lowestPrice}
      />
    ))
  )}
</div>
    </section>
  );
}
