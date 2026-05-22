"use client";

import { BarChart, Users, Kanban, Activity } from "lucide-react";
import { ActivityTimeline } from "@/components/activity-timeline";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 2000 },
  { name: 'Apr', revenue: 2780 },
  { name: 'May', revenue: 1890 },
  { name: 'Jun', revenue: 2390 },
  { name: 'Jul', revenue: 3490 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Dashboard</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Revenue", value: "$45,231.89", icon: BarChart, trend: "+20.1% from last month" },
          { title: "Active Leads", value: "2,350", icon: Users, trend: "+180 new leads" },
          { title: "Open Deals", value: "124", icon: Kanban, trend: "4 closing this week" },
          { title: "Team Activity", value: "98%", icon: Activity, trend: "Attendance today" },
        ].map((stat, i) => (
          <div key={i} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</h3>
              <stat.icon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</span>
            </div>
            <p className="mt-1 text-xs text-indigo-600 dark:text-indigo-400">{stat.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Revenue Analytics</h3>
          <div className="mt-4 h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dx={-10} tickFormatter={(value) => `$${value}`} />
                <Tooltip cursor={{stroke: '#e5e7eb', strokeWidth: 1}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} dot={false} activeDot={{r: 6, fill: '#4f46e5'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="col-span-3">
          <ActivityTimeline />
        </div>
      </div>
    </div>
  );
}
