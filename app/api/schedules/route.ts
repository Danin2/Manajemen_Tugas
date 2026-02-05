// ============================================
// API ROUTE: /api/schedules
// Per-user schedules (database)
// ============================================

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export const runtime = "nodejs";

function mapSchedule(schedule: any) {
  return {
    id: String(schedule.id),
    day: schedule.day,
    subject: schedule.subject,
    startTime: schedule.startTime,
    endTime: schedule.endTime,
    room: schedule.room,
  };
}

async function getUserId() {
  const token = (await cookies()).get('auth_token')?.value;
  if (!token) return null;
  const payload = verifyToken(token);
  if (!payload?.userId) return null;
  return Number(payload.userId);
}

// GET - Ambil semua schedules
export async function GET() {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const schedules = await prisma.schedule.findMany({
      where: { userId },
      orderBy: [{ day: 'asc' }, { startTime: 'asc' }],
    });

    return NextResponse.json({
      success: true,
      data: schedules.map(mapSchedule),
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Gagal mengambil jadwal' }, { status: 500 });
  }
}

// POST - Tambah schedule baru
export async function POST(request: Request) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const schedule = await prisma.schedule.create({
      data: {
        userId,
        day: body.day,
        subject: body.subject,
        startTime: body.startTime,
        endTime: body.endTime,
        room: body.room || null,
      },
    });

    return NextResponse.json({
      success: true,
      data: mapSchedule(schedule),
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Gagal membuat jadwal' }, { status: 500 });
  }
}

// PUT - Update schedule
export async function PUT(request: Request) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const scheduleId = Number(body.id);
    if (!scheduleId) {
      return NextResponse.json({ success: false, error: 'ID diperlukan' }, { status: 400 });
    }

    const existing = await prisma.schedule.findFirst({
      where: { id: scheduleId, userId },
    });
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Jadwal tidak ditemukan' }, { status: 404 });
    }

    const schedule = await prisma.schedule.update({
      where: { id: scheduleId },
      data: {
        day: body.day,
        subject: body.subject,
        startTime: body.startTime,
        endTime: body.endTime,
        room: body.room || null,
      },
    });

    return NextResponse.json({
      success: true,
      data: mapSchedule(schedule),
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Gagal mengupdate jadwal' }, { status: 500 });
  }
}

// DELETE - Hapus schedule
export async function DELETE(request: Request) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'ID diperlukan' }, { status: 400 });

    const scheduleId = Number(id);
    const existing = await prisma.schedule.findFirst({
      where: { id: scheduleId, userId },
    });
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Jadwal tidak ditemukan' }, { status: 404 });
    }

    await prisma.schedule.delete({
      where: { id: scheduleId },
    });

    return NextResponse.json({
      success: true,
      message: 'Schedule deleted'
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Gagal menghapus jadwal' }, { status: 500 });
  }
}
