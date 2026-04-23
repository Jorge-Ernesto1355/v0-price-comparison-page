import { useState } from "react";

type Props = {
  src?: string;
  alt: string;
};

export function ProductImage({ src, alt }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const showFallback = !src || error;

  return (
    <div className="relative w-full h-44 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
      
      {/* 🧊 Skeleton */}
      {!loaded && !showFallback && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-muted via-muted/60 to-muted" />
      )}

      {/* 🖼 Image */}
      {!showFallback && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`h-full w-full object-contain p-3 transition-all duration-500 ${
            loaded ? "blur-0 scale-100 opacity-100" : "blur-md scale-105 opacity-70"
          }`}
        />
      )}

      {/* ❌ Fallback */}
      {showFallback && (
        <div className="flex flex-col items-center justify-center text-muted-foreground text-xs gap-2">
          <div className="w-12 h-12 rounded-full bg-muted-foreground/20 flex items-center justify-center">
            📦
          </div>
          <span>No image</span>
        </div>
      )}

      {/* ✨ Hover effect */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition" />
    </div>
  );
}