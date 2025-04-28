import { NextResponse } from 'next/server';
import { getConnection } from '../../../../../lib/db';
import jwt from 'jsonwebtoken';

export async function POST(request) {
    try {
        const { email, password } = await request.json();
        if (!email || !password) {
            return NextResponse.json(
                { success: false, error: 'ต้องระบุ email และ password' },
                { status: 400 }
            );
        }

        const connection = getConnection()
        const [rows] = await connection.execute(
            'SELECT id, password FROM users WHERE email = ?',
            [email]
        );

        if (rows.length === 0 || rows[0].password !== password) {
            return NextResponse.json(
                { success: false, error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' },
                { status: 401 }
            );
        }

        const user = rows[0];

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
        );

        return NextResponse.json(
            { success: true, message: 'เข้าสู่ระบบสำเร็จ', token },
            { status: 200 }
        );

    } catch (err) {
        console.error('Login error:', err);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    if (!email) {
        return NextResponse.json({ error: 'ต้องส่งอีเมลมา' }, { status: 400 });
    }

    const connection = getConnection();
    const [rows] = await connection.execute(
        'SELECT 1 FROM users WHERE email = ? LIMIT 1',
        [email]
    );
    const exists = rows.length > 0;
    return NextResponse.json({ exists });
}
