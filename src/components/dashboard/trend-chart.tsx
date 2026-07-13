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

// Satu hue (indigo) — single series, satu sumbu. Toggle metrik & rentang tidak
// menambah sumbu kedua (menghindari anti-pattern dual-axis).
const ACCENT = "#4f46e5";
const GRID = "#e2e8f0";
const AXIS = "#94a3b8";

type Metric = "revenue" | "bookings";
type Range = 7 | 30;

const toggleBtn = (active: boolean) =>
  `rounded-md px-2.5 py-1 text-xs font-medium transition ${
    active
      ? "bg-slate-900 text-white"
      : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
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
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-md">
      <div className="font-medium text-slate-500">{label}</div>
      <div className="mt-0.5 font-semibold text-slate-900">
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
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-slate-900">
          Tren {metric === "revenue" ? "revenue" : "booking"}
        </h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5 rounded-lg bg-slate-100 p-0.5">
            <button className={toggleBtn(metric === "revenue")} onClick={() => setMetric("revenue")}>
              Revenue
            </button>
            <button className={toggleBtn(metric === "bookings")} onClick={() => setMetric("bookings")}>
              Booking
            </button>
          </div>
          <div className="flex items-center gap-0.5 rounded-lg bg-slate-100 p-0.5">
            <button className={toggleBtn(range === 7)} onClick={() => setRange(7)}>
              7 hari
            </button>
            <button className={toggleBtn(range === 30)} onClick={() => setRange(30)}>
              30 hari
            </button>
          </div>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sliced} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={ACCENT} stopOpacity={0.18} />
                <stop offset="100%" stopColor={ACCENT} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={GRID} strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: AXIS }}
              tickLine={false}
              axisLine={{ stroke: GRID }}
              minTickGap={16}
            />
            <YAxis
              tick={{ fontSize: 11, fill: AXIS }}
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
              activeDot={{ r: 4, strokeWidth: 2, stroke: "#fff" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
