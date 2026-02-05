export const runtime = "nodejs";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function PUT(req: Request) {
  try {
    const token = (await cookies()).get("auth_token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload?.userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = Number(payload.userId);
    const { name, bio, avatarUrl } = await req.json();

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Nama wajib diisi." },
        { status: 400 }
      );
    }

    const data = {
      name: name.trim(),
      bio: typeof bio === "string" ? (bio.trim() ? bio.trim() : null) : null,
      avatarUrl:
        typeof avatarUrl === "string" ? (avatarUrl.trim() ? avatarUrl.trim() : null) : null,
    };

    const profile = await prisma.profile.update({
      where: { userId },
      data,
    });

    return NextResponse.json({
      message: "Profil berhasil diperbarui",
      profile,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal update profil" },
      { status: 500 }
    );
  }
}
