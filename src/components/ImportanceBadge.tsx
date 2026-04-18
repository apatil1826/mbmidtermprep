export default function ImportanceBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    critical: "bg-critical/15 text-critical border-critical/30",
    high: "bg-high/15 text-high border-high/30",
    medium: "bg-medium/15 text-medium border-medium/30",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${colors[level] || colors.medium}`}
    >
      {level}
    </span>
  );
}
