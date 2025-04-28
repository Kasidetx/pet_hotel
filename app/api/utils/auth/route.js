import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getConnection } from '../../../../lib/db';

export async function GET(request) {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
        return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        const connection = getConnection();
        const [rows] = await connection.execute(
            'SELECT id, email, first_name, last_name, created_at FROM users WHERE id = ?',
            [userId]
        );

        if (rows.length === 0) {
            return NextResponse.json({ error: 'เกิดข้อผิดพลาด' }, { status: 404 });
        }

        return NextResponse.json({ authenticated: true, user: rows[0] });
    } catch (err) {
        return NextResponse.json({
            authenticated: false,
            error: 'เกิดข้อผิดพลาด'
        }, { status: 401 });
    }
}

export async function PUT(request) {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    let userId;
    try {
        userId = jwt.verify(token, process.env.JWT_SECRET).userId;
    } catch (err) {

        return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const { firstName, lastName } = await request.json();
    if (!firstName || !lastName) {
        return NextResponse.json({ error: 'ข้อมูลไม่ครบ' }, { status: 400 });
    }

    const connection = getConnection();
    await connection.execute(
        'UPDATE users SET first_name = ?, last_name = ? WHERE id = ?',
        [firstName, lastName, userId]
    );
    return NextResponse.json({ success: true });
}

export async function POST(request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: 'อีเมลไม่ถูกต้อง' }, { status: 400 });
        }

        const connection = getConnection();

        const [rows] = await connection.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (rows.length > 0) {
            return NextResponse.json({ exists: true });
        } else {
            return NextResponse.json({ exists: false });
        }
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'เกิดข้อผิดพลาดในการตรวจสอบอีเมล' }, { status: 500 });
    }
}