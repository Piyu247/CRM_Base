"use client";

import { useState } from "react";
import { 
  DndContext, 
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { 
  SortableContext, 
  arrayMove, 
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialDeals = [
  { id: '1', title: 'Acme Corp Redesign', value: 15000, stage: 'PROSPECTING' },
  { id: '2', title: 'GlobalTech Migration', value: 45000, stage: 'PROPOSAL' },
  { id: '3', title: 'Stark Ind. API Integration', value: 12000, stage: 'NEGOTIATION' },
  { id: '4', title: 'Wayne Ent. Consulting', value: 100000, stage: 'PROSPECTING' },
];

const STAGES = ['PROSPECTING', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST'];

function SortableItem(props: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="mb-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm cursor-grab active:cursor-grabbing dark:border-gray-700 dark:bg-gray-800">
      <h4 className="font-medium text-gray-900 dark:text-gray-100">{props.deal.title}</h4>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">${props.deal.value.toLocaleString()}</p>
    </div>
  );
}

export default function CRMPage() {
  const [deals, setDeals] = useState(initialDeals);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDealTitle, setNewDealTitle] = useState("");
  const [newDealValue, setNewDealValue] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    // Basic implementation since we're using a full Kanban
    // A robust dnd-kit implementation would handle moving between containers
    // For now, this placeholder handles simple within-column sorting visually if needed
  };

  const handleAddDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDealTitle.trim()) return;

    const newDeal = {
      id: Date.now().toString(),
      title: newDealTitle,
      value: parseFloat(newDealValue) || 0,
      stage: 'PROSPECTING',
    };

    setDeals([newDeal, ...deals]);
    setIsModalOpen(false);
    setNewDealTitle("");
    setNewDealValue("");
  };

  return (
    <div className="flex h-full flex-col relative">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">CRM Deals</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage your sales pipeline.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-4 w-4" /> New Deal
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <div className="flex flex-1 gap-6 overflow-x-auto pb-4">
          {STAGES.map((stage) => {
            const stageDeals = deals.filter(d => d.stage === stage);
            return (
              <div key={stage} className="flex h-full min-w-[300px] max-w-[300px] flex-col rounded-xl bg-gray-50 p-4 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {stage.replace('_', ' ')} <span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300">{stageDeals.length}</span>
                </h3>
                
                <div className="flex-1 overflow-y-auto">
                  <SortableContext items={stageDeals.map(d => d.id)} strategy={verticalListSortingStrategy}>
                    {stageDeals.map(deal => (
                      <SortableItem key={deal.id} id={deal.id} deal={deal} />
                    ))}
                  </SortableContext>
                </div>
              </div>
            );
          })}
        </div>
      </DndContext>

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
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create New Deal</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <form onSubmit={handleAddDeal} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deal Title</label>
                  <Input 
                    value={newDealTitle} 
                    onChange={(e) => setNewDealTitle(e.target.value)} 
                    placeholder="e.g. Wayne Ent. Consulting" 
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Value ($)</label>
                  <Input 
                    type="number"
                    value={newDealValue} 
                    onChange={(e) => setNewDealValue(e.target.value)} 
                    placeholder="e.g. 50000" 
                  />
                </div>
                
                <div className="mt-6 flex justify-end gap-3">
                  <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button type="submit">Add Deal</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
