// ============================================
// TASKS PAGE - MODERN UI
// Halaman untuk menampilkan & kelola semua tugas
// ============================================

'use client';

import { useState, useEffect } from 'react';
import { Task } from '@/lib/types';
import TaskCard from '@/components/TaskCard';
import Modal from '@/components/Modal';
import TaskForm from '@/components/TaskForm';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending'>('all');
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  // Quick Filter States
  const [quickFilter, setQuickFilter] = useState<'all' | 'today' | 'week' | 'overdue'>('all');

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  // Load data dari API
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/tasks');
      const json = await res.json();

      const tasksNormalized: Task[] = (json.data || []).map((t: any) => ({
        id: t.id ?? t._id ?? String(t._id ?? ''),
        title: t.title,
        subject: t.subject,
        deadline: t.deadline,
        priority: t.priority ?? 'Sedang',
        isCompleted: t.isCompleted ?? false,
        createdAt: t.createdAt ?? '',
      }));

      setTasks(tasksNormalized);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handler Functions
  const handleToggleComplete = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    try {
      await fetch('/api/tasks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isCompleted: !task.isCompleted }),
      });

      const updatedTasks = tasks.map(t =>
        t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin mau hapus tugas ini?')) return;

    try {
      await fetch(`/api/tasks?id=${id}`, { method: 'DELETE' });
      setTasks(tasks.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleAddNew = () => {
    setEditingTask(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (taskData: Task) => {
    try {
      if (editingTask) {
        // Update
        await fetch('/api/tasks', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(taskData),
        });
        setTasks(tasks.map(t => t.id === taskData.id ? taskData : t));
      } else {
        // Create
        const res = await fetch('/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(taskData),
        });
        const json = await res.json();
        setTasks([...tasks, json.data]);
      }

      setIsModalOpen(false);
      setEditingTask(undefined);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleFormCancel = () => {
    setIsModalOpen(false);
    setEditingTask(undefined);
  };

  // Filter & Sort Logic
  const applyQuickFilter = (tasksArray: Task[]) => {
    const today = new Date().toISOString().split('T')[0];
    const now = new Date();
    const endOfWeek = new Date(now);
    endOfWeek.setDate(now.getDate() + (7 - now.getDay()));
    const endOfWeekStr = endOfWeek.toISOString().split('T')[0];

    switch (quickFilter) {
      case 'today':
        return tasksArray.filter(t => {
          const taskDate = t.deadline.split('T')[0];
          return taskDate === today && !t.isCompleted;
        });
      case 'week':
        return tasksArray.filter(t => {
          const taskDate = t.deadline.split('T')[0];
          return taskDate >= today && taskDate <= endOfWeekStr && !t.isCompleted;
        });
      case 'overdue':
        return tasksArray.filter(t => {
          const taskDeadline = new Date(t.deadline);
          return taskDeadline < now && !t.isCompleted;
        });
      default:
        return tasksArray;
    }
  };

  let processedTasks = applyQuickFilter(tasks);

  processedTasks = processedTasks.filter(task => {
    if (filterStatus === 'completed' && !task.isCompleted) return false;
    if (filterStatus === 'pending' && task.isCompleted) return false;
    if (filterSubject !== 'all' && task.subject !== filterSubject) return false;
    if (filterPriority !== 'all' && task.priority !== filterPriority) return false;
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const subjects = ['all', ...Array.from(new Set(tasks.map(t => t.subject)))];

  if (isLoading) {
    return <LoadingSpinner message="Memuat tugas..." />;
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 p-6 md:p-12 transition-colors duration-300">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h1 className="text-6xl md:text-8xl font-black text-black dark:text-white tracking-tighter uppercase leading-[0.9]">
            Tugas
          </h1>
          <div className="h-2 w-24 bg-blue-600 mt-6 mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 text-xl max-w-2xl font-light">
           Kelola tugas Anda. Pantau perkembangannya. Selesaikan.
          </p>
        </div>
        <button
          className="group px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-wider text-sm hover:opacity-80 transition-opacity flex items-center gap-3"
          onClick={handleAddNew}
        >
          <span className="text-xl leading-none">＋</span>
          Tambahkan Tugas Baru
        </button>
      </div>

      {/* Quick Filters - Tab Style */}
      <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-800 mb-8">
        {[
          { value: 'all', label: 'Semua Tugas' },
          { value: 'today', label: 'Hari Ini' },
          { value: 'week', label: 'Minggu Ini' },
          { value: 'overdue', label: 'Terlambat' },
        ].map(qf => (
          <button
            key={qf.value}
            onClick={() => setQuickFilter(qf.value as any)}
            className={`px-6 py-4 font-bold uppercase tracking-wider text-sm transition-all relative ${quickFilter === qf.value
                ? 'text-black dark:text-white'
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
          >
            {qf.label}
            {quickFilter === qf.value && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-600"></span>
            )}
          </button>
        ))}
      </div>

      {/* Search & Filter - Clean Toolbar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">

        {/* Search */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-gray-400 text-lg">🔍</span>
          </div>
          <input
            type="text"
            placeholder="SEARCH Tugas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-800 bg-transparent text-black dark:text-white focus:border-black dark:focus:border-white outline-none transition-colors font-mono uppercase text-sm"
          />
        </div>

        {/* Filter Status */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="px-4 py-3 border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none font-mono uppercase text-sm cursor-pointer appearance-none rounded-none"
        >
          <option value="all" className="bg-white dark:bg-gray-900 text-black dark:text-white">Status: Semua</option>
          <option value="pending" className="bg-white dark:bg-gray-900 text-black dark:text-white">Status: Tertunda</option>
          <option value="completed" className="bg-white dark:bg-gray-900 text-black dark:text-white">Status: Selesai</option>
        </select>

        {/* Filter Subject */}
        <select
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
          className="px-4 py-3 border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none font-mono uppercase text-sm cursor-pointer appearance-none rounded-none"
        >
          <option value="all" className="bg-white dark:bg-gray-900 text-black dark:text-white">Subject: Semua</option>
          {subjects.slice(1).map(subject => (
            <option key={subject} value={subject} className="bg-white dark:bg-gray-900 text-black dark:text-white">{subject}</option>
          ))}
        </select>

        {/* Filter Priority */}
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="px-4 py-3 border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none font-mono uppercase text-sm cursor-pointer appearance-none rounded-none"
        >
          <option value="all" className="bg-white dark:bg-gray-900 text-black dark:text-white">Priority: Semua</option>
          <option value="Tinggi" className="bg-white dark:bg-gray-900 text-black dark:text-white">Tinggi</option>
          <option value="Sedang" className="bg-white dark:bg-gray-900 text-black dark:text-white">Sedang</option>
          <option value="Rendah" className="bg-white dark:bg-gray-900 text-black dark:text-white">Rendah</option>
        </select>
      </div>

      {/* Active Filters Info */}
      {(searchQuery || filterStatus !== 'all' || filterSubject !== 'all' || filterPriority !== 'all' || quickFilter !== 'all') && (
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100 dark:border-gray-900">
          <p className="text-xs uppercase tracking-widest text-gray-500">
            Perlihatkan {processedTasks.length} Hasil
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterStatus('all');
              setFilterSubject('all');
              setFilterPriority('all');
              setQuickFilter('all');
            }}
            className="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors"
          >
            Hapus Filter
          </button>
        </div>
      )}

      {/* Tasks Grid */}
      {processedTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processedTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        // Empty State - Minimal
        <div className="py-24 border-2 border-dashed border-gray-200 dark:border-gray-800 text-center">
          <h3 className="text-2xl font-black text-gray-300 dark:text-gray-700 uppercase tracking-tight mb-4">
            Tugas Tidak Ditentukan
          </h3>
          <p className="text-gray-400 dark:text-gray-600 font-mono text-sm max-w-md mx-auto mb-8">
            {tasks.length === 0
              ? "Daftar Anda kosong. Saatnya membuat sesuatu yang baru."
              : "Cobalah menyesuaikan filter Anda untuk menemukan apa yang Anda cari."
            }
          </p>
          {tasks.length === 0 && (
            <button
              className="px-8 py-3 border-2 border-black dark:border-white text-black dark:text-white font-bold uppercase tracking-widest text-xs hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
              onClick={handleAddNew}
            >
              Buat Tugas Pertama Anda
            </button>
          )}
        </div>
      )}

      {/* Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleFormCancel}
        title={editingTask ? 'EDIT TASK' : 'NEW TASK'}
      >
        <TaskForm
          task={editingTask}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      </Modal>
    </main>
  );
}