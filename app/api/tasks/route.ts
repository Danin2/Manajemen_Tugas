import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Ambil semua tasks
export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      data: tasks.map(t => ({
        ...t,
        id: String(t.id),
        isCompleted: t.completed,
        deadline: t.dueDate ? t.dueDate.toISOString() : null
      }))
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Gagal mengambil tugas' }, { status: 500 });
  }
}

// POST - Tambah task baru
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const task = await prisma.task.create({
      data: {
        title: body.title,
        subject: body.subject,
        dueDate: body.deadline ? new Date(body.deadline) : null,
        completed: body.isCompleted || false,
      }
    });
    return NextResponse.json({
      success: true,
      data: { ...task, id: String(task.id), isCompleted: task.completed, deadline: task.dueDate?.toISOString() }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Gagal membuat tugas' }, { status: 500 });
  }
}

// PUT - Update task
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        title: data.title,
        subject: data.subject,
        dueDate: data.deadline ? new Date(data.deadline) : undefined,
        completed: data.isCompleted,
      }
    });

    return NextResponse.json({
      success: true,
      data: { ...task, id: String(task.id), isCompleted: task.completed, deadline: task.dueDate?.toISOString() }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Gagal mengupdate tugas' }, { status: 500 });
  }
}

// DELETE - Hapus task
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ success: false, error: 'ID diperlukan' }, { status: 400 });

    await prisma.task.delete({
      where: { id: Number(id) }
    });

    return NextResponse.json({
      success: true,
      message: 'Task deleted'
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Gagal menghapus tugas' }, { status: 500 });
  }
}