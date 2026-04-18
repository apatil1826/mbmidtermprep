"use client";

import { useState } from "react";
import Link from "next/link";
import WeekBadge from "./WeekBadge";

interface Reading {
  id: string;
  title: string;
  author: string;
  source: string;
  week: number;
  type: string;
  required: boolean;
  summary: string;
  keyPoints: string[];
  relevantTopicIds: string[];
  examRelevance: string;
}

export default function ReadingCard({
  reading,
  topicNames,
}: {
  reading: Reading;
  topicNames: Record<string, string>;
}) {
  const [expanded, setExpanded] = useState(false);

  const typeBg: Record<string, string> = {
    academic: "bg-purple-500/15 text-purple-400 border-purple-500/30",
    speech: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    news: "bg-sky-500/15 text-sky-400 border-sky-500/30",
    report: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  };

  return (
    <div className="rounded-lg border border-card-border bg-card overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-5 py-4 text-left flex items-start gap-3 hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <WeekBadge week={reading.week} />
            <span
              className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium capitalize ${typeBg[reading.type] || typeBg.news}`}
            >
              {reading.type}
            </span>
            {reading.required && (
              <span className="inline-flex items-center rounded-full bg-critical/10 border border-critical/30 px-2 py-0.5 text-xs font-medium text-critical">
                Required
              </span>
            )}
          </div>
          <h3 className="text-sm font-semibold text-foreground leading-snug">
            {reading.title}
          </h3>
          <p className="text-xs text-muted mt-0.5">
            {reading.author} &middot; {reading.source}
          </p>
        </div>
        <svg
          className={`h-5 w-5 text-muted shrink-0 transition-transform mt-1 ${expanded ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {expanded && (
        <div className="border-t border-card-border px-5 py-4 space-y-4">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
              Summary
            </h4>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {reading.summary}
            </p>
          </div>
          {reading.keyPoints.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                Key Points
              </h4>
              <ul className="space-y-1">
                {reading.keyPoints.map((point, i) => (
                  <li
                    key={i}
                    className="text-sm text-foreground/80 leading-relaxed flex gap-2"
                  >
                    <span className="text-accent shrink-0">-</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {reading.examRelevance && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                Exam Relevance
              </h4>
              <p className="text-sm text-high/90 leading-relaxed">
                {reading.examRelevance}
              </p>
            </div>
          )}
          {reading.relevantTopicIds.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                Related Topics
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {reading.relevantTopicIds.map((tid) => (
                  <Link
                    key={tid}
                    href={`/topics/${tid}`}
                    className="rounded-md bg-accent/10 border border-accent/20 px-2 py-0.5 text-xs text-accent hover:bg-accent/20 transition-colors"
                  >
                    {topicNames[tid] || tid}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
