"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search, LayoutDashboard, Users, Kanban, CalendarDays, Clock, BarChart, Bot, Settings, Plus } from "lucide-react";
import { useTheme } from "next-themes";

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { setTheme, theme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-950/50 backdrop-blur-sm dark:bg-gray-950/80">
      <div className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] p-4">
        <Command
          className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-950"
          shouldFilter={true}
        >
          <div className="flex items-center border-b border-gray-200 px-3 dark:border-gray-800">
            <Search className="mr-2 h-4 w-4 shrink-0 text-gray-500" />
            <Command.Input
              autoFocus
              placeholder="Type a command or search..."
              className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-200"
            />
          </div>
          <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
            <Command.Empty className="py-6 text-center text-sm text-gray-500">
              No results found.
            </Command.Empty>

            <Command.Group heading="Quick Actions" className="px-2 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">
              <Command.Item
                onSelect={() => runCommand(() => router.push('/crm/new'))}
                className="flex cursor-pointer items-center rounded-sm px-2 py-2 text-sm text-gray-700 aria-selected:bg-indigo-50 aria-selected:text-indigo-600 dark:text-gray-200 dark:aria-selected:bg-indigo-900/50 dark:aria-selected:text-indigo-400"
              >
                <Plus className="mr-2 h-4 w-4" />
                <span>Create Lead</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push('/projects/new'))}
                className="flex cursor-pointer items-center rounded-sm px-2 py-2 text-sm text-gray-700 aria-selected:bg-indigo-50 aria-selected:text-indigo-600 dark:text-gray-200 dark:aria-selected:bg-indigo-900/50 dark:aria-selected:text-indigo-400"
              >
                <Kanban className="mr-2 h-4 w-4" />
                <span>Create Task</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Navigation" className="px-2 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 mt-2">
              <Command.Item onSelect={() => runCommand(() => router.push('/dashboard'))} className="flex cursor-pointer items-center rounded-sm px-2 py-2 text-sm text-gray-700 aria-selected:bg-indigo-50 aria-selected:text-indigo-600 dark:text-gray-200 dark:aria-selected:bg-indigo-900/50 dark:aria-selected:text-indigo-400">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => router.push('/crm'))} className="flex cursor-pointer items-center rounded-sm px-2 py-2 text-sm text-gray-700 aria-selected:bg-indigo-50 aria-selected:text-indigo-600 dark:text-gray-200 dark:aria-selected:bg-indigo-900/50 dark:aria-selected:text-indigo-400">
                <Users className="mr-2 h-4 w-4" />
                <span>CRM</span>
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => router.push('/ai'))} className="flex cursor-pointer items-center rounded-sm px-2 py-2 text-sm text-gray-700 aria-selected:bg-indigo-50 aria-selected:text-indigo-600 dark:text-gray-200 dark:aria-selected:bg-indigo-900/50 dark:aria-selected:text-indigo-400">
                <Bot className="mr-2 h-4 w-4" />
                <span>AI Assistant</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Settings" className="px-2 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 mt-2">
              <Command.Item
                onSelect={() => runCommand(() => setTheme(theme === 'dark' ? 'light' : 'dark'))}
                className="flex cursor-pointer items-center rounded-sm px-2 py-2 text-sm text-gray-700 aria-selected:bg-indigo-50 aria-selected:text-indigo-600 dark:text-gray-200 dark:aria-selected:bg-indigo-900/50 dark:aria-selected:text-indigo-400"
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Toggle Theme</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
