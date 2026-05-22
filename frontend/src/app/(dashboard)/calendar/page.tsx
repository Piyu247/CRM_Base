"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  color: string;
  day: number;
}

const mockEvents: CalendarEvent[] = [
  { id: "1", title: "Team Standup", time: "9:00 AM", color: "bg-indigo-500", day: 5 },
  { id: "2", title: "Client Call — Acme Corp", time: "11:30 AM", color: "bg-emerald-500", day: 8 },
  { id: "3", title: "Sprint Review", time: "2:00 PM", color: "bg-purple-500", day: 12 },
  { id: "4", title: "Design Workshop", time: "10:00 AM", color: "bg-amber-500", day: 15 },
  { id: "5", title: "Sales Pipeline Review", time: "3:30 PM", color: "bg-rose-500", day: 19 },
  { id: "6", title: "Product Demo", time: "1:00 PM", color: "bg-cyan-500", day: 22 },
  { id: "7", title: "Board Meeting", time: "4:00 PM", color: "bg-indigo-500", day: 26 },
];

export default function CalendarPage() {
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const today = now.getDate();
  const isCurrentMonth = now.getMonth() === currentMonth && now.getFullYear() === currentYear;

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  const blanks = Array.from({ length: firstDay }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const dayEvents = (day: number) => mockEvents.filter(e => e.day === day);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Calendar</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Schedule and manage your events.</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors">
          <Plus className="h-4 w-4" /> New Event
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {MONTHS[currentMonth]} {currentYear}
          </h2>
          <div className="flex items-center gap-2">
            <button onClick={prevMonth} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => { setCurrentMonth(now.getMonth()); setCurrentYear(now.getFullYear()); }}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900/30 transition-colors"
            >
              Today
            </button>
            <button onClick={nextMonth} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Day Labels */}
        <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-800">
          {DAYS.map(d => (
            <div key={d} className="px-2 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">{d}</div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-7">
          {blanks.map(i => (
            <div key={`blank-${i}`} className="min-h-[100px] border-b border-r border-gray-100 bg-gray-50/50 dark:border-gray-800/50 dark:bg-gray-900/30" />
          ))}
          {days.map(day => {
            const events = dayEvents(day);
            const isToday = isCurrentMonth && day === today;
            const isSelected = selectedDay === day;
            return (
              <div
                key={day}
                onClick={() => setSelectedDay(isSelected ? null : day)}
                className={`min-h-[100px] border-b border-r border-gray-100 p-2 cursor-pointer transition-colors dark:border-gray-800/50 ${
                  isSelected ? "bg-indigo-50/70 dark:bg-indigo-900/20" : "hover:bg-gray-50 dark:hover:bg-gray-800/30"
                }`}
              >
                <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium ${
                  isToday
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 dark:text-gray-300"
                }`}>
                  {day}
                </span>
                <div className="mt-1 space-y-1">
                  {events.slice(0, 2).map(ev => (
                    <div key={ev.id} className={`${ev.color} rounded px-1.5 py-0.5 text-[10px] font-medium text-white truncate`}>
                      {ev.title}
                    </div>
                  ))}
                  {events.length > 2 && (
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">+{events.length - 2} more</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Selected Day Detail */}
      <AnimatePresence>
        {selectedDay !== null && dayEvents(selectedDay).length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Events on {MONTHS[currentMonth]} {selectedDay}
            </h3>
            <div className="space-y-3">
              {dayEvents(selectedDay).map(ev => (
                <div key={ev.id} className="flex items-center gap-4 rounded-lg border border-gray-100 p-4 dark:border-gray-800">
                  <div className={`h-10 w-1 rounded-full ${ev.color}`} />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{ev.title}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{ev.time}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />Conference Room A</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
