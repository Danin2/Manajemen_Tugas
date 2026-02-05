
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, password } = body;

        // Validate input
        if (!name || !email || !password) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { message: 'Password must be at least 6 characters' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { message: 'User already exists' },
                { status: 409 }
            );
        }

        // Hash password
        const passwordHash = await hashPassword(password);

        // Create user
        const newUser = await prisma.user.create({
            data: {
                email,
                passwordHash,
                profile: {
                    create: {
                        name,
                        // Generic fallback avatar
                        avatarUrl: `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(name)}`,
                    }
                }
            },
        });

        return NextResponse.json(
            { message: 'User created successfully' },
            { status: 201 }
        );

    } catch (error: any) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { message: 'Internal server error', error: error.message },
            { status: 500 }
        );
    }
}
