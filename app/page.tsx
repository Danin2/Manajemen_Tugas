// ============================================
// DASHBOARD PAGE
// Halaman utama dengan statistik & ringkasan
// ============================================

'use client';

import { useState, useEffect } from 'react';
import { Task, Schedule } from '@/lib/types';
import { calculateTaskStats, getTodayTasks, getTodaySchedules } from '@/lib/taskHelpers';
import StatCard from '@/components/StatCard';
import TaskItem from '@/components/TaskItem';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load data saat pertama kali (ambil dari API / MongoDB)
  // Load data saat pertama kali (ambil dari API / MongoDB)
  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        const [tRes, sRes] = await Promise.all([
          fetch('/api/tasks'),
          fetch('/api/schedules'),
        ]);

        const [tJson, sJson] = await Promise.all([tRes.json(), sRes.json()]);

        if (!mounted) return;

        // ✅ Ambil array dari .data
        const tasksData = tJson.data || [];
        const schedulesData = sJson.data || [];

        // ✅ Map pakai tasksData (BUKAN tJson!)
        const tasksNormalized: Task[] = tasksData.map((t: any) => ({
          id: t.id ?? t._id ?? String(t._id ?? ''),
          title: t.title,
          subject: t.subject,
          deadline: t.dueDate ? new Date(t.dueDate).toISOString() : t.deadline ?? '',
          priority: t.priority ?? 'Sedang',
          isCompleted: t.isCompleted ?? (t.status === 'completed'),
          createdAt: t.createdAt ? new Date(t.createdAt).toISOString() : (t.createdAt ?? ''),
        }));

        // ✅ Map pakai schedulesData (BUKAN sJson!)
        const schedulesNormalized: Schedule[] = schedulesData.map((s: any) => ({
          id: s.id ?? s._id ?? String(s._id ?? ''),
          day: s.day,
          subject: s.subject,
          startTime: s.startTime,
          endTime: s.endTime,
          room: s.room,
        }));

        setTasks(tasksNormalized);
        setSchedules(schedulesNormalized);
      } catch (err) {
        console.error('Error fetching dashboard data', err);
        setTasks([]);
        setSchedules([]);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    fetchData();

    return () => { mounted = false; };
  }, []);

  // Hitung statistik
  const stats = calculateTaskStats(tasks);
  const todayTasks = getTodayTasks(tasks);
  const todaySchedules = getTodaySchedules(schedules);

  if (isLoading) {
    return <LoadingSpinner message="Sedang muat..." />;
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '🌅 Pagi';
    if (hour < 17) return '☀️ Siang';
    return '🌙 Malam';
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 p-6 md:p-12 transition-colors duration-300">
      {/* Hero Header */}
      <div className="mb-12">
        <p className="text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase text-sm mb-2">{getGreeting()}</p>
        <h1 className="text-6xl md:text-8xl font-black text-black dark:text-white tracking-tighter uppercase leading-[0.9]">
          Dashboard
        </h1>
        <div className="h-2 w-24 bg-blue-600 mt-6 mb-6"></div>
        <p className="text-gray-600 dark:text-gray-300 text-xl max-w-2xl font-light">
          Gambaran umum kemajuan akademik Anda dan jadwal yang akan datang. Tetap fokus.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {/* Total Tasks */}
        <div className="p-6 border-2 border-black dark:border-white transition-transform hover:-translate-y-1 duration-300 bg-white dark:bg-gray-900">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">Total Tugas</p>
          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-black text-black dark:text-white">{stats.total}</span>
            <span className="text-sm text-gray-400">Tugas</span>
          </div>
        </div>

        {/* Completed */}
        <div className="p-6 border-2 border-black dark:border-white transition-transform hover:-translate-y-1 duration-300 bg-black dark:bg-white group">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600 mb-4">Selesai</p>
          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-black text-white dark:text-black">{stats.completed}</span>
            <span className="text-sm text-gray-400 dark:text-gray-500">Selesai</span>
          </div>
        </div>

        {/* Pending */}
        <div className="p-6 border-2 border-black dark:border-white transition-transform hover:-translate-y-1 duration-300 bg-white dark:bg-gray-900">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">Tertunda</p>
          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-black text-black dark:text-white">{stats.pending}</span>
            <span className="text-sm text-gray-400">Aktif</span>
          </div>
        </div>

        {/* Progress */}
        <div className="p-6 border-2 border-black dark:border-white transition-transform hover:-translate-y-1 duration-300 bg-white dark:bg-gray-900 relative overflow-hidden">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">Progress</p>
          <div className="flex items-baseline gap-1 relative z-10">
            <span className="text-6xl font-black text-black dark:text-white">{stats.completionRate}</span>
            <span className="text-xl font-bold text-gray-400">%</span>
          </div>
          {/* Minimalist Progress Bar */}
          <div className="absolute bottom-0 left-0 h-2 bg-blue-600 transition-all duration-1000" style={{ width: `${stats.completionRate}%` }}></div>
        </div>
      </div>

      {/* Grid: Today's Tasks & Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Today's Tasks */}
        <div>
          <div className="flex items-center justify-between mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
            <h2 className="text-3xl font-bold uppercase tracking-tight text-black dark:text-white">Tugas Hari Ini</h2>
            <span className="text-sm font-bold bg-black dark:bg-white text-white dark:text-black px-3 py-1">
              {todayTasks.length}
            </span>
          </div>

          <div className="space-y-4">
            {todayTasks.length > 0 ? (
              todayTasks.map(task => (
                <div
                  key={task.id}
                  className="group flex flex-col p-5 border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-all duration-300 cursor-pointer bg-gray-50 dark:bg-gray-900/50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                        {task.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 font-mono uppercase">{task.subject}</p>
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 border ${task.priority === 'Tinggi' ? 'border-red-500 text-red-500' :
                        task.priority === 'Sedang' ? 'border-yellow-600 text-yellow-600' :
                          'border-green-600 text-green-600'
                      }`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 border border-dashed border-gray-300 dark:border-gray-700 text-center">
                <p className="text-gray-400 font-mono uppercase text-sm">Tidak Ada Tugas Hari Ini</p>
              </div>
            )}
          </div>
        </div>

        {/* Today's Schedule */}
        <div>
          <div className="flex items-center justify-between mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
            <h2 className="text-3xl font-bold uppercase tracking-tight text-black dark:text-white">Jadwal</h2>
            <span className="text-sm font-bold bg-black dark:bg-white text-white dark:text-black px-3 py-1">
              {todaySchedules.length}
            </span>
          </div>

          <div className="space-y-4">
            {todaySchedules.length > 0 ? (
              todaySchedules.map(schedule => (
                <div
                  key={schedule.id}
                  className="group flex items-center p-5 border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-all duration-300 bg-gray-50 dark:bg-gray-900/50"
                >
                  <div className="mr-6 text-right w-24 flex-shrink-0">
                    <p className="font-mono font-bold text-black dark:text-white text-lg">{schedule.startTime}</p>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Start</p>
                  </div>
                  <div className="h-10 w-[1px] bg-gray-300 dark:bg-gray-700 mr-6"></div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-black dark:text-white uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                      {schedule.subject}
                    </h3>
                    {schedule.room && (
                      <p className="text-xs text-gray-500 mt-1 font-mono uppercase">Room: {schedule.room}</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 border border-dashed border-gray-300 dark:border-gray-700 text-center">
                <p className="text-gray-400 font-mono uppercase text-sm">No schedule for today</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}