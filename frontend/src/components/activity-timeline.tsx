"use client";

import { useSocket } from "./socket-provider";
import { useEffect, useState } from "react";
import { CheckCircle2, UserPlus, Kanban, FileText, AlertCircle } from "lucide-react";

interface Activity {
  id: string;
  type: 'LEAD_CREATED' | 'TASK_ASSIGNED' | 'DEAL_UPDATED' | 'ATTENDANCE_MARKED';
  message: string;
  timestamp: Date;
}

const getIcon = (type: string) => {
  switch (type) {
    case 'LEAD_CREATED': return <UserPlus className="h-4 w-4 text-blue-500" />;
    case 'TASK_ASSIGNED': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case 'DEAL_UPDATED': return <Kanban className="h-4 w-4 text-purple-500" />;
    case 'ATTENDANCE_MARKED': return <FileText className="h-4 w-4 text-orange-500" />;
    default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
  }
};

export function ActivityTimeline() {
  const { socket } = useSocket();
  const [activities, setActivities] = useState<Activity[]>([
    { id: '1', type: 'LEAD_CREATED', message: 'John Doe was added as a new lead.', timestamp: new Date(Date.now() - 1000 * 60 * 5) },
    { id: '2', type: 'DEAL_UPDATED', message: 'Acme Corp deal moved to Negotiation.', timestamp: new Date(Date.now() - 1000 * 60 * 30) },
    { id: '3', type: 'TASK_ASSIGNED', message: 'You were assigned to "Review Q3 Report".', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) },
  ]);

  useEffect(() => {
    if (!socket) return;
    
    socket.on('new_activity', (activity: Activity) => {
      setActivities(prev => [activity, ...prev]);
    });

    return () => {
      socket.off('new_activity');
    };
  }, [socket]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Activity Timeline</h3>
      <div className="relative border-l border-gray-200 dark:border-gray-700 ml-3 space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="relative pl-6">
            <span className="absolute -left-[13px] flex h-6 w-6 items-center justify-center rounded-full bg-white ring-4 ring-white dark:bg-gray-900 dark:ring-gray-950 border border-gray-200 dark:border-gray-700">
              {getIcon(activity.type)}
            </span>
            <div className="flex flex-col flex-1 gap-1">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{activity.message}</p>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' }).format(new Date(activity.timestamp))}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
