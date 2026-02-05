"use client";

import SettingsSidebar from "@/components/SettingsSidebar";
import { Calendar, Clock, Flag, ListChecks } from "lucide-react";

type NotificationTask = {
  id: number;
  title: string;
  subject?: string | null;
  dueDate?: string | null;
  completed: boolean;
  createdAt: string;
};

function formatDate(dateValue?: string | null) {
  if (!dateValue) return "-";
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getUrgency(dueDate?: string | null) {
  if (!dueDate) {
    return { label: "Tanpa deadline", className: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300" };
  }
  const now = new Date();
  const due = new Date(dueDate);
  if (Number.isNaN(due.getTime())) {
    return { label: "Tanpa deadline", className: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300" };
  }
  const endOfToday = new Date(now);
  endOfToday.setHours(23, 59, 59, 999);
  if (due < now) {
    return { label: "Terlambat", className: "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300" };
  }
  if (due <= endOfToday) {
    return { label: "Hari ini", className: "bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300" };
  }
  const diffDays = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays <= 2) {
    return { label: "Mendesak", className: "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300" };
  }
  return { label: "Terjadwal", className: "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300" };
}

export default function NotificationsClient({
  notifications,
}: {
  notifications: NotificationTask[];
}) {
  return (
    <div className="min-h-screen p-4 md:p-8 pb-20 bg-gray-50 dark:bg-[#0b0a12]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 h-[85vh]">
        <SettingsSidebar activePage="notifications" />

        <div className="flex-1 bg-white dark:bg-[#11101d] rounded-[20px] p-8 overflow-y-auto border border-gray-100 dark:border-gray-800 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Notifikasi</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Ringkasan tugas yang perlu kamu kerjakan
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
              <ListChecks size={16} />
              <span>{notifications.length} item</span>
            </div>
          </div>

          {notifications.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 dark:text-gray-400 font-medium">Tidak ada notifikasi</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Semua tugas kamu sudah selesai. Mantap!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((task) => {
                const urgency = getUrgency(task.dueDate);
                return (
                  <div
                    key={task.id}
                    className="p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white/70 dark:bg-[#131225] hover:shadow-lg transition-shadow"
                  >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300">
                          <Flag size={14} />
                          Tugas Aktif
                        </span>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${urgency.className}`}
                        >
                          {urgency.label}
                        </span>
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          Dibuat: {formatDate(task.createdAt)}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {task.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {task.subject || "Tanpa mata pelajaran"}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <div className="inline-flex items-center gap-2">
                        <Calendar size={14} />
                        <span>Deadline: {formatDate(task.dueDate)}</span>
                      </div>
                      <div className="inline-flex items-center gap-2">
                        <Clock size={14} />
                        <span>Status: {task.completed ? "Selesai" : "Belum selesai"}</span>
                      </div>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
