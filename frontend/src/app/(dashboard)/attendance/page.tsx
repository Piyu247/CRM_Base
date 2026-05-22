"use client";

import { useState } from "react";
import { Clock, CheckCircle2, XCircle, AlertCircle, Timer, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

const teamMembers = [
  { id: 1, name: "Sarah Chen", role: "Product Manager", avatar: "https://avatar.vercel.sh/sarah", status: "present", checkIn: "8:45 AM", checkOut: "—", hours: "5h 15m" },
  { id: 2, name: "Alex Rivera", role: "Full Stack Developer", avatar: "https://avatar.vercel.sh/alex", status: "present", checkIn: "9:02 AM", checkOut: "—", hours: "4h 58m" },
  { id: 3, name: "Jordan Patel", role: "UX Designer", avatar: "https://avatar.vercel.sh/jordan", status: "late", checkIn: "10:15 AM", checkOut: "—", hours: "3h 45m" },
  { id: 4, name: "Emily Watson", role: "Marketing Lead", avatar: "https://avatar.vercel.sh/emily", status: "absent", checkIn: "—", checkOut: "—", hours: "—" },
  { id: 5, name: "Michael Lee", role: "Data Analyst", avatar: "https://avatar.vercel.sh/michael", status: "present", checkIn: "8:30 AM", checkOut: "—", hours: "5h 30m" },
  { id: 6, name: "Nina Torres", role: "DevOps Engineer", avatar: "https://avatar.vercel.sh/nina", status: "present", checkIn: "9:00 AM", checkOut: "—", hours: "5h 0m" },
];

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  present: { label: "Present", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/30", icon: <CheckCircle2 className="h-4 w-4" /> },
  late: { label: "Late", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/30", icon: <AlertCircle className="h-4 w-4" /> },
  absent: { label: "Absent", color: "text-red-500 dark:text-red-400", bg: "bg-red-50 dark:bg-red-900/30", icon: <XCircle className="h-4 w-4" /> },
};

export default function AttendancePage() {
  const [clockedIn, setClockedIn] = useState(false);

  const presentCount = teamMembers.filter(m => m.status === "present").length;
  const lateCount = teamMembers.filter(m => m.status === "late").length;
  const absentCount = teamMembers.filter(m => m.status === "absent").length;

  const stats = [
    { label: "Present", value: presentCount, icon: <UserCheck className="h-5 w-5" />, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/30" },
    { label: "Late", value: lateCount, icon: <Clock className="h-5 w-5" />, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/30" },
    { label: "Absent", value: absentCount, icon: <XCircle className="h-5 w-5" />, color: "text-red-500 dark:text-red-400", bg: "bg-red-50 dark:bg-red-900/30" },
    { label: "Avg Hours", value: "7.2h", icon: <Timer className="h-5 w-5" />, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-900/30" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Attendance</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Track your team's attendance and working hours.</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setClockedIn(!clockedIn)}
          className={`flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold shadow-sm transition-all ${
            clockedIn
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-emerald-500 text-white hover:bg-emerald-600"
          }`}
        >
          <Clock className="h-4 w-4" />
          {clockedIn ? "Clock Out" : "Clock In"}
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</span>
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${stat.bg} ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Team Table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950 overflow-hidden"
      >
        <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Today's Attendance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Check In</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Check Out</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Hours</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {teamMembers.map((member, i) => {
                const sc = statusConfig[member.status];
                return (
                  <motion.tr
                    key={member.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={member.avatar} alt={member.name} className="h-9 w-9 rounded-full border border-gray-200 dark:border-gray-700" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{member.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{member.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${sc.bg} ${sc.color}`}>
                        {sc.icon} {sc.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{member.checkIn}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{member.checkOut}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{member.hours}</td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
