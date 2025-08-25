"use client";
import { useState, useRef, useEffect } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  debounceTime?: number; // Optional debounce time in ms
}

export default function SearchBar({
  placeholder = "Search...",
  onSearch,
  debounceTime = 300,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Use useEffect to handle debouncing the search query
  useEffect(() => {
    // Set up a timer that will call onSearch after the debounceTime has passed
    const timerId = setTimeout(() => {
      onSearch(query);
    }, debounceTime);

    // Return a cleanup function to clear the timer
    // This will prevent the search from happening if the user types again before the timer expires
    return () => {
      clearTimeout(timerId);
    };
  }, [query, onSearch, debounceTime]);

  // Handle the input change, simply updating the internal query state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex justify-center items-center w-full px-4 py-8">
      <div className="relative flex items-center w-full max-w-xl bg-white rounded-full shadow-md transition-all duration-300 ease-in-out hover:shadow-lg focus-within:shadow-xl">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full h-12 rounded-full px-6 text-gray-800 focus:outline-none placeholder:text-gray-400 placeholder:italic"
        />
      </div>
    </div>
  );
}
