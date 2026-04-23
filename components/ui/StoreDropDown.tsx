"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { STORE_CONFIG } from "../product-card";
import { STORE_NAMES } from "@/app/page";


export function StoreDropdown({
  selectedStores,
  setSelectedStores,
}: any) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    function handleClickOutside(e: any) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleStore = (store: string) => {
    setSelectedStores((prev: string[]) =>
      prev.includes(store)
        ? prev.filter((s) => s !== store)
        : [...prev, store]
    );
  };

  return (
    <div className="relative w-64" ref={ref}>
      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full border rounded-lg px-3 py-2 flex justify-between items-center bg-white shadow-sm"
      >
        <span className="text-sm">
          {selectedStores.length === 0
            ? "All stores"
            : `${selectedStores.length} selected`}
        </span>

        {/* 🔄 Animated arrow */}
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
            transition={{ duration: 0.2, ease: "easeOut",  }}
            className="absolute z-50 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-64 overflow-y-auto origin-top"
          >
            {/* OPTIONAL CONTROLS */}
            <div className="flex justify-between px-3 py-2 border-b text-xs">
              <button
                onClick={() =>
                  setSelectedStores(Object.keys(STORE_CONFIG))
                }
              >
                Select All
              </button>

              <button onClick={() => setSelectedStores([])}>
                Clear
              </button>
            </div>

            {/* STORE LIST */}
            {Object.keys(STORE_CONFIG).map((store) => {
              const config = STORE_CONFIG[store];
              const isSelected = selectedStores.includes(store);

              return (
                <motion.div
                  key={store}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => toggleStore(store)}
                  className={`flex items-center gap-2 px-3 py-2 cursor-pointer
                    transition-colors hover:bg-gray-100
                    ${isSelected ? "bg-gray-100" : ""}
                  `}
                >
                  {/* LOGO */}
                  <div className="h-6 w-6 flex items-center justify-center">
                    <img
                      src={config.logo}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* NAME */}
                  <span className="text-sm flex-1">
                    {STORE_NAMES[store]}
                  </span>

                  {/* CHECK */}
                  {isSelected && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-green-600 text-xs font-bold"
                    >
                      ✓
                    </motion.span>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}