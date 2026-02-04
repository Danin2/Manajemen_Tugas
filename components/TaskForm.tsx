// ============================================
// TASK FORM COMPONENT - MINIMALIST UI
// Form untuk tambah/edit tugas (Bold & Square)
// ============================================

'use client';

import { useState, useEffect } from 'react';
import { Task, Subject } from '@/lib/types';
import { generateId } from '@/lib/localStorage';

interface TaskFormProps {
  task?: Task;
  onSubmit: (task: Task) => void;
  onCancel: () => void;
}

export default function TaskForm({ task, onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState<Subject | ''>('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState<'Rendah' | 'Sedang' | 'Tinggi'>('Sedang');

  const subjects: Subject[] = [
    "Matematika", "Bahasa Indonesia", "Bahasa Inggris", "Fisika", "Kimia", "Biologi",
    "Sejarah", "Geografi", "Ekonomi", "PKL", "PPKN", "Penjaskes", "Seni Budaya",
    "Produktif TKJ", "Produktif RPL", "Lainnya"
  ];

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setSubject(task.subject);
      setDeadline(new Date(task.deadline).toISOString().slice(0, 16));
      setPriority(task.priority);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !subject || !deadline) {
      alert('Mohon lengkapi data!');
      return;
    }

    const taskData: Task = {
      id: task?.id || generateId('task'),
      title: title.trim(),
      subject: subject as Subject,
      deadline: new Date(deadline).toISOString(),
      priority,
      isCompleted: task?.isCompleted || false,
      createdAt: task?.createdAt || new Date().toISOString().split('T')[0]
    };

    onSubmit(taskData);
  };

  const inputClass = "w-full px-4 py-3 border-2 border-black dark:border-white bg-transparent text-black dark:text-white focus:outline-none focus:ring-4 focus:ring-black/10 dark:focus:ring-white/10 font-bold max-w-full";
  const labelClass = "block text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-8 mt-2">

      {/* Nama Tugas */}
      <div>
        <label className={labelClass}>Nama Tugas</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="CONTOH: TUGAS AKHIR"
          className={inputClass}
          autoFocus
        />
      </div>

      {/* Mata Pelajaran */}
      <div>
        <label className={labelClass}>Mata Pelajaran</label>
        <select
          value={subject}
         onChange={(e) => setSubject(e.target.value as Subject | '')}
          className={`${inputClass} bg-white dark:bg-gray-900`}
        >
          <option value="" className="bg-white dark:bg-gray-900 text-black dark:text-white">-- PILIH MAPEL --</option>
          {subjects.map(subj => (
            <option key={subj} value={subj} className="bg-white dark:bg-gray-900 text-black dark:text-white">{subj}</option>
          ))}
        </select>
      </div>

      {/* Deadline */}
      <div>
        <label className={labelClass}>Deadline</label>
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Prioritas */}
      <div>
        <label className={labelClass}>Prioritas</label>
        <div className="grid grid-cols-3 gap-0 border-2 border-black dark:border-white">
          {(['Rendah', 'Sedang', 'Tinggi'] as const).map((p) => {
            const isSelected = priority === p;
            return (
              <button
                key={p}
                type="button"
                onClick={() => setPriority(p)}
                className={`
                px-2 py-3 font-black uppercase tracking-wider text-xs
                transition-colors
                ${isSelected
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'bg-transparent text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  }
              `}
              >
                {p}
              </button>
            )
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4 border-t-4 border-black dark:border-white">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-4 border-2 border-transparent hover:border-black dark:hover:border-white font-black uppercase tracking-widest text-sm transition-colors"
        >
          Batal
        </button>
        <button
          type="submit"
          className="flex-1 py-4 bg-black text-white dark:bg-white dark:text-black font-black uppercase tracking-widest text-sm hover:opacity-80 transition-opacity"
        >
          {task ? 'Simpan' : 'Tambah'}
        </button>
      </div>
    </form>
  );
}