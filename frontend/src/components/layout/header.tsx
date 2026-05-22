"use client";

import { Bell, Search, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white/50 backdrop-blur-xl px-6 dark:border-gray-800 dark:bg-gray-950/50">
      <div className="flex flex-1 items-center">
        <button
          className="flex w-full max-w-md items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-500 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/80"
          onClick={() => {
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
          }}
        >
          <Search className="h-4 w-4" />
          <span>Search...</span>
          <span className="ml-auto flex flex-none items-center gap-1 rounded border border-gray-300 bg-white px-1.5 text-[10px] font-medium text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
            <span className="text-xs">⌘</span>K
          </span>
        </button>
      </div>

      <div className="flex items-center gap-4">
        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-transparent text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        )}
        
        <Button variant="ghost" size="icon" className="relative rounded-full bg-transparent text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-950" />
        </Button>

        <div className="h-8 w-8 overflow-hidden rounded-full border border-gray-200 dark:border-gray-800">
          <img
            src="https://avatar.vercel.sh/user"
            alt="User avatar"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
