"use client";

import { useState } from "react";
import { Folder, MoreVertical, Plus, CheckCircle2, Circle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([
    { id: 1, name: "Website Redesign", status: "In Progress", tasks: 12, completed: 4 },
    { id: 2, name: "Mobile App V2", status: "Planning", tasks: 24, completed: 0 },
    { id: 3, name: "Q3 Marketing Campaign", status: "Completed", tasks: 8, completed: 8 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectTasks, setNewProjectTasks] = useState("");

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    
    const newProject = {
      id: Date.now(),
      name: newProjectName,
      status: "Planning",
      tasks: parseInt(newProjectTasks) || 0,
      completed: 0,
    };
    
    setProjects([newProject, ...projects]);
    setNewProjectName("");
    setNewProjectTasks("");
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Projects</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage your team's projects and tasks.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-4 w-4" /> New Project
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            key={project.id} 
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950"
          >
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
                  {project.tasks > 0 ? Math.round((project.completed / project.tasks) * 100) : 0}%
                </span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <div 
                  className="h-full bg-indigo-600 dark:bg-indigo-500 transition-all duration-500" 
                  style={{ width: `${project.tasks > 0 ? (project.completed / project.tasks) * 100 : 0}%` }}
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
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-950 border border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create New Project</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <form onSubmit={handleAddProject} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Name</label>
                  <Input 
                    value={newProjectName} 
                    onChange={(e) => setNewProjectName(e.target.value)} 
                    placeholder="e.g. Q4 Launch Strategy" 
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Estimated Tasks</label>
                  <Input 
                    type="number"
                    value={newProjectTasks} 
                    onChange={(e) => setNewProjectTasks(e.target.value)} 
                    placeholder="e.g. 10" 
                  />
                </div>
                
                <div className="mt-6 flex justify-end gap-3">
                  <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button type="submit">Create Project</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
