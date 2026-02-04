import { prisma } from "@/lib/prisma";
import NotificationsClient from "./NotificationsClient";

export const runtime = "nodejs"; // optional tapi aman

export default async function NotificationsPage() {
  const notifications = await prisma.task.findMany({
    where: {
      completed: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <NotificationsClient notifications={notifications} />
  );
}
