// ============================================
// SCHEDULE PAGE - MODERN UI
// Halaman untuk menampilkan & kelola jadwal
// ============================================

'use client';

import { useState, useEffect } from 'react';
import { Schedule, Day } from '@/lib/types';
import ScheduleCard from '@/components/ScheduleCard';
import Modal from '@/components/Modal';
import ScheduleForm from '@/components/ScheduleForm';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function SchedulePage() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // View mode: 'week' atau 'day'
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
  const [selectedDay, setSelectedDay] = useState<Day>('Senin');

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | undefined>(undefined);

  const days: Day[] = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

  // Load data dari API
  useEffect(() => {
    fetchSchedules();

    // Set selectedDay ke hari ini
    const today = days[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
    setSelectedDay(today);
  }, []);

  const fetchSchedules = async () => {
    try {
      const res = await fetch('/api/schedules');
      const json = await res.json();

      const schedulesNormalized: Schedule[] = (json.data || []).map((s: any) => ({
        id: s.id ?? s._id ?? String(s._id ?? ''),
        day: s.day,
        subject: s.subject,
        startTime: s.startTime,
        endTime: s.endTime,
        room: s.room,
      }));

      setSchedules(schedulesNormalized);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handler Functions
  const handleAddNew = () => {
    setEditingSchedule(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin mau hapus jadwal ini?')) return;

    try {
      await fetch(`/api/schedules?id=${id}`, { method: 'DELETE' });
      setSchedules(schedules.filter(s => s.id !== id));
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };

  const handleFormSubmit = async (scheduleData: Schedule) => {
    try {
      if (editingSchedule) {
        // Update
        await fetch('/api/schedules', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(scheduleData),
        });
        setSchedules(schedules.map(s => s.id === scheduleData.id ? scheduleData : s));
      } else {
        // Create
        const res = await fetch('/api/schedules', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(scheduleData),
        });
        const json = await res.json();
        setSchedules([...schedules, json.data]);
      }

      setIsModalOpen(false);
      setEditingSchedule(undefined);
    } catch (error) {
      console.error('Error saving schedule:', error);
    }
  };

  const handleFormCancel = () => {
    setIsModalOpen(false);
    setEditingSchedule(undefined);
  };

  // Sort by time
  const sortedSchedules = [...schedules].sort((a, b) =>
    a.startTime.localeCompare(b.startTime)
  );

  // Group by day (untuk week view)
  const schedulesByDay: Record<Day, Schedule[]> = {
    Senin: [],
    Selasa: [],
    Rabu: [],
    Kamis: [],
    Jumat: [],
    Sabtu: [],
    Minggu: [],
  };

  sortedSchedules.forEach(s => {
    schedulesByDay[s.day].push(s);
  });

  if (isLoading) {
    return <LoadingSpinner message="Memuat jadwal..." />;
  }

  // View Mode Helpers
  // Since we replaced list/grid logic with custom UI, we might handle 'day' and 'week' differently
  // For now, mapping 'list' to 'Week View with Boxes' and 'grid' to 'Table View'
  const isListView = viewMode === 'week'; // reusing existing state variable names even if UI text says 'List' vs 'Grid'

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 p-6 md:p-12 transition-colors duration-300">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h1 className="text-6xl md:text-8xl font-black text-black dark:text-white tracking-tighter uppercase leading-[0.9]">
            Jadwal
          </h1>
          <div className="h-2 w-24 bg-blue-600 mt-6 mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 text-xl max-w-2xl font-light">
            Jadwal mingguan Anda. Rencanakan sebelumnya. Jangan pernah melewatkan kelas.</p>
        </div>

        {/* View Toggle */}
        <div className="flex border-2 border-black dark:border-white">
          <button
            onClick={() => setViewMode('week')}
            className={`px-6 py-3 font-bold uppercase tracking-wider text-sm transition-colors ${viewMode === 'week'
                ? 'bg-black text-white dark:bg-white dark:text-black'
                : 'bg-transparent text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900'
              }`}
          >
            Tampilan List
          </button>
          <button
            onClick={() => setViewMode('day')}
            className={`px-6 py-3 font-bold uppercase tracking-wider text-sm transition-colors ${viewMode === 'day'
                ? 'bg-black text-white dark:bg-white dark:text-black'
                : 'bg-transparent text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 border-l-2 border-black dark:border-white'
              }`}
          >
            Tampilan Kotak
          </button>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner message="LOADING..." />
      ) : (
        <>
          {viewMode === 'week' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].map(d_str => {
                const day = d_str as Day;
                const daySchedules = schedules.filter(s => s.day === day);
                if (daySchedules.length === 0) return null;

                return (
                  <div key={day} className="flex flex-col">
                    <div className="border-b-4 border-black dark:border-white mb-6 pb-2">
                      <h2 className="text-4xl font-black text-black dark:text-white uppercase tracking-tighter">
                        {day}
                      </h2>
                    </div>

                    <div className="space-y-4">
                      {daySchedules
                        .sort((a, b) => a.startTime.localeCompare(b.startTime))
                        .map(schedule => (
                          <div
                            key={schedule.id}
                            className="group p-5 border-2 border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-all bg-white dark:bg-gray-900 relative"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <p className="font-mono text-sm font-bold text-gray-500 dark:text-gray-400">
                                {schedule.startTime} - {schedule.endTime}
                              </p>
                              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => handleEdit(schedule)}
                                  className="text-xs font-bold uppercase hover:text-blue-600"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(schedule.id)}
                                  className="text-xs font-bold uppercase hover:text-red-600"
                                >
                                  Del
                                </button>
                              </div>
                            </div>
                            <h3 className="text-xl font-bold text-black dark:text-white uppercase leading-none mb-2">
                              {schedule.subject}
                            </h3>
                            {schedule.room && (
                              <p className="text-sm font-mono text-gray-400 dark:text-gray-500 uppercase">
                                RM {schedule.room}
                              </p>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // Grid View - Clean Table Style (Mapped to 'day' state)
            <div className="overflow-x-auto border-2 border-black dark:border-white">
              <div className="grid grid-cols-7 min-w-[1000px] divide-x-2 divide-black dark:divide-white">
                {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].map(d_str => {
                  const day = d_str as Day;
                  return (
                    <div key={day} className="bg-white dark:bg-gray-950">
                      <div className="p-4 bg-black dark:bg-white text-white dark:text-black text-center font-bold uppercase tracking-widest text-sm">
                        {day}
                      </div>
                      <div className="p-2 space-y-2 min-h-[300px]">
                        {schedules
                          .filter(s => s.day === day)
                          .sort((a, b) => a.startTime.localeCompare(b.startTime))
                          .map(schedule => (
                            <div
                              key={schedule.id}
                              className="p-3 border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-colors cursor-pointer group"
                              onClick={() => handleEdit(schedule)}
                            >
                              <p className="text-[10px] font-mono font-bold text-gray-500 dark:text-gray-400 mb-1">
                                {schedule.startTime}
                              </p>
                              <p className="font-bold text-sm text-black dark:text-white uppercase leading-tight">
                                {schedule.subject}
                              </p>
                              {schedule.room && (
                                <p className="text-[10px] text-gray-400 mt-1 uppercase truncate">
                                  {schedule.room}
                                </p>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {schedules.length === 0 && (
            <div className="py-24 border-2 border-dashed border-gray-200 dark:border-gray-800 text-center">
              <h3 className="text-2xl font-black text-gray-300 dark:text-gray-700 uppercase tracking-tight mb-4">
                Schedule Empty
              </h3>
              <p className="text-gray-400 dark:text-gray-600 font-mono text-sm max-w-md mx-auto mb-8">
                Setup your weekly routine.
              </p>
            </div>
          )}
        </>
      )}

      {/* Floating Add Button */}
      <button
        onClick={handleAddNew}
        className="fixed bottom-8 right-8 w-16 h-16 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-lg flex items-center justify-center text-4xl hover:scale-110 transition-transform z-30"
        aria-label="Add Schedule"
      >
        ＋
      </button>

      {/* Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleFormCancel}
        title={editingSchedule ? 'EDIT SCHEDULE' : 'TAMBAH JADWAL'}
      >
        <ScheduleForm
          schedule={editingSchedule}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      </Modal>
    </main>
  );
}