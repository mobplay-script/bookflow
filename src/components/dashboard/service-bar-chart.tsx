"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ServiceStat } from "@/lib/analytics";
import { formatRupiah } from "@/lib/format";

const ACCENT = "#163f33";
const GRID = "#e4dcc9";
const AXIS = "#9a9080";

function ServiceTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: ServiceStat }>;
}) {
  if (!active || !payload?.length) return null;
  const s = payload[0].payload;
  return (
    <div className="rounded-lg border border-hair bg-card px-3 py-2 text-xs shadow-md">
      <div className="font-semibold text-ink">{s.name}</div>
      <div className="mt-0.5 tnum text-muted">{s.bookings} booking</div>
      <div className="tnum text-muted">{formatRupiah(s.revenue)}</div>
    </div>
  );
}

export function ServiceBarChart({ data }: { data: ServiceStat[] }) {
  return (
    <div className="rounded-xl border border-hair bg-card p-5">
      <p className="eyebrow">Paling laku</p>
      <h2 className="mb-4 font-display text-base font-semibold text-ink">
        Layanan terpopuler
      </h2>
      {data.length === 0 ? (
        <p className="py-12 text-center text-sm text-faint">Belum ada data.</p>
      ) : (
        <div style={{ height: Math.max(140, data.length * 44) }} className="w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 4, right: 16, left: 8, bottom: 4 }}
              barCategoryGap="28%"
            >
              <CartesianGrid stroke={GRID} strokeDasharray="3 3" horizontal={false} />
              <XAxis
                type="number"
                allowDecimals={false}
                tick={{ fontSize: 11, fill: AXIS, fontFamily: "var(--font-mono)" }}
                tickLine={false}
                axisLine={{ stroke: GRID }}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 12, fill: "#4c463a" }}
                tickLine={false}
                axisLine={false}
                width={110}
              />
              <Tooltip content={<ServiceTooltip />} cursor={{ fill: "#efe9db" }} />
              <Bar dataKey="bookings" fill={ACCENT} radius={[0, 4, 4, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
