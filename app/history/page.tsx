import React from 'react';
import { Calendar, CheckCircle2 } from 'lucide-react';
import SettingsSidebar from '@/components/SettingsSidebar';
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function HistoryPage() {
    const historyTasks = await prisma.task.findMany({
        where: {
            completed: true
        },
        orderBy: {
            updatedAt: 'desc'
        }
    });

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
                            {historyTasks.length === 0 ? (
                                <p className="text-gray-500 dark:text-gray-400 text-center py-10">Belum ada tugas yang diselesaikan.</p>
                            ) : (
                                historyTasks.map((task) => {
                                    const isLate = task.dueDate && new Date(task.updatedAt) > new Date(task.dueDate);

                                    return (
                                        <div key={task.id} className="flex items-center justify-between p-5 bg-gray-50 dark:bg-[#1d1b31] rounded-xl border border-gray-100 dark:border-gray-800 hover:border-blue-500 transition-colors group">
                                            <div className="flex items-start gap-4">
                                                <div className="mt-1 text-green-500 bg-green-100 dark:bg-green-900/20 p-2 rounded-full">
                                                    <CheckCircle2 size={20} />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">{task.title}</h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{task.subject || 'Umum'}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                                                    <Calendar size={14} />
                                                    <span>
                                                        Selesai: {new Date(task.updatedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                    </span>
                                                </div>
                                                <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide ${isLate
                                                        ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                                                        : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                                    }`}>
                                                    {isLate ? 'Terlambat' : 'Selesai'}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
