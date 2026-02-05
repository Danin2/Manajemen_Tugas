import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import NotificationsClient from "./NotificationsClient";

export const runtime = "nodejs"; // optional tapi aman

export default async function NotificationsPage() {
  const token = (await cookies()).get("auth_token")?.value;
  const payload = token ? verifyToken(token) : null;
  const userId = payload?.userId ? Number(payload.userId) : null;

  const notifications = userId
    ? await prisma.task.findMany({
        where: {
          completed: false,
          userId,
        },
        orderBy: {
          createdAt: "desc",
        },
      })
    : [];

  return (
    <NotificationsClient notifications={notifications} />
  );
}
