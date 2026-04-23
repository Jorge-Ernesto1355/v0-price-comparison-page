"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type SortBy = "price-asc" | "price-desc";

const OPTIONS: { value: SortBy; label: string }[] = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export function SortDropdown({
  sortBy,
  setSortBy,
}: {
  sortBy: string;
  setSortBy: (v: SortBy) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close outside click
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel =
    OPTIONS.find((o) => o.value === sortBy)?.label ||
    "Sort";

  return (
    <div className="relative w-56" ref={ref}>
      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full rounded-lg border px-3 py-2 flex justify-between items-center bg-white shadow-sm text-sm"
      >
        <span>{selectedLabel}</span>

        {/* Animated arrow */}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ▾
        </motion.span>
      </button>

      {/* DROPDOWN */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 mt-2 w-full bg-white border rounded-lg shadow-lg overflow-hidden"
          >
            {OPTIONS.map((option) => {
              const isActive = sortBy === option.value;

              return (
                <motion.div
                  key={option.value}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setSortBy(option.value);
                    setOpen(false);
                  }}
                  className={`
                    px-3 py-2 text-sm cursor-pointer transition-colors
                    hover:bg-gray-100
                    ${isActive ? "bg-gray-100 font-medium" : ""}
                  `}
                >
                  <div className="flex justify-between items-center">
                    {option.label}

                    {isActive && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-green-600 text-xs"
                      >
                        ✓
                      </motion.span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}