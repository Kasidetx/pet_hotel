// app/api/rooms/route.js
import { NextResponse } from 'next/server';
import { getRooms } from '@/lib/roomdb';

export async function GET() {
    try {
        const rooms = await getRooms();

        return NextResponse.json({
            rooms,
        });
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { message: 'เกิดข้อผิดพลาด', error: error.message },
            { status: 500 }
        );
    }
}