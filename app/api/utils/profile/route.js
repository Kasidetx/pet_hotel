import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { getConnection } from '../../../../lib/db'

export async function PUT(request) {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
        return NextResponse.json({ authenticated: false }, { status: 200 })
    }

    let userId
    try {
        userId = jwt.verify(token, process.env.JWT_SECRET).userId
    } catch (err) {
        return NextResponse.json({ authenticated: false }, { status: 200 })
    }

    const { firstName, lastName } = await request.json()
    if (!firstName || !lastName) {
        return NextResponse.json({ error: 'ข้อมูลไม่ครบ' }, { status: 400 })
    }

    const connection = getConnection()
    await connection.execute(
        'UPDATE users SET first_name = ?, last_name = ? WHERE id = ?',
        [firstName, lastName, userId]
    )
    return NextResponse.json({ success: true })
}

export async function POST(request) {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
        return NextResponse.json({ authenticated: false }, { status: 200 })
    }

    let userId
    try {
        userId = jwt.verify(token, process.env.JWT_SECRET).userId
    } catch (err) {

        return NextResponse.json({ error: 'เกิดข้อผิดพลาด' }, { status: 401 });
    }

    const { newPassword } = await request.json()
    if (!newPassword) {
        return NextResponse.json({ error: 'ห้ามเว้นว่าง' }, { status: 400 })
    }

    const connection = getConnection()
    await connection.execute(
        'UPDATE users SET password = ? WHERE id = ?',
        [newPassword, userId]
    )
    return NextResponse.json({ success: true })
}