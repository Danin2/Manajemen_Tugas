
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SignJWT, jwtVerify } from 'jose';

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-change-this';

// Password handling
export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

// Token handling (Using 'jose' for Edge Runtime compatibility in Middleware if needed, 
// but sticking to standard jwt for now as we are likely using Node runtime for pages)

// NOTE: Middleware runs on Edge Runtime which doesn't support 'bcrypt' or standard 'jsonwebtoken' fully sometimes.
// We'll use 'jose' for the middleware-compatible verification if we need it there. 
// For now, let's just stick to standard JWT for API routes.

export function generateToken(payload: any): string {
    // Expires in 7 days
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): any {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}

// Edge-compatible token verification for Middleware
export async function verifyTokenEdge(token: string) {
    try {
        const secret = new TextEncoder().encode(JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (error) {
        return null;
    }
}
