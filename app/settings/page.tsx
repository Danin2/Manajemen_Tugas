"use client";
import React from 'react';
import { User, Lock, Save, LogOut, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
    return (
        <div className="min-h-screen p-4 md:p-8 pb-20 bg-gray-50 dark:bg-[#0b0a12] font-poppins">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 h-[85vh]">

                {/* Sidebar Navigation - CodingLab Style */}
                <aside className="w-full md:w-72 bg-[#11101d] text-white rounded-[20px] flex flex-col shadow-2xl overflow-hidden flex-shrink-0">
                    <div className="p-6 flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-xl">S</span>
                        </div>
                        <span className="text-xl font-bold tracking-wide">Settings</span>
                    </div>

                    <nav className="flex-1 px-4 py-4 space-y-2">
                        {/* Dashboard Link to return home */}
                        <Link href="/" className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:text-white transition-colors duration-200 group">
                            <LayoutDashboard size={20} className="group-hover:scale-110 transition-transform" />
                            <span className="font-medium">Dashboard</span>
                        </Link>

                        <div className="h-px bg-gray-700 my-4 mx-2"></div>

                        <Link
                            href="/profile"
                            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all duration-300 text-gray-400 hover:text-white hover:bg-gray-800/50"
                        >
                            <User size={20} />
                            <span>Profil Saya</span>
                        </Link>

                        <Link
                            href="/settings"
                            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all duration-300 bg-white text-[#11101d] shadow-lg transform translate-x-1"
                        >
                            <Lock size={20} className="animate-pulse" />
                            <span>Ganti Password</span>
                        </Link>
                    </nav>

                    {/* Bottom User Section */}
                    <div className="p-4 bg-[#1d1b31] mt-auto">
                        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md group-hover:scale-105 transition-transform">
                                <User size={18} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-white truncate">Siswa SMK</p>
                                <p className="text-xs text-gray-400 truncate">siswa@smk.sch.id</p>
                            </div>
                            <LogOut size={18} className="text-gray-400 group-hover:text-red-400 transition-colors" />
                        </div>
                    </div>
                </aside>

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
