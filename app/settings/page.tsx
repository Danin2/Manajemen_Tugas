"use client";
import React from 'react';
import { User, Lock, Save, LogOut, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import SettingsSidebar from '@/components/SettingsSidebar';

export default function SettingsPage() {
    return (
        <div className="min-h-screen p-4 md:p-8 pb-20 bg-gray-50 dark:bg-[#0b0a12] font-poppins">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 h-[85vh]">

                <SettingsSidebar activePage="security" />

                {/* Main Content Area */}
                <div className="flex-1 bg-white dark:bg-[#11101d] rounded-[20px] shadow-2xl overflow-y-auto p-8 border border-gray-100 dark:border-gray-800 relative">

                    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Keamanan</h2>
                            <p className="text-gray-500 dark:text-gray-400">Update password dan keamanan akun</p>
                        </div>

                        <form className="space-y-6">
                            <div className="space-y-6 p-6 bg-gray-50/50 dark:bg-[#1d1b31]/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                                        Password Saat Ini
                                    </label>
                                    <div className="relative group">
                                        <input
                                            type="password"
                                            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white dark:bg-[#11101d] border-2 border-transparent focus:border-blue-500 outline-none transition-all font-medium text-gray-700 dark:text-white shadow-sm"
                                            placeholder="••••••••"
                                        />
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                                            Password Baru
                                        </label>
                                        <div className="relative group">
                                            <input
                                                type="password"
                                                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white dark:bg-[#11101d] border-2 border-transparent focus:border-blue-500 outline-none transition-all font-medium text-gray-700 dark:text-white shadow-sm"
                                                placeholder="Minimal 8 karakter"
                                            />
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                                            Konfirmasi Password
                                        </label>
                                        <div className="relative group">
                                            <input
                                                type="password"
                                                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white dark:bg-[#11101d] border-2 border-transparent focus:border-blue-500 outline-none transition-all font-medium text-gray-700 dark:text-white shadow-sm"
                                                placeholder="Ulangi password baru"
                                            />
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2 flex justify-end">
                                <button
                                    type="button"
                                    className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    <Save size={20} />
                                    Update Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
