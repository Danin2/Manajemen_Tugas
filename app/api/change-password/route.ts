export const runtime = "nodejs";
import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function PUT(req: Request) {
  try {
    const userId = 1;

    const { oldPassword, newPassword } = await req.json();

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