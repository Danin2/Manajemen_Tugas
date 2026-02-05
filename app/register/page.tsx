'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Registration failed');
      }

      setIsSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 1100);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white relative overflow-hidden transition-colors duration-300">
      <div className="absolute -top-32 -right-20 h-72 w-72 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-28 -left-16 h-80 w-80 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 opacity-20 blur-3xl"></div>

      {isSuccess && (
        <div className="book-overlay">
          <div className="book-stage">
            <div className="book">
              <span className="book-cover"></span>
              <span className="book-page page-left"></span>
              <span className="book-page page-right"></span>
              <span className="book-spine"></span>
            </div>
            <div className="book-shadow"></div>
          </div>
          <p className="book-text">Membuka login...</p>
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <div className={`auth-shell register-animate grid grid-cols-1 lg:grid-cols-2 border-2 border-black dark:border-white bg-white dark:bg-gray-900 ${isSuccess ? 'pointer-events-none opacity-80' : ''}`}>
          <section className="auth-form order-1 lg:order-1 p-10 md:p-12">
            <div className="mb-10">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Buat akun baru</p>
              <h2 className="mt-3 text-4xl md:text-5xl font-black uppercase tracking-tighter">Daftar</h2>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {error && (
                <div className="p-4 border-2 border-red-500 text-red-600 text-sm font-bold uppercase tracking-widest">
                  {error}
                </div>
              )}

              <div className="group">
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-black dark:group-focus-within:text-white transition-colors">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-2 border-black dark:border-white bg-transparent px-4 py-3 text-sm font-semibold tracking-wide text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Nama siswa"
                  required
                />
              </div>

              <div className="group">
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-black dark:group-focus-within:text-white transition-colors">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-2 border-black dark:border-white bg-transparent px-4 py-3 text-sm font-semibold tracking-wide text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="nama@sekolah.sch.id"
                  required
                />
              </div>

              <div className="group">
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-black dark:group-focus-within:text-white transition-colors">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-2 border-black dark:border-white bg-transparent px-4 py-3 text-sm font-semibold tracking-wide text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Minimal 6 karakter"
                  required
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 w-full border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-widest px-5 py-4 transition-transform hover:-translate-y-0.5 disabled:opacity-70"
              >
                {isLoading ? 'Memproses...' : 'Daftar Akun'}
              </button>
            </form>

            <div className="mt-8 text-sm font-semibold">
              Sudah punya akun?{' '}
              <Link href="/login" className="font-black uppercase tracking-widest text-blue-600 hover:text-purple-600">
                Masuk sekarang
              </Link>
            </div>
          </section>

          <section className="auth-panel order-2 lg:order-2 border-t-2 lg:border-t-0 lg:border-l-2 border-black dark:border-white p-10 md:p-12">
            <div className="inline-flex items-center gap-3 px-4 py-2 border-2 border-black dark:border-white text-xs font-black uppercase tracking-widest">
              <span className="h-2 w-2 bg-blue-600"></span>
              SMK Task Manager
            </div>
            <h1 className="mt-6 text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.95]">
              Mulai perjalananmu
            </h1>
            <div className="h-2 w-20 bg-blue-600 mt-5"></div>
            <p className="mt-6 text-gray-600 dark:text-gray-300 text-lg">
              Daftar akun baru untuk mengelola tugas, jadwal, dan target belajarmu dengan lebih fokus.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-4 text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-3">
                <span className="h-2 w-10 bg-black dark:bg-white"></span>
                Dashboard terstruktur
              </div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-10 bg-black dark:bg-white"></span>
                Reminder tugas penting
              </div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-10 bg-black dark:bg-white"></span>
                Fokus harian meningkat
              </div>
            </div>
          </section>
        </div>
      </div>

      <style jsx global>{`
        .auth-shell { border-radius: 20px; overflow: hidden; }
        .register-animate .auth-panel { animation: panel-slide-right 0.9s ease-out both; }
        .register-animate .auth-form { animation: form-rise-left 0.7s ease-out 0.2s both; }

        .book-overlay {
          position: fixed;
          inset: 0;
          background: radial-gradient(circle at top, rgba(15,23,42,0.2), rgba(3,7,18,0.9));
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 1.5rem;
          z-index: 50;
          backdrop-filter: blur(4px);
        }

        .book-stage {
          position: relative;
          width: 200px;
          height: 140px;
          perspective: 1200px;
        }

        .book {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
          transform: rotateX(12deg);
          animation: book-float 1.1s ease-in-out infinite;
        }

        .book-cover {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border: 2px solid #0a0a0a;
          transform-origin: left center;
          box-shadow: 0 30px 40px rgba(0,0,0,0.25);
          animation: book-open 1.05s ease-in-out forwards;
        }

        .book-spine {
          position: absolute;
          left: -8px;
          top: 0;
          width: 10px;
          height: 100%;
          background: linear-gradient(180deg, #1e3a8a, #5b21b6);
          transform: translateZ(-2px);
        }

        .book-page {
          position: absolute;
          inset: 8px;
          background: #f8fafc;
          border: 1px solid #0f172a;
          transform-origin: left center;
        }

        .page-left {
          animation: page-flip 1.05s ease-in-out 0.1s forwards;
        }

        .page-right {
          inset: 10px;
          background: #e2e8f0;
          animation: page-flip 1.05s ease-in-out 0.18s forwards;
        }

        .book-shadow {
          position: absolute;
          left: 15%;
          right: 15%;
          bottom: -12px;
          height: 18px;
          background: radial-gradient(ellipse at center, rgba(0,0,0,0.35), rgba(0,0,0,0));
          filter: blur(6px);
        }

        .book-text {
          color: #ffffff;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          font-size: 0.8rem;
        }

        @keyframes book-open {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(-135deg); }
        }

        @keyframes page-flip {
          from { transform: rotateY(0deg); opacity: 0; }
          to { transform: rotateY(-125deg); opacity: 1; }
        }

        @keyframes book-float {
          0%, 100% { transform: translateY(0) rotateX(12deg); }
          50% { transform: translateY(-6px) rotateX(12deg); }
        }

        @keyframes panel-slide-right {
          from { transform: translateX(-100%); opacity: 0.7; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes form-rise-left {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .register-animate .auth-panel,
          .register-animate .auth-form,
          .book-cover,
          .page-left,
          .page-right,
          .book {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}
