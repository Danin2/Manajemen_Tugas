"use client";
import React, { useEffect, useState } from 'react';
import { User, Lock, Mail, Clock, Bell, LogOut, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SettingsSidebarProps {
    activePage: 'profile' | 'email' | 'security' | 'history' | 'notifications';
}

export default function SettingsSidebar({ activePage }: SettingsSidebarProps) {
    const router = useRouter();
    const [userName, setUserName] = useState('User');
    const [userEmail, setUserEmail] = useState('');
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    useEffect(() => {
        let isMounted = true;
        async function loadMe() {
            try {
                const response = await fetch('/api/auth/me');
                const data = await response.json();
                if (!response.ok) {
                    return;
                }
                if (isMounted) {
                    setUserName(data?.user?.name || 'User');
                    setUserEmail(data?.user?.email || '');
                }
            } catch {
                // Silent fail; middleware handles unauth.
            } finally {
                if (isMounted) {
                    setIsLoadingUser(false);
                }
            }
        }
        loadMe();
        return () => {
            isMounted = false;
        };
    }, []);

    async function handleLogout() {
        if (isLoggingOut) return;
        setIsLoggingOut(true);
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
        } catch {
            // Ignore logout errors and still redirect.
        } finally {
            router.push('/login');
            router.refresh();
            setIsLoggingOut(false);
        }
    }

    const menuItems = [
        { id: 'profile', label: 'Profil Saya', icon: User, href: '/profile' },
        { id: 'security', label: 'Akun & Keamanan', icon: Lock, href: '/settings' },
        { id: 'history', label: 'Riwayat Tugas', icon: Clock, href: '/history' },
        { id: 'notifications', label: 'Notifikasi', icon: Bell, href: '/notifications' },
    ];

    return (
        <aside className="w-full md:w-72 bg-[#11101d] text-white rounded-[20px] flex flex-col shadow-2xl overflow-hidden flex-shrink-0 transition-all duration-300">
            <div className="p-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">S</span>
                </div>
                <span className="text-xl font-bold tracking-wide">Pengaturan</span>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-2">
                {/* Dashboard Link to return home */}
                <Link href="/" className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:text-white transition-colors duration-200 group">
                    <LayoutDashboard size={20} className="group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Dashboard</span>
                </Link>

                <div className="h-px bg-gray-700 my-4 mx-2"></div>

                {menuItems.map((item) => {
                    const isActive = activePage === item.id;
                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${isActive
                                    ? 'bg-white text-[#11101d] shadow-lg transform translate-x-1'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                                }`}
                        >
                            <item.icon size={20} className={isActive ? "animate-pulse" : ""} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom User Section */}
            <div className="p-4 bg-[#1d1b31] mt-auto">
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md group-hover:scale-105 transition-transform">
                        <User size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">
                            {isLoadingUser ? 'Memuat...' : userName}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                            {isLoadingUser ? 'Mengambil email...' : (userEmail || '-')}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="text-gray-400 hover:text-red-400 transition-colors disabled:opacity-50"
                        aria-label="Keluar"
                        title="Keluar"
                    >
                        <LogOut size={18} />
                    </button>
                </div>
            </div>
        </aside>
    );
}
