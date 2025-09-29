// components/kanban/KanbanColumn.jsx
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';

const KanbanColumn = ({ id, title, tasks }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: {
      type: 'column', // PASTIKAN INI ADA
    },
  });

  return (
    <div 
      className={`bg-gray-50 dark:bg-gray-800 rounded-lg p-4 min-h-[500px] border-2 ${
        isOver ? 'border-blue-500 bg-blue-50' : 'border-transparent'
      } transition-colors`}
    >
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        {title} <span className="text-sm text-gray-500">({tasks.length})</span>
      </h2>
      
      <div
        ref={setNodeRef}
        className="space-y-3 min-h-[400px]"
      >
        <SortableContext 
          items={tasks.map(task => task.id)} 
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
        
        {/* Area kosong untuk drop */}
        {tasks.length === 0 && (
          <div className="flex items-center justify-center h-32 text-gray-400 border-2 border-dashed border-gray-300 rounded-lg">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;