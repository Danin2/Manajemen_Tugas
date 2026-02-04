// ============================================
// TASK CARD COMPONENT - MINIMALIST UI
// Card untuk menampilkan detail tugas (Bold & Bordered)
// ============================================

import { Task } from '@/lib/types';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({
  task,
  onToggleComplete,
  onEdit,
  onDelete
}: TaskCardProps) {

  // Format tanggal deadline
  const deadlineDate = new Date(task.deadline);
  const formattedDate = deadlineDate.toLocaleDateString('id-ID', {
    weekday: 'short', day: 'numeric', month: 'short'
  });
  const formattedTime = deadlineDate.toLocaleTimeString('id-ID', {
    hour: '2-digit', minute: '2-digit'
  });

  const isOverdue = new Date() > deadlineDate && !task.isCompleted;

  // Priority "Badge" (Simple text or border based)
  const getPriorityStyle = (p: string) => {
    switch (p) {
      case 'Tinggi': return 'text-red-600 dark:text-red-400 font-bold uppercase';
      case 'Sedang': return 'text-yellow-600 dark:text-yellow-400 font-bold uppercase';
      case 'Rendah': return 'text-green-600 dark:text-green-400 font-bold uppercase';
      default: return 'text-gray-600 font-bold uppercase';
    }
  };

  return (
    <div
      className={`
        relative
        bg-white dark:bg-gray-950
        border-2 
        ${task.isCompleted
          ? 'border-gray-200 dark:border-gray-800 opacity-60'
          : isOverdue
            ? 'border-red-500 dark:border-red-500'
            : 'border-black dark:border-white'
        }
        p-5
        transition-all duration-200
        hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
        dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]
        group
      `}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4 gap-4">
        <div className="flex items-start gap-3 flex-1">
          {/* Checkbox */}
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`
              shrink-0 mt-1 w-6 h-6 border-2 
              flex items-center justify-center
              transition-colors
              ${task.isCompleted
                ? 'bg-black dark:bg-white border-black dark:border-white'
                : 'border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-800'
              }
            `}
          >
            {task.isCompleted && (
              <svg className="w-4 h-4 text-white dark:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          {/* Title & Subject */}
          <div className="min-w-0">
            <h3
              className={`
                text-lg font-bold leading-tight uppercase
                ${task.isCompleted
                  ? 'line-through decoration-2 decoration-black dark:decoration-white'
                  : 'text-black dark:text-white'
                }
              `}
            >
              {task.title}
            </h3>
            <p className="text-xs font-mono font-bold mt-1 text-gray-500 dark:text-gray-400 uppercase tracking-widest">
              {task.subject}
            </p>
          </div>
        </div>

        {/* Priority */}
        <span className={`text-[10px] tracking-widest border border-current px-2 py-0.5 ${getPriorityStyle(task.priority)}`}>
          {task.priority === 'Tinggi' ? '!!!' : task.priority}
        </span>
      </div>

      {/* Footer info */}
      <div className="mt-4 pt-4 border-t-2 border-gray-100 dark:border-gray-900 flex justify-between items-end">
        <div className={`text-xs font-bold font-mono ${isOverdue ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
          <span className="block uppercase tracking-wider text-[10px] text-gray-400">Deadline</span>
          {formattedDate} • {formattedTime}
        </div>

        {/* Action Buttons (Reveal on Hover) */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="px-3 py-1 bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase hover:opacity-80 transition-opacity"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="px-3 py-1 border-2 border-black dark:border-white text-black dark:text-white text-xs font-bold uppercase hover:bg-red-500 hover:text-white hover:border-red-500 dark:hover:bg-red-500 dark:hover:border-red-500 transition-colors"
          >
            Del
          </button>
        </div>
      </div>
    </div>
  );
}