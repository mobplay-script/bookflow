export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-hair bg-card p-5">
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-brass" />
        <p className="eyebrow">{label}</p>
      </div>
      <p className="mt-3 tnum text-[26px] font-bold leading-none text-ink">
        {value}
      </p>
      {hint && <p className="mt-1.5 text-xs text-faint">{hint}</p>}
    </div>
  );
}
