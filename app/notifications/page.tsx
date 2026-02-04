"use client";
import React from 'react';
import { Bell, Clock, AlertCircle, Info } from 'lucide-react';
import SettingsSidebar from '@/components/SettingsSidebar';

export default function NotificationsPage() {
    const notifications = [
        { id: 1, title: 'Tugas "Basis Data" akan tenggat besok!', time: '1 jam yang lalu', type: 'warning' },
        { id: 2, title: 'Password anda berhasil diubah', time: 'Hari ini, 09:30', type: 'success' },
        { id: 3, title: 'Selamat Datang di SMK Task Manager', time: 'Kemarin', type: 'info' },
    ];

    const getIcon = (type: string) => {
        switch (type) {
            case 'warning': return <AlertCircle size={20} className="text-orange-500" />;
            case 'success': return <Bell size={20} className="text-green-500" />;
            default: return <Info size={20} className="text-blue-500" />;
        }
    };

    const getBgColor = (type: string) => {
        switch (type) {
            case 'warning': return 'bg-orange-100 dark:bg-orange-900/20';
            case 'success': return 'bg-green-100 dark:bg-green-900/20';
            default: return 'bg-blue-100 dark:bg-blue-900/20';
        }
    }

    return (
        <div className="min-h-screen p-4 md:p-8 pb-20 bg-gray-50 dark:bg-[#0b0a12] font-poppins">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 h-[85vh]">

                <SettingsSidebar activePage="notifications" />

                {/* Main Content Area */}
                <div className="flex-1 bg-white dark:bg-[#11101d] rounded-[20px] shadow-2xl overflow-y-auto p-8 border border-gray-100 dark:border-gray-800 relative">

                    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Notifikasi</h2>
                                <p className="text-gray-500 dark:text-gray-400">Pemberitahuan terbaru anda</p>
                            </div>
                            <button className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                                Tandai semua dibaca
                            </button>
                        </div>

                        <div className="space-y-4">
                            {notifications.map((notif) => (
                                <div key={notif.id} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-[#25233b] transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0 cursor-pointer">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${getBgColor(notif.type)}`}>
                                        {getIcon(notif.type)}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900 dark:text-white">{notif.title}</h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                                            <Clock size={12} />
                                            {notif.time}
                                        </p>
                                    </div>
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
