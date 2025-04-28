// app/api/rooms/[type]/route.js
import { NextResponse } from 'next/server';
import { getRoomsByType } from '@/lib/roomdb';

export async function GET(request, { params }) {
    const { type } = params;

    try {
        const rooms = await getRoomsByType(type);

        if (rooms.length === 0) {
            return NextResponse.json(
                { message: 'ไม่พบประเภทของห้อง' },
                { status: 404 }
            );
        }

        return NextResponse.json({ rooms });
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { message: 'เกิดข้อผิดพลาด', error: error.message },
            { status: 500 }
        );
    }
}