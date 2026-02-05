import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Calendar, Clock, BookOpen } from "lucide-react";

export const runtime = "nodejs";

function formatDate(dateValue?: Date | null) {
  if (!dateValue) return "-";
  return dateValue.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function TaskDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const taskId = Number(params.id);
  if (!Number.isFinite(taskId)) {
    return (
      <div className="min-h-screen p-6 bg-gray-50 dark:bg-[#0b0a12]">
        <div className="max-w-3xl mx-auto bg-white dark:bg-[#11101d] rounded-2xl p-8 border border-gray-100 dark:border-gray-800 shadow-2xl">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Detail Tugas</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">ID tugas tidak valid.</p>
          <Link
            href="/notifications"
            className="inline-flex mt-6 px-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold"
          >
            Kembali ke Notifikasi
          </Link>
        </div>
      </div>
    );
  }

  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!task) {
    return (
      <div className="min-h-screen p-6 bg-gray-50 dark:bg-[#0b0a12]">
        <div className="max-w-3xl mx-auto bg-white dark:bg-[#11101d] rounded-2xl p-8 border border-gray-100 dark:border-gray-800 shadow-2xl">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Detail Tugas</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">Tugas tidak ditemukan.</p>
          <Link
            href="/notifications"
            className="inline-flex mt-6 px-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold"
          >
            Kembali ke Notifikasi
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-[#0b0a12]">
      <div className="max-w-3xl mx-auto bg-white dark:bg-[#11101d] rounded-2xl p-8 border border-gray-100 dark:border-gray-800 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{task.title}</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Dibuat: {formatDate(task.createdAt)}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${task.completed ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300" : "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300"}`}>
            {task.completed ? "Selesai" : "Belum selesai"}
          </span>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/70 dark:bg-[#141326]">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300">
              <BookOpen size={16} />
              Mata Pelajaran
            </div>
            <p className="mt-2 text-gray-900 dark:text-white font-medium">
              {task.subject || "Umum"}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/70 dark:bg-[#141326]">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300">
              <Calendar size={16} />
              Deadline
            </div>
            <p className="mt-2 text-gray-900 dark:text-white font-medium">
              {formatDate(task.dueDate)}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/70 dark:bg-[#141326]">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300">
              <Clock size={16} />
              Status
            </div>
            <p className="mt-2 text-gray-900 dark:text-white font-medium">
              {task.completed ? "Selesai" : "Belum selesai"}
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-3">
          <Link
            href="/notifications"
            className="inline-flex px-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold"
          >
            Kembali ke Notifikasi
          </Link>
          <Link
            href="/tasks"
            className="inline-flex px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 text-sm font-semibold"
          >
            Ke Halaman Tugas
          </Link>
        </div>
      </div>
    </div>
  );
}
