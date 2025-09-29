// components/kanban/TaskCard.jsx
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const TaskCard = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: task.id,
    data: {
      type: 'task', // Opsional: untuk identifikasi
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm cursor-grab active:cursor-grabbing border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
    >
      <h3 className="font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">
        {task.title}
      </h3>
      {task.description && (
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {task.description}
        </p>
      )}
      {task.dueDate && (
        <p className="text-xs text-gray-500 mt-2">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}
    </div>
  );
};

export default TaskCard;