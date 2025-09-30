import React, { useEffect, useState } from 'react';
import { 
  DndContext, 
  DragOverlay, 
  PointerSensor, 
  useSensor, 
  useSensors,
  closestCorners 
} from '@dnd-kit/core';
import { getAllTasks, updateTaskStatus, createTask, getOrders } from '@/services/api';
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

const COLUMN_COLORS = {
  TODO: 'bg-white border-gray-300',
  IN_PROGRESS: 'bg-gray-50 border-gray-400',
  REVIEW: 'bg-white border-gray-500',
  DONE: 'bg-gray-100 border-gray-600',
};

const COLUMN_BADGES = {
  TODO: 'bg-black text-white',
  IN_PROGRESS: 'bg-gray-800 text-white',
  REVIEW: 'bg-gray-600 text-white',
  DONE: 'bg-gray-400 text-black',
};

const DashboardTasks = () => {
  const [tasks, setTasks] = useState({
    TODO: [],
    IN_PROGRESS: [],
    REVIEW: [],
    DONE: []
  });
  const [orders, setOrders] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [dragStartColumn, setDragStartColumn] = useState(null);
  // Di DashboardTasks.jsx - pastikan state ini ada
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
    fetchOrders();
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

const fetchOrders = async () => {
    try {
      const res = await getOrders();
      // Pastikan struktur data sesuai dengan respons API Anda
      setOrders(res.data.data || []);
    } catch (err) {
      console.error("Gagal memuat orders:", err);
      setOrders([]); // Set ke array kosong jika gagal
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
    } catch (error) {
      console.error("Gagal membuat task:", error);
      alert("Gagal membuat task. Silakan coba lagi.");
    }
  };

  const findTask = (id) => Object.values(tasks).flat().find(task => task.id === id);

  const findColumn = (taskId) => {
    for (const [columnId, columnTasks] of Object.entries(tasks)) {
      if (columnTasks.some(task => task.id === taskId)) {
        return columnId;
      }
    }
    return null;
  };

   const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleUpdateTask = async (updatedData) => {
    try {
      const response = await updateTask(selectedTask.id, updatedData);
      const updatedTask = response.data.data;

      setTasks(prevTasks => {
        const column = updatedTask.status;
        return {
          ...prevTasks,
          [column]: prevTasks[column].map(t => 
            t.id === updatedTask.id ? updatedTask : t
          ),
        };
      });

      setIsEditModalOpen(false);
      setSelectedTask(null);
    } catch (err) {
      console.error("Gagal update task:", err);
      alert("Gagal update task.");
    }
  };


  const handleDragStart = (event) => {
    const { active } = event;
    const task = findTask(active.id);
    const sourceColumn = findColumn(active.id);
    setActiveTask(task);
    setDragStartColumn(sourceColumn);
  };

  const getTargetColumn = (over) => {
    if (!over) return null;
    if (over.data.current?.type === 'column') return over.id;
    if (over.id) {
      const taskColumn = findColumn(over.id);
      if (taskColumn && Object.keys(COLUMNS).includes(taskColumn)) {
        return taskColumn;
      }
    }
    if (Object.keys(COLUMNS).includes(over.id)) return over.id;
    return null;
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const activeColumn = findColumn(activeId);
    const overColumn = getTargetColumn(over);
    if (!activeColumn || !overColumn || activeColumn === overColumn) return;

    setTasks(prevTasks => {
      const activeItems = [...prevTasks[activeColumn]];
      const overItems = [...(prevTasks[overColumn] || [])];
      const activeIndex = activeItems.findIndex(item => item.id === activeId);
      if (activeIndex === -1) return prevTasks;
      if (overItems.some(item => item.id === activeId)) return prevTasks;

      const [movedItem] = activeItems.splice(activeIndex, 1);
      return {
        ...prevTasks,
        [activeColumn]: activeItems,
        [overColumn]: [...overItems, movedItem],
      };
    });
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) {
      setActiveTask(null);
      setDragStartColumn(null);
      return;
    }

    const activeId = active.id;
    const targetColumn = getTargetColumn(over);
    if (!dragStartColumn || !targetColumn || dragStartColumn === targetColumn) {
      setActiveTask(null);
      setDragStartColumn(null);
      return;
    }

    try {
      await updateTaskStatus(activeId, targetColumn);
    } catch (err) {
      console.error("Gagal memperbarui status task:", err);
      const task = findTask(activeId);
      if (task) {
        setTasks(prevTasks => ({
          ...prevTasks,
          [dragStartColumn]: [...(prevTasks[dragStartColumn] || []), task],
          [targetColumn]: (prevTasks[targetColumn] || []).filter(t => t.id !== activeId)
        }));
      }
      alert("Gagal memperbarui status task. Silakan coba lagi.");
    } finally {
      setActiveTask(null);
      setDragStartColumn(null);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );


  // Di DashboardTasks.jsx - pastikan ada fungsi ini
const openEditModal = (task) => {
  setSelectedTask(task);
  setIsEditModalOpen(true);
};
  const totalTasks = Object.values(tasks).flat().length;

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
        <p className="text-gray-700 font-medium">Loading your tasks...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-black shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 py-6 md:py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
            <div className="flex items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl md:text-4xl font-bold text-white">Task Board</h1>
                <p className="text-gray-300 mt-1 text-sm md:text-base">
                  Manage and track your team's progress • {totalTasks} total tasks
                </p>
              </div>
            </div>
            <Button 
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 bg-black text-black hover:bg-gray-200 shadow-lg rounded-xl px-4 py-2 md:px-6 md:py-3 text-sm md:text-lg"
            >
              <Plus size={18} />
              New Task
            </Button>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="container mx-auto px-4 sm:px-6 py-6 md:py-10">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {Object.entries(COLUMNS).map(([columnId, title]) => (
              <div key={columnId} className="flex flex-col">
                {/* Column Header */}
                <div className={`rounded-t-xl border ${COLUMN_COLORS[columnId]} p-3 md:p-4 shadow-md`}>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="font-semibold text-gray-900 text-base md:text-lg">{title}</h2>
                    <span className={`${COLUMN_BADGES[columnId]} text-xs md:text-sm font-bold px-2 py-0.5 md:px-2.5 md:py-1 rounded-full`}>
                      {tasks[columnId]?.length || 0}
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${COLUMN_BADGES[columnId]} transition-all duration-500`}
                      style={{ width: `${Math.min((tasks[columnId]?.length || 0) * 15, 100)}%` }}
                    />
                  </div>
                </div>
                
                {/* Column Content */}
                <div className={`flex-1 rounded-b-xl border border-t-0 ${COLUMN_COLORS[columnId]} p-3 md:p-4 min-h-[300px] sm:min-h-[500px] transition hover:shadow-lg`}>
                  <KanbanColumn 
                    id={columnId} 
                    title={title} 
                    tasks={tasks[columnId] || []} 
                  />
                </div>
              </div>
            ))}
          </div>

          <DragOverlay>
            {activeTask ? (
              <div className="rotate-3 scale-105 opacity-90">
                <TaskCard task={activeTask} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      <CreateTaskModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateTask}
        columns={COLUMNS}
        orders={orders}
      />
    </div>
  );
};

export default DashboardTasks;
