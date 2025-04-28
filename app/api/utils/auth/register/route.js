import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getConnection } from '../../../../../lib/db';

export async function POST(request) {
    const { email, firstName, lastName, password } = await request.json();
    if (!email || !firstName || !lastName || !password) {
        return NextResponse.json({ error: 'ข้อมูลไม่ครบ' }, { status: 400 });
    }

    const connection = getConnection();
    const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
        return NextResponse.json({ error: 'อีเมลนี้ถูกใช้งานแล้ว' }, { status: 400 });
    }

    const [result] = await connection.execute(
        'INSERT INTO users (email, first_name, last_name, password) VALUES (?, ?, ?, ?)',
        [email, firstName, lastName, password]
    );

    const token = jwt.sign(
        { userId: result.insertId, email },
        process.env.JWT_SECRET,
    );

    return NextResponse.json({ success: true, token });
}