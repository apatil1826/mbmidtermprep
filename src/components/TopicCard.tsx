import Link from "next/link";
import ImportanceBadge from "./ImportanceBadge";
import WeekBadge from "./WeekBadge";

interface Topic {
  id: string;
  name: string;
  shortDescription: string;
  importance: string;
  week: number | number[];
  relatedTopics?: string[];
}

export default function TopicCard({ topic }: { topic: Topic }) {
  const weeks = Array.isArray(topic.week) ? topic.week : [topic.week];
  const borderColor: Record<string, string> = {
    critical: "hover:border-critical/40",
    high: "hover:border-high/40",
    medium: "hover:border-medium/40",
  };

  return (
    <Link
      href={`/topics/${topic.id}`}
      className={`group block rounded-xl border border-card-border bg-card p-5 transition-all duration-200 hover:bg-white/[0.03] ${borderColor[topic.importance] || ""} focus:outline-none focus:ring-2 focus:ring-accent/50`}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="text-base font-semibold text-foreground group-hover:text-accent transition-colors leading-snug">
          {topic.name}
        </h3>
        <ImportanceBadge level={topic.importance} />
      </div>
      <p className="mb-4 text-sm leading-relaxed text-muted">
        {topic.shortDescription}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {weeks.map((w) => (
          <WeekBadge key={w} week={w} />
        ))}
      </div>
    </Link>
  );
}
