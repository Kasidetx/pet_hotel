// app/api/room/[id]/route.js
import { NextResponse } from 'next/server';
import { getRoomById } from '@/lib/roomdb';

export async function GET(request, { params }) {
    const { id } = params;

    try {
        const room = await getRoomById(parseInt(id));

        if (!room) {
            return NextResponse.json(
                { message: 'ไม่พบห้อง' },
                { status: 404 }
            );
        }

        return NextResponse.json({ room });
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { message: 'เกิดข้อผิดพลาด', error: error.message },
            { status: 500 }
        );
    }
}