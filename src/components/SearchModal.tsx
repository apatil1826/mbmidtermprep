"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import searchIndex from "../data/search-index.json";

interface SearchItem {
  type: string;
  title: string;
  content: string;
  link: string;
  topicId?: string;
}

export default function SearchModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const fuse = useMemo(
    () =>
      new Fuse(searchIndex as SearchItem[], {
        keys: [
          { name: "title", weight: 2 },
          { name: "content", weight: 1 },
        ],
        threshold: 0.35,
        includeMatches: true,
        minMatchCharLength: 2,
      }),
    []
  );

  const results = query.length >= 2 ? fuse.search(query, { limit: 20 }) : [];

  const grouped = {
    topic: results.filter((r) => r.item.type === "topic"),
    reading: results.filter((r) => r.item.type === "reading"),
    term: results.filter((r) => r.item.type === "term"),
    concept: results.filter((r) => r.item.type === "concept"),
  };

  const flatResults = [
    ...grouped.topic,
    ...grouped.reading,
    ...grouped.term,
    ...grouped.concept,
  ];

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [open]);

  const navigate = useCallback(
    (link: string) => {
      setOpen(false);
      router.push(link);
    },
    [router]
  );

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx((i) => Math.min(i + 1, flatResults.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && flatResults[selectedIdx]) {
      navigate(flatResults[selectedIdx].item.link);
    }
  };

  if (!open) {
    return (
      <button
        onClick={handleOpen}
        className="flex items-center gap-2 rounded-lg border border-card-border bg-card px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent/30 hover:text-foreground"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden rounded bg-white/5 px-1.5 py-0.5 text-xs text-muted sm:inline">
          ⌘K
        </kbd>
      </button>
    );
  }

  const typeLabels: Record<string, string> = {
    topic: "Topics",
    reading: "Readings",
    term: "Terms",
    concept: "Concepts",
  };

  let runningIdx = -1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-[15vh] backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-xl rounded-xl border border-card-border bg-[#1a1a1a] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-card-border px-4 py-3">
          <svg
            className="h-5 w-5 text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIdx(0);
            }}
            onKeyDown={handleInputKeyDown}
            placeholder="Search topics, readings, terms..."
            className="flex-1 bg-transparent text-foreground placeholder:text-muted/60 focus:outline-none"
          />
          <kbd
            className="cursor-pointer rounded bg-white/5 px-2 py-0.5 text-xs text-muted"
            onClick={handleClose}
          >
            ESC
          </kbd>
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {query.length < 2 && (
            <p className="px-3 py-6 text-center text-sm text-muted">
              Type to search across all topics, readings, and terms...
            </p>
          )}
          {query.length >= 2 && flatResults.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-muted">
              No results found.
            </p>
          )}
          {(["topic", "reading", "term", "concept"] as const).map((type) => {
            const items = grouped[type];
            if (items.length === 0) return null;
            return (
              <div key={type} className="mb-2">
                <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted/70">
                  {typeLabels[type]}
                </div>
                {items.map((result) => {
                  runningIdx++;
                  const idx = runningIdx;
                  return (
                    <button
                      key={result.item.link + result.item.title}
                      className={`w-full rounded-lg px-3 py-2 text-left transition-colors ${
                        idx === selectedIdx
                          ? "bg-accent/10 text-accent"
                          : "text-foreground hover:bg-white/5"
                      }`}
                      onClick={() => navigate(result.item.link)}
                      onMouseEnter={() => setSelectedIdx(idx)}
                    >
                      <div className="text-sm font-medium truncate">
                        {result.item.title}
                      </div>
                      <div className="text-xs text-muted truncate mt-0.5">
                        {result.item.content.slice(0, 100)}
                        {result.item.content.length > 100 ? "..." : ""}
                      </div>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
