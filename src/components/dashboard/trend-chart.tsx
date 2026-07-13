"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TrendPoint } from "@/lib/analytics";
import { formatRupiah } from "@/lib/format";

// Single series → satu hue pine. Toggle metrik & rentang tidak menambah sumbu.
const ACCENT = "#163f33";
const GRID = "#e4dcc9";
const AXIS = "#9a9080";

type Metric = "revenue" | "bookings";
type Range = 7 | 30;

const toggleBtn = (active: boolean) =>
  `rounded-md px-2.5 py-1 text-xs font-semibold transition ${
    active ? "bg-pine text-paper" : "text-muted hover:text-ink"
  }`;

function TrendTooltip({
  active,
  payload,
  label,
  metric,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
  metric: Metric;
}) {
  if (!active || !payload?.length) return null;
  const value = payload[0].value;
  return (
    <div className="rounded-lg border border-hair bg-card px-3 py-2 text-xs shadow-md">
      <div className="tnum text-muted">{label}</div>
      <div className="mt-0.5 tnum font-bold text-ink">
        {metric === "revenue" ? formatRupiah(value) : `${value} booking`}
      </div>
    </div>
  );
}

export function TrendChart({ data }: { data: TrendPoint[] }) {
  const [metric, setMetric] = useState<Metric>("revenue");
  const [range, setRange] = useState<Range>(7);

  const sliced = data.slice(-range);
  const dataKey = metric === "revenue" ? "revenue" : "bookings";

  return (
    <div className="rounded-xl border border-hair bg-card p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow">Tren</p>
          <h2 className="font-display text-base font-semibold text-ink">
            {metric === "revenue" ? "Revenue" : "Jumlah booking"} · {range} hari
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5 rounded-lg border border-hair p-0.5">
            <button className={toggleBtn(metric === "revenue")} onClick={() => setMetric("revenue")}>
              Revenue
            </button>
            <button className={toggleBtn(metric === "bookings")} onClick={() => setMetric("bookings")}>
              Booking
            </button>
          </div>
          <div className="flex items-center gap-0.5 rounded-lg border border-hair p-0.5">
            <button className={toggleBtn(range === 7)} onClick={() => setRange(7)}>
              7h
            </button>
            <button className={toggleBtn(range === 30)} onClick={() => setRange(30)}>
              30h
            </button>
          </div>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sliced} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={ACCENT} stopOpacity={0.16} />
                <stop offset="100%" stopColor={ACCENT} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={GRID} strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: AXIS, fontFamily: "var(--font-mono)" }}
              tickLine={false}
              axisLine={{ stroke: GRID }}
              minTickGap={16}
            />
            <YAxis
              tick={{ fontSize: 11, fill: AXIS, fontFamily: "var(--font-mono)" }}
              tickLine={false}
              axisLine={false}
              width={48}
              tickFormatter={(v: number) =>
                metric === "revenue"
                  ? v >= 1000
                    ? `${Math.round(v / 1000)}rb`
                    : String(v)
                  : String(v)
              }
            />
            <Tooltip
              content={<TrendTooltip metric={metric} />}
              cursor={{ stroke: AXIS, strokeDasharray: "3 3" }}
            />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={ACCENT}
              strokeWidth={2}
              fill="url(#trendFill)"
              dot={false}
              activeDot={{ r: 4, strokeWidth: 2, stroke: "#fbfaf6" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
