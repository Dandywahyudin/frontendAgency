import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";
import { Inbox } from "lucide-react";

const KanbanColumn = ({ id, tasks, onEditTask, onUpdateTask }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: {
      type: "column",
      columnId: id,
    },
  });

  // Handle case when onEditTask is not provided
  const handleEdit = (task) => {
    if (onEditTask && typeof onEditTask === 'function') {
      onEditTask(task);
    } else {
      console.warn('onEditTask is not available');
    }
  };

  return (
    <div
      ref={setNodeRef}
      className={`
        flex flex-col h-full transition-all duration-200
        ${isOver ? "ring-2 ring-black/70 bg-gray-50 scale-[1.01]" : ""}
      `}
    >
      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex-1 space-y-3 overflow-y-auto min-h-[100px] custom-scrollbar">
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-gray-500 border border-dashed border-gray-300 rounded-lg bg-gray-50">
              <Inbox size={32} className="mb-2 text-gray-400" />
              <p className="text-sm font-medium">No tasks yet</p>
              <p className="text-xs mt-1 text-gray-400">Drag tasks here</p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onEdit={handleEdit} // <- gunakan handleEdit yang sudah di-safe
              />
            ))
          )}
        </div>
      </SortableContext>
    </div>
  );
};

export default KanbanColumn;