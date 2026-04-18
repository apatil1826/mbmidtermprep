export default function WeekBadge({ week }: { week: number }) {
  return (
    <span className="inline-flex items-center rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-xs font-medium text-muted">
      W{week}
    </span>
  );
}
