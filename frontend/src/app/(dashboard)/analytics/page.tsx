"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, Users, Target, Zap } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell
} from "recharts";

const revenueData = [
  { name: "Jan", revenue: 18500, deals: 12 },
  { name: "Feb", revenue: 22300, deals: 18 },
  { name: "Mar", revenue: 19800, deals: 14 },
  { name: "Apr", revenue: 27100, deals: 22 },
  { name: "May", revenue: 31000, deals: 28 },
  { name: "Jun", revenue: 28500, deals: 24 },
  { name: "Jul", revenue: 35200, deals: 31 },
];

const leadSourceData = [
  { name: "Organic Search", value: 35, color: "#6366f1" },
  { name: "Social Media", value: 25, color: "#8b5cf6" },
  { name: "Referral", value: 20, color: "#06b6d4" },
  { name: "Email Campaign", value: 12, color: "#f59e0b" },
  { name: "Direct", value: 8, color: "#10b981" },
];

const conversionData = [
  { name: "Mon", rate: 12 },
  { name: "Tue", rate: 18 },
  { name: "Wed", rate: 15 },
  { name: "Thu", rate: 22 },
  { name: "Fri", rate: 28 },
  { name: "Sat", rate: 14 },
  { name: "Sun", rate: 8 },
];

const metrics = [
  { label: "Total Revenue", value: "$182,400", change: "+12.5%", up: true, icon: <DollarSign className="h-5 w-5" />, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/30" },
  { label: "New Leads", value: "1,284", change: "+8.2%", up: true, icon: <Users className="h-5 w-5" />, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-900/30" },
  { label: "Conversion Rate", value: "24.8%", change: "-2.1%", up: false, icon: <Target className="h-5 w-5" />, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-900/30" },
  { label: "Deals Closed", value: "149", change: "+18.7%", up: true, icon: <Zap className="h-5 w-5" />, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/30" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Analytics</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Track performance and gain actionable insights.</p>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{m.label}</span>
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${m.bg} ${m.color}`}>{m.icon}</div>
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{m.value}</p>
            <div className="mt-1 flex items-center gap-1 text-xs">
              {m.up ? <TrendingUp className="h-3 w-3 text-emerald-500" /> : <TrendingDown className="h-3 w-3 text-red-500" />}
              <span className={m.up ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"}>{m.change}</span>
              <span className="text-gray-400">vs last month</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Revenue Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="col-span-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Overview</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Monthly revenue breakdown</p>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
                  formatter={(value: any) => [`$${value.toLocaleString()}`, "Revenue"]}
                />
                <Bar dataKey="revenue" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Lead Source Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="col-span-3 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Lead Sources</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Where your leads come from</p>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={leadSourceData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                  {leadSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
                  formatter={(value: any) => [`${value}%`, "Share"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 space-y-2">
            {leadSourceData.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-gray-600 dark:text-gray-400">{s.name}</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">{s.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Conversion Rate Trend */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Conversion Rate Trend</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Daily conversion rates this week</p>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={conversionData} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
              <defs>
                <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} tickFormatter={(v) => `${v}%`} />
              <Tooltip
                contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
                formatter={(value: any) => [`${value}%`, "Conversion"]}
              />
              <Area type="monotone" dataKey="rate" stroke="#8b5cf6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRate)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
