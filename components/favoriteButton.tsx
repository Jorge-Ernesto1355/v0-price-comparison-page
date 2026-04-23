"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Particle {
  angle: number;
  color: string;
  size: number;
  dist: number;
  shape: "circle" | "square" | "star";
}

interface FavoriteButtonProps {
  /** Initial favourited state */
  defaultFaved?: boolean;
  /** Callback when state changes */
  onChange?: (faved: boolean) => void;
  /** Size of the button in px (default 44) */
  size?: number;
  onClick?: (e:any) => void;
}

// ─── Particle config ─────────────────────────────────────────────────────────

const PARTICLES: Particle[] = [
  { angle: -70,  color: "#ff4d8c", size: 7, dist: 50, shape: "circle" },
  { angle: -40,  color: "#ffb347", size: 5, dist: 56, shape: "square" },
  { angle: -10,  color: "#ff4d8c", size: 8, dist: 52, shape: "circle" },
  { angle:  20,  color: "#c084fc", size: 5, dist: 54, shape: "star"   },
  { angle:  50,  color: "#ff6ad5", size: 7, dist: 48, shape: "circle" },
  { angle:  80,  color: "#ffb347", size: 4, dist: 58, shape: "square" },
  { angle: 110,  color: "#ff4d8c", size: 6, dist: 50, shape: "circle" },
  { angle: 140,  color: "#c084fc", size: 5, dist: 54, shape: "star"   },
  { angle: 170,  color: "#ff6ad5", size: 8, dist: 50, shape: "circle" },
  { angle: 200,  color: "#ffb347", size: 4, dist: 56, shape: "square" },
  { angle: 230,  color: "#ff4d8c", size: 6, dist: 48, shape: "circle" },
  { angle: 260,  color: "#c084fc", size: 5, dist: 52, shape: "star"   },
  { angle: 290,  color: "#ff6ad5", size: 7, dist: 54, shape: "circle" },
  { angle: 320,  color: "#ffb347", size: 5, dist: 50, shape: "square" },
  { angle: 350,  color: "#ff4d8c", size: 6, dist: 48, shape: "circle" },
];

const STAR_ANGLES = [0, 72, 144, 216, 288];

const RINGS = [
  { delay: 0,    size: 52, borderColor: "rgba(255,77,140,0.7)"  },
  { delay: 0.07, size: 72, borderColor: "rgba(192,132,252,0.4)" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const toRad = (deg: number) => (deg * Math.PI) / 180;

function particleXY(angle: number, dist: number) {
  return {
    x: Math.cos(toRad(angle)) * dist,
    y: Math.sin(toRad(angle)) * dist,
  };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function HeartSVG({ filled }: { filled: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <motion.path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        animate={{
          fill: filled ? "#ff4d8c" : "transparent",
          stroke: filled
            ? "#ff4d8c"          // same color when filled
            : "rgba(167, 166, 166, 0.9)", // 👈 strong visible border when not filled
          strokeWidth: filled ? 1.5 : 2, // 👈 thicker when not filled
        }}
        transition={{ duration: 0.2 }}
        strokeLinecap="round"
        style={{
  filter: !filled ? "drop-shadow(0 0 3px rgba(255,255,255,0.8))" : "none"
}}
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Ring({ delay, size, borderColor }: (typeof RINGS)[0]) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width:       size,
        height:      size,
        top:         "50%",
        left:        "50%",
        marginLeft:  -(size / 2),
        marginTop:   -(size / 2),
        border:      `2px solid ${borderColor}`,
      }}
      initial={{ scale: 0.3, opacity: 1 }}
      animate={{ scale: 1, opacity: 0 }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    />
  );
}

function Dot({ p, index }: { p: Particle; index: number }) {
  const { x, y } = particleXY(p.angle, p.dist);
  const delay     = index * 0.018;

  const shapeStyle: React.CSSProperties =
    p.shape === "circle"
      ? { borderRadius: "50%" }
      : p.shape === "square"
      ? { borderRadius: 2, transform: "rotate(45deg)" }
      : {
          clipPath:
            "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
        };

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        width:      p.size,
        height:     p.size,
        top:        "50%",
        left:       "50%",
        marginLeft: -(p.size / 2),
        marginTop:  -(p.size / 2),
        background: p.color,
        boxShadow:  `0 0 ${p.size + 4}px ${p.color}`,
        ...shapeStyle,
      }}
      initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
      animate={{ x, y, scale: 0, opacity: 0 }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.1, 0.8, 0.2, 1],
      }}
    />
  );
}

function Star({ angle, index }: { angle: number; index: number }) {
  const dist      = 38;
  const { x, y } = particleXY(angle, dist);
  const delay     = 0.05 + index * 0.04;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        width:      6,
        height:     6,
        top:        "50%",
        left:       "50%",
        marginLeft: -3,
        marginTop:  -3,
        background: "#fff",
        clipPath:
          "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
        boxShadow: "0 0 6px #fff",
      }}
      initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
      animate={{ x, y, scale: 1.5, opacity: 0, rotate: 72 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.1, 0.8, 0.2, 1],
      }}
    />
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function FavoriteButton({
  defaultFaved = false,
  onChange,
  onClick,
  size = 44,
}: FavoriteButtonProps) {
  const [faved,    setFaved]    = useState(defaultFaved);
  const [burstKey, setBurstKey] = useState<number | null>(null);

  const handleClick = (e:any) => {
    const next = !faved;
    setFaved(next);
    onChange?.(next);
    onClick?.(e);

    if (next) {
      setBurstKey(Date.now());
    }
  };

  return (
    /* Wrapper gives the overflow:visible context for particles */
    <div className="relative" style={{ width: size, height: size }}>
      {/* Button */}
      <motion.button
      
        onClick={(e)=> {
            e.preventDefault();
            e.stopPropagation()
            handleClick(e);  
        }}  
        whileTap={{ scale: 0.82 }}
        whileHover={{ scale: 1.08 }}
        animate={faved ? { scale: [1, 1.3, 1] } : { scale: 1 }}
        transition={
          faved
            ? { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }
            : { type: "spring", stiffness: 400, damping: 20 }
        }
        className="relative z-10 flex items-center justify-center rounded-full backdrop-blur-md"
        style={{
          width:      size,
          height:     size,
          background: "rgba(255,255,255,0.12)",
          border:     "0.5px solid rgba(255,255,255,0.12)",
          cursor:     "pointer",
          outline:    "none",
        }}
        aria-label={faved ? "Remove from favorites" : "Add to favorites"}
        aria-pressed={faved}
      >
        <HeartSVG filled={faved} />
      </motion.button>

      {/* Burst layer – absolutely positioned, pointer-events:none */}
      <AnimatePresence>
        {burstKey !== null && (
          <div
            key={burstKey}
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 20, overflow: "visible" }}
          >
            {/* Expanding rings */}
            {RINGS.map((r, i) => (
              <Ring key={i} {...r} />
            ))}

            {/* Colored dots */}
            {PARTICLES.map((p, i) => (
              <Dot key={i} p={p} index={i} />
            ))}

            {/* White sparkle stars */}
            {STAR_ANGLES.map((ang, i) => (
              <Star key={i} angle={ang} index={i} />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Usage example ────────────────────────────────────────────────────────────
//
//  import FavoriteButton from "@/components/FavoriteButton";
//
//  <FavoriteButton
//    defaultFaved={product.isFavorited}
//    onChange={(faved) => toggleFavorite(product.id, faved)}
//    size={44}
//  />
//
// Place this inside a `position: relative` parent for correct overflow.
// The burst particles overflow the button bounds intentionally.