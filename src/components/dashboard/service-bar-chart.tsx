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

const ACCENT = "#4f46e5";
const GRID = "#e2e8f0";
const AXIS = "#94a3b8";

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
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-md">
      <div className="font-semibold text-slate-900">{s.name}</div>
      <div className="mt-0.5 text-slate-500">{s.bookings} booking</div>
      <div className="text-slate-500">{formatRupiah(s.revenue)} revenue</div>
    </div>
  );
}

export function ServiceBarChart({ data }: { data: ServiceStat[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-base font-semibold text-slate-900">
        Layanan terpopuler
      </h2>
      {data.length === 0 ? (
        <p className="py-12 text-center text-sm text-slate-400">Belum ada data.</p>
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
                tick={{ fontSize: 11, fill: AXIS }}
                tickLine={false}
                axisLine={{ stroke: GRID }}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 12, fill: "#475569" }}
                tickLine={false}
                axisLine={false}
                width={110}
              />
              <Tooltip content={<ServiceTooltip />} cursor={{ fill: "#f1f5f9" }} />
              <Bar dataKey="bookings" fill={ACCENT} radius={[0, 4, 4, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
