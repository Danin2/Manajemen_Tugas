// ============================================
// SCHEDULE CARD COMPONENT - MINIMALIST UI
// Card untuk menampilkan 1 jadwal pelajaran
// ============================================

import { Schedule } from '@/lib/types';

interface ScheduleCardProps {
  schedule: Schedule;
  onEdit: (schedule: Schedule) => void;
  onDelete: (id: string) => void;
}

export default function ScheduleCard({ schedule, onEdit, onDelete }: ScheduleCardProps) {

  return (
    <div className="
      group relative 
      bg-white dark:bg-gray-950 
      border-2 border-black dark:border-white 
      p-6
      transition-all duration-300 
      hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
      dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]
      hover:-translate-y-1
    ">

      {/* Day Badge */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 text-xs font-black uppercase tracking-widest border border-black dark:border-white">
          {schedule.day}
        </span>
      </div>

      {/* Subject */}
      <h3 className="text-2xl font-black text-black dark:text-white mb-2 uppercase tracking-tighter leading-none">
        {schedule.subject}
      </h3>

      {/* Time */}
      <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4 font-mono text-sm font-bold">
        <span>{schedule.startTime}</span>
        <span className="mx-2">-</span>
        <span>{schedule.endTime}</span>
      </div>

      {/* Room (optional) */}
      {schedule.room && (
        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-6">
          <span className="font-bold text-xs uppercase tracking-wider border-b-2 border-dotted border-gray-400">
            📍 {schedule.room}
          </span>
        </div>
      )}

      {/* Actions (Hidden by default, shown on hover/group) */}
      <div className="flex gap-3 pt-4 border-t-2 border-gray-100 dark:border-gray-900 opacity-60 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(schedule)}
          className="flex-1 px-4 py-2 bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase transition-transform hover:-translate-y-0.5"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(schedule.id)}
          className="flex-1 px-4 py-2 border-2 border-black dark:border-white text-black dark:text-white text-xs font-bold uppercase hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}