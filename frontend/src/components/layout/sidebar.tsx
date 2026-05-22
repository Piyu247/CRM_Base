"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Kanban, 
  CalendarDays, 
  Clock, 
  BarChart, 
  Bot,
  Settings 
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "CRM", href: "/crm", icon: Users },
  { name: "Projects", href: "/projects", icon: Kanban },
  { name: "Calendar", href: "/calendar", icon: CalendarDays },
  { name: "Attendance", href: "/attendance", icon: Clock },
  { name: "Analytics", href: "/analytics", icon: BarChart },
  { name: "AI Assistant", href: "/ai", icon: Bot },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="flex h-16 shrink-0 items-center px-6 font-bold text-xl tracking-tight text-indigo-600 dark:text-indigo-400">
        AI CRM
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto px-4 py-4">
        <nav className="flex-1 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  isActive
                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400"
                    : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white",
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors"
                )}
              >
                <item.icon
                  className={cn(
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-gray-400 group-hover:text-indigo-600 dark:text-gray-500 dark:group-hover:text-white",
                    "mr-3 h-5 w-5 flex-shrink-0 transition-colors"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
