import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function GET() {
  try {
    const token = (await cookies()).get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload?.userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = Number(payload.userId);
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.profile?.name || payload.name || 'User',
        avatarUrl: user.profile?.avatarUrl ?? null,
        bio: user.profile?.bio ?? null,
      }
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
