"use client";

import SettingsSidebar from "@/components/SettingsSidebar";
import { Calendar } from "lucide-react";

export default function NotificationsClient({
  notifications,
}: {
  notifications: any[];
}) {
  return (
    <div className="min-h-screen p-4 md:p-8 pb-20 bg-gray-50 dark:bg-[#0b0a12]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 h-[85vh]">

        <SettingsSidebar activePage="notifications" />

        <div className="flex-1 bg-white dark:bg-[#11101d] rounded-[20px] p-8 overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="text-gray-500">Tidak ada notifikasi</p>
          ) : (
            notifications.map((task) => (
              <div key={task.id} className="p-4 border-b">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar size={14} />
                  <span>{task.title}</span>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
