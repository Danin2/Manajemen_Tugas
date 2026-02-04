"use client";
import React from 'react';
import Link from 'next/link';
import { User, LogOut, Settings } from 'lucide-react';

const UserProfile = () => {
    return (
        <div className="relative group cursor-pointer z-50">
            {/* Glow Effect Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-300"></div>

            {/* Main Container */}
            <div className="relative w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center transform group-hover:scale-105 transition duration-300 border border-white/20 shadow-lg overflow-hidden">
                {/* Fallback Initials / Icon if no image */}
                <span className="text-white font-bold text-sm tracking-widest flex items-center justify-center">
                    <User size={20} strokeWidth={2.5} />
                </span>
            </div>

            {/* Dropdown Menu */}
            <div className="absolute top-full right-0 mt-4 w-64 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 border border-white/20 dark:border-gray-700 overflow-hidden ring-1 ring-black/5">

                {/* User Info Header */}
                <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10">
                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate">Siswa SMK</p>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate mt-0.5">siswa@smk.sch.id</p>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                    <Link href="/profile" className="flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <User size={16} />
                        <span>Profil Saya</span>
                    </Link>

                    <Link href="/settings" className="flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                        <Settings size={16} />
                        <span>Pengaturan</span>
                    </Link>
                </div>

                {/* Footer Actions */}
                <div className="border-t border-gray-100 dark:border-gray-800 py-2">
                    <button className="w-full flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        <LogOut size={16} />
                        <span>Keluar</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
