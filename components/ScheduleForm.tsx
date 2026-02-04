'use client';

import { useState, useEffect } from 'react';
import { Schedule, Day, Subject } from '@/lib/types';
import { generateId } from '@/lib/localStorage';

interface ScheduleFormProps {
  schedule?: Schedule;
  onSubmit: (schedule: Schedule) => void;
  onCancel: () => void;
}

export default function ScheduleForm({ schedule, onSubmit, onCancel }: ScheduleFormProps) {
  const [day, setDay] = useState<Day>('Senin');
  // ✅ FIX BARIS 22: Ubah dari string ke Subject | ''
  const [subject, setSubject] = useState<Subject | ''>('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [room, setRoom] = useState('');

  const days: Day[] = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

  const subjects: Subject[] = [
    "Matematika", "Bahasa Indonesia", "Bahasa Inggris", "Fisika", "Kimia", "Biologi",
    "Sejarah", "Geografi", "Ekonomi", "PKL", "PPKN", "Penjaskes", "Seni Budaya",
    "Produktif TKJ", "Produktif RPL", "Lainnya"
  ];

  useEffect(() => {
    if (schedule) {
      setDay(schedule.day);
      setSubject(schedule.subject);
      setStartTime(schedule.startTime);
      setEndTime(schedule.endTime);
      setRoom(schedule.room || '');
    }
  }, [schedule]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !startTime || !endTime) {
      alert('Mohon lengkapi data!');
      return;
    }
    if (startTime >= endTime) {
      alert('Waktu selesai harus > mulai!');
      return;
    }

    // ✅ FIX BARIS 57: Cast subject ke Subject type
    const scheduleData: Schedule = {
      id: schedule?.id || generateId('schedule'),
      day,
      subject: subject as Subject,  // ✅ Tambahkan type assertion
      startTime,
      endTime,
      room: room.trim() || undefined,
    };

    onSubmit(scheduleData);
  };

  const inputClass = "w-full px-4 py-3 border-2 border-black dark:border-white bg-transparent text-black dark:text-white focus:outline-none focus:ring-4 focus:ring-black/10 dark:focus:ring-white/10 font-bold";
  const labelClass = "block text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-2">

      {/* Hari */}
      <div>
        <label className={labelClass}>Hari</label>
        <div className="flex flex-wrap gap-2">
          {days.map((d) => {
            const isSelected = day === d;
            return (
              <button
                key={d}
                type="button"
                onClick={() => setDay(d)}
                className={`
                  px-3 py-2 text-xs font-black uppercase tracking-wider border-2
                  transition-colors
                  ${isSelected
                    ? 'bg-black border-black text-white dark:bg-white dark:border-white dark:text-black'
                    : 'bg-transparent border-gray-200 dark:border-gray-800 text-gray-500 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white'
                  }
                `}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mata Pelajaran */}
      <div>
        <label className={labelClass}>Mata Pelajaran</label>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value as Subject | '')}
          className={`${inputClass} dark:bg-[#1d1b31]`}
        >
          <option value="" className="bg-white dark:bg-[#1d1b31]">-- PILIH MAPEL --</option>
          {subjects.map(subj => (
            <option key={subj} value={subj} className="bg-white dark:bg-[#1d1b31]">{subj}</option>
          ))}
        </select>
      </div>

      {/* Waktu */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Mulai</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Selesai</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {/* Ruangan */}
      <div>
        <label className={labelClass}>Ruangan (Opsional)</label>
        <input
          type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="LAB 1"
          className={inputClass}
        />
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
          {schedule ? 'Simpan' : 'Tambah'}
        </button>
      </div>
    </form>
  );
}