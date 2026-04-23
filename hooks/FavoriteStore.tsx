// store/useFavoritesStore.ts
import { ProductResult } from "@/app/api/search/route";
import { create } from "zustand";
import { persist } from "zustand/middleware";


type FavoritesState = {
  favorites: ProductResult[];
  favoritesShown: boolean;
  addFavorite: (product: ProductResult) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (product: ProductResult) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
  showFavorites: () => void;
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      favoritesShown: false,
      showFavorites: ()=> set((state) => ({favoritesShown: !state.favoritesShown})),
    
      addFavorite: (product) => {
        const exists = get().favorites.some(p => p.id === product.id);
        if (exists) return;

        set(state => ({
          favorites: [...state.favorites, product],
        }));
      },
      getFavorites: ()=> get().favorites,
      

      removeFavorite: (id) => {
        set(state => ({
          favorites: state.favorites.filter(p => p.id !== id),
        }));
      },

      toggleFavorite: (product) => {
        const exists = get().favorites.some(p => p.id === product.id);

        if (exists) {
          set(state => ({
            favorites: state.favorites.filter(p => p.id !== product.id),
          }));
        } else {
          set(state => ({
            favorites: [...state.favorites, product],
          }));
        }
      },

      isFavorite: (id) => {
        return get().favorites.some(p => p.id === id);
      },

      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: "favorite-products", // localStorage key
      
    }
  )
);