import Link from "next/link";
import topics from "../../../data/topics.json";
import readings from "../../../data/readings.json";
import topicReadingMap from "../../../data/topic-reading-map.json";
import connections from "../../../data/connections.json";
import ImportanceBadge from "../../../components/ImportanceBadge";
import WeekBadge from "../../../components/WeekBadge";

export function generateStaticParams() {
  return topics.map((t) => ({ id: t.id }));
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const topicIdx = topics.findIndex((t) => t.id === id);
  const topic = topics[topicIdx];

  if (!topic) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Topic not found</h1>
        <Link href="/" className="mt-4 inline-block text-accent hover:underline">
          Back to topics
        </Link>
      </div>
    );
  }

  const weeks = Array.isArray(topic.week) ? topic.week : [topic.week];
  const prevTopic = topicIdx > 0 ? topics[topicIdx - 1] : null;
  const nextTopic = topicIdx < topics.length - 1 ? topics[topicIdx + 1] : null;

  const mappings = topicReadingMap.filter(
    (m: { topicId: string }) => m.topicId === topic.id
  );
  const topicReadings = mappings
    .map((m: { readingId: string; contribution: string }) => {
      const reading = readings.find((r) => r.id === m.readingId);
      return reading ? { ...reading, contribution: m.contribution } : null;
    })
    .filter(Boolean) as (typeof readings[0] & { contribution: string })[];

  const relatedConnections = connections.filter(
    (c: { source: string; target: string }) =>
      c.source === topic.id || c.target === topic.id
  );

  const topicNameMap: Record<string, string> = {};
  topics.forEach((t) => {
    topicNameMap[t.id] = t.name;
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted hover:text-accent transition-colors"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        All Topics
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <ImportanceBadge level={topic.importance} />
          {weeks.map((w) => (
            <WeekBadge key={w} week={w} />
          ))}
          {topic.practiceQuestionIds && topic.practiceQuestionIds.length > 0 && (
            <span className="text-xs text-muted">
              Practice Q: {topic.practiceQuestionIds.join(", ")}
            </span>
          )}
        </div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {topic.name}
        </h1>
      </div>

      {/* Summary */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3 text-foreground">
          What You Need to Know
        </h2>
        <div className="prose-sm text-foreground/85 leading-relaxed space-y-3">
          {topic.summary.split("\n\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* Definitions */}
      {topic.definitions && topic.definitions.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-foreground">
            Key Definitions
          </h2>
          <div className="space-y-3">
            {topic.definitions.map((d, i) => (
              <div
                key={i}
                className="rounded-lg border border-card-border bg-card p-4"
              >
                <dt className="text-sm font-semibold text-accent">{d.term}</dt>
                <dd className="mt-1 text-sm text-foreground/80 leading-relaxed">
                  {d.definition}
                </dd>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* What the Readings Say */}
      {topicReadings.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-foreground">
            What the Readings Say
          </h2>
          <div className="space-y-3">
            {topicReadings.map((r, i) => (
              <div
                key={i}
                className="rounded-lg border border-card-border bg-card p-4"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div>
                    <span className="text-sm font-semibold text-foreground">
                      {r.author}
                    </span>
                    <span className="text-sm text-muted"> — {r.title}</span>
                  </div>
                  <span className="shrink-0 rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-xs text-muted capitalize">
                    {r.contribution}
                  </span>
                </div>
                <p className="text-sm text-foreground/75 leading-relaxed">
                  {r.summary}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Agreement & Disagreement */}
      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        {topic.agreements && topic.agreements.length > 0 && (
          <section className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
            <h2 className="text-sm font-semibold mb-2 text-emerald-400">
              Points of Agreement
            </h2>
            <ul className="space-y-2">
              {topic.agreements.map((a, i) => (
                <li key={i} className="text-sm text-foreground/80 leading-relaxed flex gap-2">
                  <span className="text-emerald-400 shrink-0">+</span>
                  {a}
                </li>
              ))}
            </ul>
          </section>
        )}
        {topic.disagreements && topic.disagreements.length > 0 && (
          <section className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-4">
            <h2 className="text-sm font-semibold mb-2 text-rose-400">
              Points of Disagreement
            </h2>
            <ul className="space-y-2">
              {topic.disagreements.map((d, i) => (
                <li key={i} className="text-sm text-foreground/80 leading-relaxed flex gap-2">
                  <span className="text-rose-400 shrink-0">-</span>
                  {d}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* Connected Topics */}
      {relatedConnections.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-foreground">
            Connected Topics
          </h2>
          <div className="space-y-2">
            {relatedConnections.map((c, i) => {
              const otherId =
                c.source === topic.id ? c.target : c.source;
              const direction = c.source === topic.id ? "outgoing" : "incoming";
              return (
                <Link
                  key={i}
                  href={`/topics/${otherId}`}
                  className="flex items-center gap-3 rounded-lg border border-card-border bg-card p-3 hover:bg-white/[0.03] transition-colors group"
                >
                  <span className="text-sm font-medium text-accent group-hover:underline">
                    {topicNameMap[otherId] || otherId}
                  </span>
                  <span className="text-xs text-muted">
                    {direction === "outgoing" ? "→" : "←"}{" "}
                    {c.relationship}: {c.description}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Exam Strategy */}
      {topic.examTips && (
        <section className="mb-8 rounded-lg border border-high/20 bg-high/5 p-5">
          <h2 className="text-lg font-semibold mb-3 text-high">
            Exam Strategy
          </h2>
          {topic.examTips.howProfessorAsks && (
            <div className="mb-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                How the Professor Might Ask This
              </h3>
              <p className="text-sm text-foreground/85 leading-relaxed">
                {topic.examTips.howProfessorAsks}
              </p>
            </div>
          )}
          {topic.examTips.strongAnswerStructure && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                What a Strong Answer Looks Like
              </h3>
              <p className="text-sm text-foreground/85 leading-relaxed">
                {topic.examTips.strongAnswerStructure}
              </p>
            </div>
          )}
        </section>
      )}

      {/* Prev / Next */}
      <div className="flex items-center justify-between pt-6 border-t border-card-border">
        {prevTopic ? (
          <Link
            href={`/topics/${prevTopic.id}`}
            className="text-sm text-muted hover:text-accent transition-colors"
          >
            ← {prevTopic.name}
          </Link>
        ) : (
          <span />
        )}
        {nextTopic ? (
          <Link
            href={`/topics/${nextTopic.id}`}
            className="text-sm text-muted hover:text-accent transition-colors"
          >
            {nextTopic.name} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
