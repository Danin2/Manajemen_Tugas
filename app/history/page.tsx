"use client";
import React from 'react';
import { Calendar, CheckCircle2 } from 'lucide-react';
import SettingsSidebar from '@/components/SettingsSidebar';

export default function HistoryPage() {
    const historyTasks = [
        { id: 1, title: 'Menyelesaikan Laporan PKL', subject: 'Bahasa Indonesia', date: '2023-10-15', status: 'Selesai' },
        { id: 2, title: 'Membuat Website Portofolio', subject: 'Pemrograman Web', date: '2023-10-10', status: 'Selesai' },
        { id: 3, title: 'Presentasi Project Akhir', subject: 'Kewirausahaan', date: '2023-10-05', status: 'Selesai' },
        { id: 4, title: 'Ujian Praktik Basis Data', subject: 'Basis Data', date: '2023-09-28', status: 'Selesai' },
    ];

    return (
        <div className="min-h-screen p-4 md:p-8 pb-20 bg-gray-50 dark:bg-[#0b0a12] font-poppins">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 h-[85vh]">

                <SettingsSidebar activePage="history" />

                {/* Main Content Area */}
                <div className="flex-1 bg-white dark:bg-[#11101d] rounded-[20px] shadow-2xl overflow-y-auto p-8 border border-gray-100 dark:border-gray-800 relative">

                    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Riwayat Tugas</h2>
                            <p className="text-gray-500 dark:text-gray-400">Daftar tugas yang telah anda selesaikan</p>
                        </div>

                        <div className="space-y-4">
                            {historyTasks.map((task) => (
                                <div key={task.id} className="flex items-center justify-between p-5 bg-gray-50 dark:bg-[#1d1b31] rounded-xl border border-gray-100 dark:border-gray-800 hover:border-blue-500 transition-colors group">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 text-green-500 bg-green-100 dark:bg-green-900/20 p-2 rounded-full">
                                            <CheckCircle2 size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">{task.title}</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{task.subject}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                                            <Calendar size={14} />
                                            <span>{task.date}</span>
                                        </div>
                                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full uppercase tracking-wide">
                                            {task.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
