"use client";

import { useState } from "react";
import topics from "../data/topics.json";
import TopicCard from "../components/TopicCard";

const importanceOrder: Record<string, number> = {
  critical: 0,
  high: 1,
  medium: 2,
};

export default function Home() {
  const [weekFilter, setWeekFilter] = useState<number | null>(null);
  const [importanceFilter, setImportanceFilter] = useState<string | null>(null);

  const filtered = topics
    .filter((t) => {
      if (weekFilter !== null) {
        const weeks = Array.isArray(t.week) ? t.week : [t.week];
        if (!weeks.includes(weekFilter)) return false;
      }
      if (importanceFilter !== null && t.importance !== importanceFilter)
        return false;
      return true;
    })
    .sort(
      (a, b) =>
        (importanceOrder[a.importance] ?? 9) -
        (importanceOrder[b.importance] ?? 9)
    );

  const weeks = [1, 2, 3, 4];
  const levels = ["critical", "high", "medium"];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Money &amp; Banking Midterm
        </h1>
        <p className="mt-2 text-muted max-w-2xl">
          Interactive study tool for BUSN 33401 — Weeks 1-4. Topics are ranked
          by predicted exam importance based on the practice midterm,
          assignments, and class notes.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted mr-1">
          Week:
        </span>
        <button
          onClick={() => setWeekFilter(null)}
          className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
            weekFilter === null
              ? "bg-accent/15 text-accent border border-accent/30"
              : "bg-white/5 text-muted border border-white/10 hover:text-foreground"
          }`}
        >
          All
        </button>
        {weeks.map((w) => (
          <button
            key={w}
            onClick={() => setWeekFilter(weekFilter === w ? null : w)}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              weekFilter === w
                ? "bg-accent/15 text-accent border border-accent/30"
                : "bg-white/5 text-muted border border-white/10 hover:text-foreground"
            }`}
          >
            W{w}
          </button>
        ))}
        <span className="ml-3 text-xs font-semibold uppercase tracking-wider text-muted mr-1">
          Level:
        </span>
        <button
          onClick={() => setImportanceFilter(null)}
          className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
            importanceFilter === null
              ? "bg-accent/15 text-accent border border-accent/30"
              : "bg-white/5 text-muted border border-white/10 hover:text-foreground"
          }`}
        >
          All
        </button>
        {levels.map((l) => (
          <button
            key={l}
            onClick={() =>
              setImportanceFilter(importanceFilter === l ? null : l)
            }
            className={`rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-colors ${
              importanceFilter === l
                ? "bg-accent/15 text-accent border border-accent/30"
                : "bg-white/5 text-muted border border-white/10 hover:text-foreground"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-muted">
          No topics match your filters.
        </p>
      )}

      <div className="mt-6 text-center text-xs text-muted">
        {filtered.length} of {topics.length} topics shown
      </div>
    </div>
  );
}
