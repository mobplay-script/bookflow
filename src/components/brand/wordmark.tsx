// Wordmark BookFlow. `light` untuk dipakai di atas panel hijau (teks krem).
export function Wordmark({
  small = false,
  light = false,
}: {
  small?: boolean;
  light?: boolean;
}) {
  const size = small ? "text-base" : "text-lg";
  const base = light ? "text-paper" : "text-ink";
  const accent = light ? "text-brass" : "text-pine";
  return (
    <span
      className={`font-display font-extrabold tracking-tight ${size} ${base} inline-flex items-center gap-1.5`}
    >
      <span
        aria-hidden
        className={`inline-block h-3.5 w-1.5 rounded-sm ${light ? "bg-brass" : "bg-pine"}`}
      />
      Book<span className={accent}>Flow</span>
    </span>
  );
}
