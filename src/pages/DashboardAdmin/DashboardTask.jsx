import React, { useEffect, useState } from 'react';
import { 
  DndContext, 
  DragOverlay, 
  PointerSensor, 
  useSensor, 
  useSensors,
  closestCorners 
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { getAllTasks, updateTaskStatus, createTask } from '@/services/api';
import KanbanColumn from '@/components/kanban/KanbanColumn';
import TaskCard from '@/components/kanban/TaskCard';
import CreateTaskModal from '@/components/kanban/CreateTaskModal';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const COLUMNS = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  REVIEW: 'Review',
  DONE: 'Done',
};

const DashboardTasks = () => {
  const [tasks, setTasks] = useState({
    TODO: [],
    IN_PROGRESS: [],
    REVIEW: [],
    DONE: []
  });
  const [activeTask, setActiveTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getAllTasks();
      const groupedTasks = Object.keys(COLUMNS).reduce((acc, status) => {
        acc[status] = res.data.data.filter(t => t.status === status);
        return acc;
      }, {});
      setTasks(groupedTasks);
    } catch (err) {
      console.error("Gagal memuat tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await createTask(taskData);
      const newTask = response.data.data;
      
      setTasks(prevTasks => ({
        ...prevTasks,
        [newTask.status]: [...prevTasks[newTask.status], newTask]
      }));
      
      setIsCreateModalOpen(false);
      console.log('Task berhasil dibuat');
    } catch (error) {
      console.error("Gagal membuat task:", error);
      alert("Gagal membuat task. Silakan coba lagi.");
    }
  };

  const findTask = (id) => {
    return Object.values(tasks).flat().find(task => task.id === id);
  };

  const findColumn = (taskId) => {
    for (const [columnId, columnTasks] of Object.entries(tasks)) {
      if (columnTasks.some(task => task.id === taskId)) {
        return columnId;
      }
    }
    return null;
  };

  const handleDragStart = (event) => {
    const { active } = event;
    const task = findTask(active.id);
    setActiveTask(task);
  };

  // PERBAIKAN BESAR: Fungsi untuk mendapatkan kolom tujuan
  const getTargetColumn = (over) => {
    if (!over) return null;

    // Scenario 1: Over adalah kolom (droppable area)
    if (over.data.current?.type === 'column') {
      return over.id;
    }
    
    // Scenario 2: Over adalah task - cari kolom task tersebut
    if (over.id) {
      const taskColumn = findColumn(over.id);
      if (taskColumn && Object.keys(COLUMNS).includes(taskColumn)) {
        return taskColumn;
      }
    }
    
    // Scenario 3: Over adalah kolom ID langsung
    if (Object.keys(COLUMNS).includes(over.id)) {
      return over.id;
    }

    return null;
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeId = active.id;
    
    // Cari kolom asal
    const activeColumn = findColumn(activeId);
    
    // PERBAIKAN: Gunakan fungsi getTargetColumn yang sama
    const overColumn = getTargetColumn(over);

    console.log('Drag Over Debug:', {
      activeId,
      overId: over.id,
      activeColumn,
      overColumn,
      overData: over.data.current
    });

    // Validasi
    if (!activeColumn || !overColumn || activeColumn === overColumn) {
      console.log('Invalid drag operation - returning');
      return;
    }

    setTasks((prevTasks) => {
      const activeItems = [...prevTasks[activeColumn]];
      const overItems = [...(prevTasks[overColumn] || [])];
      
      const activeIndex = activeItems.findIndex(item => item.id === activeId);
      
      // Jika task tidak ditemukan di kolom asal
      if (activeIndex === -1) {
        console.log('Task not found in source column');
        return prevTasks;
      }

      // Jika task sudah ada di kolom tujuan, jangan pindahkan
      if (overItems.some(item => item.id === activeId)) {
        console.log('Task already exists in target column');
        return prevTasks;
      }

      const [movedItem] = activeItems.splice(activeIndex, 1);
      
      console.log(`Memindahkan task ${activeId} dari ${activeColumn} ke ${overColumn}`);
      
      return {
        ...prevTasks,
        [activeColumn]: activeItems,
        [overColumn]: [...overItems, movedItem],
      };
    });
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setActiveTask(null);

    console.log('=== DRAG END DEBUG ===');
    console.log('Active:', active.id);
    console.log('Over:', over?.id);
    console.log('Over data:', over?.data?.current);

    if (!over) {
      console.log('No over target, canceling drag');
      return;
    }

    const activeId = active.id;
    
    // Cari kolom asal
    const sourceColumn = findColumn(activeId);
    
    // PERBAIKAN: Gunakan fungsi getTargetColumn yang sama
    const targetColumn = getTargetColumn(over);

    console.log('Source Column:', sourceColumn);
    console.log('Target Column:', targetColumn);

    // Validasi
    if (!sourceColumn || !targetColumn) {
      console.log('Invalid source or target column');
      return;
    }

    if (sourceColumn === targetColumn) {
      console.log('Same column, no update needed');
      return;
    }

    try {
      console.log(`Updating task ${activeId} from ${sourceColumn} to ${targetColumn}`);
      
      // Panggil API update
      await updateTaskStatus(activeId, targetColumn);
      
      console.log('✅ Task status updated successfully in database');
      
    } catch (err) {
      console.error("❌ Gagal memperbarui status task:", err);
      console.error("Error details:", err.response?.data || err.message);
      
      // Rollback jika API gagal
      const task = findTask(activeId);
      if (task) {
        setTasks(prevTasks => ({
          ...prevTasks,
          [sourceColumn]: [...(prevTasks[sourceColumn] || []), task],
          [targetColumn]: (prevTasks[targetColumn] || []).filter(t => t.id !== activeId)
        }));
      }
      
      alert("Gagal memperbarui status task. Silakan coba lagi.");
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  if (loading) return (
    <div className="flex justify-center items-center min-h-64">
      <p>Loading tasks...</p>
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
        <Button 
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          Create Task
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(COLUMNS).map(([columnId, title]) => (
            <KanbanColumn 
              key={columnId} 
              id={columnId} 
              title={title} 
              tasks={tasks[columnId] || []} 
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? (
            <TaskCard task={activeTask} />
          ) : null}
        </DragOverlay>
      </DndContext>

      <CreateTaskModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateTask}
        columns={COLUMNS}
      />
    </div>
  );
};

export default DashboardTasks;