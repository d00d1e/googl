import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

import { useStateContext } from "../contexts/Context";
import Links from "./Links";

export default function Search() {
  const [query, setQuery] = useState("Elon Musk");
  const { setSearchQuery } = useStateContext();
  const [debouncedValue] = useDebounce(query, 1000);

  useEffect(() => {
    if (debouncedValue) setSearchQuery(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className="relative sm:ml-48 md:ml-72 sm:-mt-10 mt-3">
      <input
        className="sm:w-96 w-100 h-10 dark:bg-gray-200 border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <button
          type="button"
          className="absolute top-1.5 right-4 text-2xl text-gray-500"
          onClick={() => setQuery("")}
        >
          x
        </button>
      )}
      <Links />
    </div>
  );
}
