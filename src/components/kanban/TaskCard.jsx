// components/kanban/TaskCard.jsx
import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Pencil, Check, X } from "lucide-react";

// Helper function untuk menentukan warna badge berdasarkan prioritas
const getPriorityStyles = (priority) => {
  switch (priority) {
    case "URGENT":
      return "bg-red-500 text-white";
    case "HIGH":
      return "bg-orange-500 text-white";
    case "MEDIUM":
      return "bg-blue-500 text-white";
    case "LOW":
      return "bg-gray-200 text-gray-800";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

const TaskCard = ({ task, onUpdate }) => {
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
      type: "task",
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  // 1. Tambahkan 'priority' ke state untuk diedit
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description || "",
    priority: task.priority || "MEDIUM",
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSave = () => {
    onUpdate(task.id, editedTask);
    setIsEditing(false);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`relative p-4 rounded-lg shadow-sm cursor-grab active:cursor-grabbing border transition-shadow ${
        isDragging
          ? "bg-gray-100 dark:bg-gray-600"
          : "bg-white dark:bg-gray-700"
      }`}
    >
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            className="w-full px-2 py-1 border rounded text-sm dark:bg-gray-600 dark:border-gray-500"
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            className="w-full px-2 py-1 border rounded text-sm dark:bg-gray-600 dark:border-gray-500"
            rows={2}
          />
          {/* 2. Tambahkan dropdown untuk mengedit prioritas */}
          <select
            name="priority"
            value={editedTask.priority}
            onChange={handleChange}
            className="w-full px-2 py-1 border rounded text-sm dark:bg-gray-600 dark:border-gray-500"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
          </select>
          <div className="flex gap-2 justify-end mt-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
            >
              <Check size={14} /> Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              <X size={14} /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-800 dark:text-white line-clamp-2 pr-8">
              {task.title}
            </h3>
            {/* 3. Tampilkan badge prioritas */}
            <span
              className={`text-xs font-bold px-2 py-1 rounded-full ${getPriorityStyles(task.priority)}`}
            >
              {task.priority || 'MEDIUM'}
            </span>
          </div>

          {task.description && (
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
              {task.description}
            </p>
          )}
          <div className="mt-3 flex justify-between items-center">
            {task.dueDate && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </p>
            )}
             <p className="text-xs text-gray-500 dark:text-gray-400">
                Nama: {task.order?.user?.name || '-'}
            </p>
          </div>
          {/* Tombol Edit */}
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-2 right-2 p-1 rounded-full text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
            {...listeners} // Hentikan drag saat tombol edit diklik
            onMouseDown={(e) => e.stopPropagation()} // Cegah event drag saat mengklik
          >
            <Pencil size={14} />
          </button>
        </>
      )}
    </div>
  );
};

export default TaskCard;
