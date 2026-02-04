"use client";
import React from 'react';
import { User, Lock, Camera, Mail, AtSign, Save, LogOut, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
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
                            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all duration-300 bg-white text-[#11101d] shadow-lg transform translate-x-1"
                        >
                            <User size={20} className="animate-pulse" />
                            <span>Profil Saya</span>
                        </Link>

                        <Link
                            href="/settings"
                            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all duration-300 text-gray-400 hover:text-white hover:bg-gray-800/50"
                        >
                            <Lock size={20} />
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

                    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">

                        {/* Profile Header */}
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-8 border-b border-gray-100 dark:border-gray-800">
                            <div className="relative group">
                                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-2xl ring-4 ring-white dark:ring-[#1d1b31] overflow-hidden">
                                    {/* <img src="/avatar-placeholder.jpg" alt="Avatar" className="w-full h-full object-cover" /> */}
                                    <User size={48} />
                                </div>
                                <button className="absolute bottom-0 right-0 p-2.5 bg-white text-[#11101d] rounded-full shadow-lg hover:scale-110 transition-transform border-2 border-transparent hover:border-blue-500">
                                    <Camera size={18} />
                                </button>
                            </div>

                            <div className="flex-1 text-center sm:text-left space-y-2">
                                <div className="flex flex-col sm:flex-row items-center gap-3">
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Siswa SMK</h2>
                                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider rounded-full border border-blue-200 dark:border-blue-800">
                                        Siswa
                                    </span>
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 font-medium">@siswa_smk</p>
                                <p className="text-sm text-gray-400 dark:text-gray-500 max-w-md">
                                    Pelajar rajin yang sedang menempuh pendidikan di SMK Jurusan RPL.
                                </p>
                            </div>

                            <button className="px-5 py-2.5 bg-gray-100 dark:bg-[#1d1b31] text-gray-700 dark:text-white font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-[#25233b] transition-colors border border-transparent dark:border-gray-800">
                                Edit Profil
                            </button>
                        </div>

                        {/* Personal Info Form */}
                        <form className="space-y-8">
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                                    Informasi Pribadi
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Nama Lengkap */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                                            Nama Lengkap
                                        </label>
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                defaultValue="Siswa SMK"
                                                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50 dark:bg-[#1d1b31] border-2 border-gray-100 dark:border-gray-800 focus:bg-white dark:focus:bg-[#1d1b31] focus:border-blue-500 outline-none transition-all font-medium text-gray-700 dark:text-white"
                                            />
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                                        </div>
                                    </div>

                                    {/* Username */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                                            Username
                                        </label>
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                defaultValue="siswa_smk"
                                                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50 dark:bg-[#1d1b31] border-2 border-gray-100 dark:border-gray-800 focus:bg-white dark:focus:bg-[#1d1b31] focus:border-blue-500 outline-none transition-all font-medium text-gray-700 dark:text-white"
                                            />
                                            <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                                            Email
                                        </label>
                                        <div className="relative group">
                                            <input
                                                type="email"
                                                defaultValue="siswa@smk.sch.id"
                                                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50 dark:bg-[#1d1b31] border-2 border-gray-100 dark:border-gray-800 focus:bg-white dark:focus:bg-[#1d1b31] focus:border-blue-500 outline-none transition-all font-medium text-gray-700 dark:text-white"
                                            />
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                                        </div>
                                    </div>

                                    {/* Phone (Optional) */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                                            Nomor HP <span className="text-gray-400 font-normal">(Opsional)</span>
                                        </label>
                                        <div className="relative group">
                                            <input
                                                type="tel"
                                                placeholder="081234567890"
                                                className="w-full pl-4 pr-4 py-3.5 rounded-xl bg-gray-50 dark:bg-[#1d1b31] border-2 border-gray-100 dark:border-gray-800 focus:bg-white dark:focus:bg-[#1d1b31] focus:border-blue-500 outline-none transition-all font-medium text-gray-700 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Date of Birth (Optional) */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                                            Tanggal Lahir <span className="text-gray-400 font-normal">(Opsional)</span>
                                        </label>
                                        <div className="relative group">
                                            <input
                                                type="date"
                                                className="w-full pl-4 pr-4 py-3.5 rounded-xl bg-gray-50 dark:bg-[#1d1b31] border-2 border-gray-100 dark:border-gray-800 focus:bg-white dark:focus:bg-[#1d1b31] focus:border-blue-500 outline-none transition-all font-medium text-gray-700 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Bio */}
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                                            Bio Singkat
                                        </label>
                                        <div className="relative group">
                                            <textarea
                                                rows={4}
                                                placeholder="Tulis sedikit tentang diri anda..."
                                                className="w-full pl-4 pr-4 py-3.5 rounded-xl bg-gray-50 dark:bg-[#1d1b31] border-2 border-gray-100 dark:border-gray-800 focus:bg-white dark:focus:bg-[#1d1b31] focus:border-blue-500 outline-none transition-all font-medium text-gray-700 dark:text-white resize-none"
                                            ></textarea>
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
                                    Simpan Perubahan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
