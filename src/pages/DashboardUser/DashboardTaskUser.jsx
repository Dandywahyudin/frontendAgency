import React, { useEffect, useState } from 'react';
import { getMyTasks } from '@/services/api'; // Menggunakan fungsi API yang baru
import KanbanColumn from '@/components/kanban/KanbanColumn'; // Komponen ini bisa dipakai ulang
import TaskCard from '@/components/kanban/TaskCard'; // Kartu tugas juga bisa dipakai ulang

// Definisi kolom tetap sama
const COLUMNS = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  REVIEW: 'Review',
  DONE: 'Done',
};

// Styling untuk header kolom
const COLUMN_STYLING = {
  TODO: { header: 'bg-white border-gray-300', badge: 'bg-black text-white' },
  IN_PROGRESS: { header: 'bg-blue-50 border-blue-400', badge: 'bg-blue-600 text-white' },
  REVIEW: { header: 'bg-yellow-50 border-yellow-400', badge: 'bg-yellow-500 text-white' },
  DONE: { header: 'bg-green-50 border-green-500', badge: 'bg-green-600 text-white' },
};

const DashboardTaskUser = () => {
  const [tasks, setTasks] = useState({
    TODO: [],
    IN_PROGRESS: [],
    REVIEW: [],
    DONE: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserTasks();
  }, []);

  const fetchUserTasks = async () => {
    try {
      // Memanggil fungsi API baru untuk mendapatkan tugas milik user
      const res = await getMyTasks();
      const userTasks = res.data.data || [];

      // Mengelompokkan tugas berdasarkan status
      const groupedTasks = Object.keys(COLUMNS).reduce((acc, status) => {
        acc[status] = userTasks.filter(t => t.status === status);
        return acc;
      }, { TODO: [], IN_PROGRESS: [], REVIEW: [], DONE: [] });

      setTasks(groupedTasks);
    } catch (err) {
      console.error("Gagal memuat tugas Anda:", err);
    } finally {
      setLoading(false);
    }
  };

  const totalTasks = Object.values(tasks).flat().length;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-700 font-medium">Loading your project progress...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Project Progress</h1>
          <p className="text-gray-500 mt-1">
            Track the status of your order from start to finish.
          </p>
        </div>
      </div>

      {/* Kanban Board (Read-Only) */}
      <div className="container mx-auto px-4 sm:px-6 py-8">
        {totalTasks === 0 && !loading ? (
          <div className="text-center py-20 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-700">No tasks found for your order yet.</h2>
            <p className="text-gray-500 mt-2">Please check back later. Your project will appear here once it starts.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(COLUMNS).map(([columnId, title]) => (
              <div key={columnId}>
                {/* Column Header */}
                <div className={`rounded-t-lg border ${COLUMN_STYLING[columnId].header} p-4`}>
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-gray-800">{title}</h2>
                    <span className={`${COLUMN_STYLING[columnId].badge} text-xs font-bold px-2 py-1 rounded-full`}>
                      {tasks[columnId]?.length || 0}
                    </span>
                  </div>
                </div>
                
                {/* Column Content */}
                <div className={`rounded-b-lg border border-t-0 ${COLUMN_STYLING[columnId].header} p-4 min-h-[400px]`}>
                  <div className="space-y-4">
                    {(tasks[columnId] || []).map((task) => (
                      // TaskCard digunakan kembali, tapi tanpa interaksi drag
                      <TaskCard key={task.id} task={task} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardTaskUser;