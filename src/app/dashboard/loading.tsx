export default function DashboardLoading() {
  return (
    <div className="space-y-8">
      <div className="h-8 w-48 animate-pulse rounded bg-hair" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-24 animate-pulse rounded-xl border border-hair bg-card"
          />
        ))}
      </div>
      <div className="h-64 animate-pulse rounded-xl border border-hair bg-card" />
    </div>
  );
}
