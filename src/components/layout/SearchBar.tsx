"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "@/components/ui/icons";

export default function SearchBar({
  initialQuery = "",
}: {
  initialQuery?: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search");
  }

  return (
    <form onSubmit={handleSubmit} role="search" className="relative max-w-xl">
      <label htmlFor="search-query" className="sr-only">
        Search the collection
      </label>
      <SearchIcon
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone"
        aria-hidden="true"
      />
      <input
        id="search-query"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name, maker, or material…"
        autoComplete="off"
        className="w-full border border-beige bg-ivory py-3.5 pl-12 pr-28 text-sm text-espresso placeholder:text-stone/60 focus:border-gold focus:outline-none"
      />
      <button
        type="submit"
        className="absolute right-0 top-0 h-full bg-gold px-6 text-xs font-semibold uppercase tracking-[0.15em] text-ivory transition-colors duration-200 hover:bg-gold-dark"
      >
        Search
      </button>
    </form>
  );
}
