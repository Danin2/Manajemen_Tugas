"use client";
import React, { useEffect, useState } from 'react';
import { Lock, Save, Mail, Eye, EyeOff } from 'lucide-react';
import SettingsSidebar from '@/components/SettingsSidebar';

export default function SettingsPage() {
    const [email, setEmail] = useState('');
    const [isLoadingEmail, setIsLoadingEmail] = useState(true);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

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
                    setEmail(data?.user?.email || '');
                }
            } catch {
                // Keep silent; middleware should handle unauth users.
            } finally {
                if (isMounted) {
                    setIsLoadingEmail(false);
                }
            }
        }
        loadMe();
        return () => {
            isMounted = false;
        };
    }, []);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setMessage(null);
        setError(null);

        if (!oldPassword || !newPassword || !confirmPassword) {
            setError('Semua field password wajib diisi.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Konfirmasi password tidak cocok.');
            return;
        }

        try {
            setIsSaving(true);
            const response = await fetch('/api/change-password', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    oldPassword,
                    newPassword,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                setError(data?.error || 'Gagal menyimpan perubahan.');
                return;
            }

            setMessage('Password berhasil diganti.');
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            setError('Terjadi kesalahan. Coba lagi.');
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <div className="min-h-screen p-4 md:p-8 pb-20 bg-gray-50 dark:bg-[#0b0a12] font-poppins">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 h-[85vh]">
                <SettingsSidebar activePage="security" />

                <div className="flex-1 bg-white dark:bg-[#11101d] rounded-[20px] shadow-2xl overflow-y-auto p-8 border border-gray-100 dark:border-gray-800 relative">
                    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Akun & Keamanan</h2>
                            <p className="text-gray-500 dark:text-gray-400">Update email dan password akun anda</p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-6 p-6 bg-gray-50/50 dark:bg-[#1d1b31]/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                                        Email Address
                                    </label>
                                    <div className="relative group">
                                        <input
                                            type="email"
                                            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white dark:bg-[#11101d] border-2 border-transparent focus:border-blue-500 outline-none transition-all font-medium text-gray-700 dark:text-white shadow-sm"
                                            placeholder={isLoadingEmail ? 'Memuat email...' : 'nama@email.com'}
                                            value={email}
                                            readOnly
                                        />
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                                        Password Saat Ini
                                    </label>
                                    <div className="relative group">
                                        <input
                                            type={showOld ? 'text' : 'password'}
                                            className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-white dark:bg-[#11101d] border-2 border-transparent focus:border-blue-500 outline-none transition-all font-medium text-gray-700 dark:text-white shadow-sm"
                                            placeholder="********"
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                        />
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                                        <button
                                            type="button"
                                            onClick={() => setShowOld((prev) => !prev)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                            aria-label={showOld ? 'Sembunyikan password' : 'Lihat password'}
                                        >
                                            {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                                            Password Baru
                                        </label>
                                        <div className="relative group">
                                            <input
                                                type={showNew ? 'text' : 'password'}
                                                className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-white dark:bg-[#11101d] border-2 border-transparent focus:border-blue-500 outline-none transition-all font-medium text-gray-700 dark:text-white shadow-sm"
                                                placeholder="Minimal 8 karakter"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                            />
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                                            <button
                                                type="button"
                                                onClick={() => setShowNew((prev) => !prev)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                                aria-label={showNew ? 'Sembunyikan password' : 'Lihat password'}
                                            >
                                                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                                            Konfirmasi Password
                                        </label>
                                        <div className="relative group">
                                            <input
                                                type={showConfirm ? 'text' : 'password'}
                                                className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-white dark:bg-[#11101d] border-2 border-transparent focus:border-blue-500 outline-none transition-all font-medium text-gray-700 dark:text-white shadow-sm"
                                                placeholder="Ulangi password baru"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirm((prev) => !prev)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                                aria-label={showConfirm ? 'Sembunyikan password' : 'Lihat password'}
                                            >
                                                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {(message || error) && (
                                <div
                                    className={`px-4 py-3 rounded-xl text-sm font-semibold ${
                                        error
                                            ? 'bg-red-50 text-red-700 border border-red-100'
                                            : 'bg-green-50 text-green-700 border border-green-100'
                                    }`}
                                >
                                    {error || message}
                                </div>
                            )}

                            <div className="pt-2 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    <Save size={20} />
                                    {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
