export const runtime = "nodejs";
import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const userId = 1;

    const { name, bio, avatarUrl } = await req.json();

    const profile = await prisma.profile.update({
      where: { userId },
      data: {
        name,
        bio,
        avatarUrl,
      },
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