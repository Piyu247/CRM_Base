"use client";

import { useState } from "react";
import { Folder, MoreVertical, Plus, Clock, CheckCircle2, Circle } from "lucide-react";

export default function ProjectsPage() {
  const [projects] = useState([
    { id: 1, name: "Website Redesign", status: "In Progress", tasks: 12, completed: 4 },
    { id: 2, name: "Mobile App V2", status: "Planning", tasks: 24, completed: 0 },
    { id: 3, name: "Q3 Marketing Campaign", status: "Completed", tasks: 8, completed: 8 },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Projects</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage your team's projects and tasks.</p>
        </div>
        <button className="flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          <Plus className="h-4 w-4" /> New Project
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div key={project.id} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-900/50">
                  <Folder className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{project.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{project.status}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
            
            <div className="mt-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Progress</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {Math.round((project.completed / project.tasks) * 100)}%
                </span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <div 
                  className="h-full bg-indigo-600 dark:bg-indigo-500" 
                  style={{ width: `${(project.completed / project.tasks) * 100}%` }}
                />
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4 border-t border-gray-100 pt-4 dark:border-gray-800">
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <CheckCircle2 className="h-4 w-4" />
                <span>{project.completed}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <Circle className="h-4 w-4" />
                <span>{project.tasks - project.completed}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
