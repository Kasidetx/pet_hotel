import { NextResponse } from 'next/server';
import { getConnection } from '@/lib/db';
import jwt from 'jsonwebtoken';

export async function GET(request) {
    try {
        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'กรุณาล็อกอินก่อนใช้งาน' }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];

        // Verify JWT token
        let Token;
        try {
          Token = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return NextResponse.json({ error: 'โทเค็นไม่ถูกต้องหรือหมดอายุ กรุณาล็อกอินใหม่' }, { status: 401 });
        }

        const userId = Token.userId;
        if (!userId) {
            return NextResponse.json({ error: 'โทเค็นไม่ถูกต้อง กรุณาล็อกอินใหม่' }, { status: 401 });
        }

        const connection = await getConnection();

        const query = `
      SELECT 
        b.id,
        b.booking_reference,
        r.title,
        b.check_in_date,
        b.check_out_date,
        b.status,
        b.price_per_night,
        b.grand_total,
        DATEDIFF(b.check_out_date, b.check_in_date) AS nights,
        b.created_at
      FROM 
        bookings b
      JOIN 
        rooms r ON b.room_id = r.id
      WHERE 
        b.user_id = ?
      ORDER BY 
        b.created_at DESC
    `;

        const [bookings] = await connection.query(query, [userId]);

        return NextResponse.json({ bookings }, { status: 200 });
    } catch (error) {
        console.error('Error fetching booking history:', error);
        return NextResponse.json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูลประวัติการจอง' }, { status: 500 });
    }
}