import React, { useState, useRef, useEffect } from "react";
import { Search as SearchIcon} from "lucide-react";

const sampleProducts: string[] = [
  "iPhone 16 Pro",
  "Samsung Galaxy S25",
  "MacBook Air M3",
  "Sony Headphones",
  "IKEA Sofa",
  "Nike Air Max",
  "iPad Pro",
  "Gaming Monitor",
  "Laptop",
  "Laptop Gamer",
  "Laptop Gaming RGB",
  "Laptop Ultrabook",
  "Laptop Business",
  "Console PlayStation 5",
  "Console Xbox Series X",
  "Console Nintendo Switch",
  "TV 4K",
  "TV OLED",
  "iPhone 15 Pro",
  "Samsung Galaxy Z Fold",
  "MacBook Pro",
  "Sony WH-1000XM5",
  "Nike Sneakers",
];

const AutocompleteInput: React.FC<{ onSearch: (value: string) => void; query: string }> = ({ onSearch, query }) => {
  const [inputValue, setInputValue] = useState<string>(query    || "");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  console.log(isOpen)

  useEffect(() => {
    if (inputValue.trim().length > 0) {
      const filtered = sampleProducts.filter((product) =>
        product.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filtered);
      setIsOpen(filtered.length > 0);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
    setSelectedIndex(-1);
  }, [inputValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          setInputValue(suggestions[selectedIndex]);
          setIsOpen(false);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setIsOpen(false);
    onSearch(suggestion);
    setSuggestions([]);
     inputRef.current?.blur();
    
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;

    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span
          key={index}
          className="text-green-500 font-bold bg-green-500/10 px-1 rounded"
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className=" flex items-start justify-center  ">
      <div className="relative w-full max-w-2xl">
        {/* Input */}
        <div className="relative flex items-center bg-white/95 rounded-2xl shadow-lg backdrop-blur-md transition hover:shadow-xl focus-within:shadow-xl">
           <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() =>
              inputValue && setIsOpen(suggestions.length > 0)
            }
            placeholder="Busca un producto, marca o categoría..."
            className="h-14 w-full rounded-xl border border-input bg-card pl-12 pr-4 text-base text-card-foreground shadow-sm outline-none ring-ring transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-offset-2 focus:ring-offset-background"
            aria-label="Search products"
          />

          {inputValue && (
            <button
              onClick={() => {
                setInputValue("");
                setIsOpen(false);
                inputRef.current?.focus();
              }}
              className="absolute right-3 w-8 h-8 flex items-center justify-center rounded-full bg-green-500/10 text-green-500 hover:bg-green-500/20 transition"
            >
              ×
            </button>
          )}
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute w-full mt-2 bg-white rounded-2xl shadow-xl overflow-hidden z-50"
          >
            <div className="px-4 py-2 text-xs font-semibold text-green-500 uppercase border-b">
              {suggestions.length} results
            </div>

            <ul className="max-h-80 overflow-y-auto p-2">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() =>
                    handleSuggestionClick(suggestion)
                    
                  }
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition ${
                    index === selectedIndex
                      ? "bg-green-100"
                      : "hover:bg-green-100 "
                  }`}
                >
                  <SearchIcon size={16} className="text-green-400" />
                  <span>
                    {highlightMatch(suggestion, inputValue)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AutocompleteInput;