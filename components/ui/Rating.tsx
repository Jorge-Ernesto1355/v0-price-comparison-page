import { useState } from "react";
import { motion } from "framer-motion";

type StarRatingProps = {
  value?: number; // valor inicial
  onChange?: (value: number) => void; // callback
  size?: number; // tamaño de estrella
};

export default function StarRating({
  value = 0,
  onChange,
  size = 24,
}: StarRatingProps) {
  const [rating, setRating] = useState<number>(value);
  const [hover, setHover] = useState<number>(0);

  const handleClick = (val: number) => {
    setRating(val);
    onChange?.(val);
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= (hover || rating);

        return (
          <motion.span
            key={star}
            onClick={() => handleClick(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            whileTap={{ scale: 0.85 }}
            whileHover={{ scale: 1.2 }}
            className={`cursor-pointer transition ${
              isActive ? "text-yellow-400" : "text-gray-300"
            }`}
            style={{ fontSize: size }}
          >
            ★
          </motion.span>
        );
      })}
    </div>
  );
}