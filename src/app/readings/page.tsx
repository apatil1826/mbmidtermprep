"use client";

import { useState } from "react";
import readings from "../../data/readings.json";
import topics from "../../data/topics.json";
import ReadingCard from "../../components/ReadingCard";

export default function ReadingsPage() {
  const [weekFilter, setWeekFilter] = useState<number | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [requiredOnly, setRequiredOnly] = useState(false);

  const topicNames: Record<string, string> = {};
  topics.forEach((t) => {
    topicNames[t.id] = t.name;
  });

  const types = [...new Set(readings.map((r) => r.type))];

  const filtered = readings.filter((r) => {
    if (weekFilter !== null && r.week !== weekFilter) return false;
    if (typeFilter !== null && r.type !== typeFilter) return false;
    if (requiredOnly && !r.required) return false;
    return true;
  });

  const groupedByWeek: Record<number, typeof readings> = {};
  filtered.forEach((r) => {
    if (!groupedByWeek[r.week]) groupedByWeek[r.week] = [];
    groupedByWeek[r.week].push(r);
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Reading Library
        </h1>
        <p className="mt-2 text-muted">
          All assigned readings for Weeks 1-4, with summaries and exam
          relevance.
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
        {[1, 2, 3, 4].map((w) => (
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
          Type:
        </span>
        <button
          onClick={() => setTypeFilter(null)}
          className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
            typeFilter === null
              ? "bg-accent/15 text-accent border border-accent/30"
              : "bg-white/5 text-muted border border-white/10 hover:text-foreground"
          }`}
        >
          All
        </button>
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setTypeFilter(typeFilter === t ? null : t)}
            className={`rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-colors ${
              typeFilter === t
                ? "bg-accent/15 text-accent border border-accent/30"
                : "bg-white/5 text-muted border border-white/10 hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}

        <button
          onClick={() => setRequiredOnly(!requiredOnly)}
          className={`ml-3 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
            requiredOnly
              ? "bg-critical/15 text-critical border border-critical/30"
              : "bg-white/5 text-muted border border-white/10 hover:text-foreground"
          }`}
        >
          Required Only
        </button>
      </div>

      <div className="text-xs text-muted mb-4">
        {filtered.length} of {readings.length} readings
      </div>

      {Object.keys(groupedByWeek)
        .sort((a, b) => Number(a) - Number(b))
        .map((week) => (
          <div key={week} className="mb-8">
            <h2 className="text-lg font-semibold mb-3 text-foreground">
              Week {week}
            </h2>
            <div className="space-y-2">
              {groupedByWeek[Number(week)].map((reading) => (
                <ReadingCard
                  key={reading.id}
                  reading={reading}
                  topicNames={topicNames}
                />
              ))}
            </div>
          </div>
        ))}

      {filtered.length === 0 && (
        <p className="py-12 text-center text-muted">
          No readings match your filters.
        </p>
      )}
    </div>
  );
}
