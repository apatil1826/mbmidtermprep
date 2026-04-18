import Link from "next/link";
import topics from "../../data/topics.json";
import connections from "../../data/connections.json";
import ImportanceBadge from "../../components/ImportanceBadge";

const relationshipColors: Record<string, string> = {
  prerequisite: "text-purple-400",
  causes: "text-rose-400",
  motivates: "text-amber-400",
  parallels: "text-cyan-400",
  tension: "text-orange-400",
  "manifests-as": "text-emerald-400",
  "leads-to": "text-blue-400",
};

export default function ConnectionsPage() {
  const topicMap: Record<string, (typeof topics)[0]> = {};
  topics.forEach((t) => {
    topicMap[t.id] = t;
  });

  const clusters = [
    {
      name: "Financial Fragility & Crises",
      ids: [
        "sources-of-financial-fragility",
        "bank-runs-modern-vs-traditional",
        "maturity-mismatch",
        "shadow-banking",
        "private-credit-turmoil",
      ],
    },
    {
      name: "Bank Operations & Regulation",
      ids: [
        "bank-liquidity-management",
        "capital-regulation",
        "banks-as-special-intermediaries",
        "deposit-insurance-moral-hazard",
        "geographic-restrictions-on-banking",
      ],
    },
    {
      name: "Structural Reform & Policy",
      ids: [
        "structural-reform-volcker-vickers-liikanen",
        "glass-steagall-conflicts-of-interest",
        "too-big-to-fail",
        "unintended-consequences",
        "accounting-firm-conflicts",
      ],
    },
    {
      name: "Macro & Central Banks",
      ids: [
        "central-bank-crisis-responses",
        "financial-development-and-growth",
        "long-term-interest-rate-trends",
        "ecb-boj-pboc-policy",
      ],
    },
    {
      name: "Money & the Future",
      ids: [
        "origin-and-functions-of-money",
        "digital-currencies-and-cbdcs",
        "supply-chain-fragilities",
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Concept Connections
        </h1>
        <p className="mt-2 text-muted max-w-2xl">
          How the major topics relate to each other. Click any topic to dive
          deep.
        </p>
      </div>

      {/* Cluster view */}
      <div className="grid gap-6 lg:grid-cols-2 mb-12">
        {clusters.map((cluster) => (
          <div
            key={cluster.name}
            className="rounded-xl border border-card-border bg-card p-5"
          >
            <h2 className="text-base font-semibold text-foreground mb-3">
              {cluster.name}
            </h2>
            <div className="space-y-2">
              {cluster.ids.map((tid) => {
                const t = topicMap[tid];
                if (!t) return null;
                return (
                  <Link
                    key={tid}
                    href={`/topics/${tid}`}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/5 transition-colors group"
                  >
                    <div
                      className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                        t.importance === "critical"
                          ? "bg-critical"
                          : t.importance === "high"
                            ? "bg-high"
                            : "bg-medium"
                      }`}
                    />
                    <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                      {t.name}
                    </span>
                    <ImportanceBadge level={t.importance} />
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* All connections */}
      <h2 className="text-xl font-semibold mb-4">All Connections</h2>
      <div className="space-y-2">
        {connections.map(
          (
            c: {
              source: string;
              target: string;
              relationship: string;
              description: string;
            },
            i: number
          ) => {
            const src = topicMap[c.source];
            const tgt = topicMap[c.target];
            if (!src || !tgt) return null;
            return (
              <div
                key={i}
                className="flex flex-wrap items-center gap-2 rounded-lg border border-card-border bg-card px-4 py-3 text-sm"
              >
                <Link
                  href={`/topics/${c.source}`}
                  className="font-medium text-foreground hover:text-accent transition-colors"
                >
                  {src.name}
                </Link>
                <span
                  className={`font-mono text-xs ${relationshipColors[c.relationship] || "text-muted"}`}
                >
                  — {c.relationship} →
                </span>
                <Link
                  href={`/topics/${c.target}`}
                  className="font-medium text-foreground hover:text-accent transition-colors"
                >
                  {tgt.name}
                </Link>
                <span className="text-xs text-muted ml-auto hidden sm:block">
                  {c.description}
                </span>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
