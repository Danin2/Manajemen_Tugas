export const runtime = "nodejs";
import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import { verifyToken } from "@/lib/auth";

export async function PUT(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Belum login" }, { status: 401 });
    }

    const payload = verifyToken(token);
    const userId = payload?.userId;
    if (!userId) {
      return NextResponse.json({ error: "Token tidak valid" }, { status: 401 });
    }

    const { oldPassword, newPassword } = await req.json();
    if (!oldPassword || !newPassword) {
      return NextResponse.json(
        { error: "Password lama dan baru wajib diisi" },
        { status: 400 }
      );
    }
    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "Password baru minimal 6 karakter" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });
    }

    const isValid = await bcrypt.compare(oldPassword, user.passwordHash);

    if (!isValid) {
      return NextResponse.json(
        { error: "Password lama salah" },
        { status: 401 }
      );
    }

    const newHash = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: {
        passwordHash: newHash,
      },
    });

    return NextResponse.json({
      message: "Password berhasil diganti",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal ganti password" },
      { status: 500 }
    );
  }
}
