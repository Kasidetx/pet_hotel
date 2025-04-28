import { NextResponse } from 'next/server';
import { getConnection } from '@/lib/db';

export async function POST(request) {
    try {
        const bookingData = await request.json();

        if (!bookingData.userId || !bookingData.roomId || !bookingData.checkIn || !bookingData.checkOut) {
            return NextResponse.json(
                { error: 'กรุณากรอกข้อมูลให้ครบถ้วน' },
                { status: 400 }
            );
        }

        const checkInDate = new Date(bookingData.checkIn);
        const checkOutDate = new Date(bookingData.checkOut);
        const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

        const connection = getConnection();
        
        // Insert booking data
        const [result] = await connection.execute(`
            INSERT INTO bookings (
                user_id, 
                room_id, 
                title, 
                price_per_night, 
                check_in_date, 
                check_out_date, 
                nights, 
                total_price, 
                tax, 
                grand_total, 
                status, 
                created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
        `, [
            bookingData.userId,
            bookingData.roomId,
            bookingData.title,
            bookingData.price,
            bookingData.checkIn,
            bookingData.checkOut,
            nights,
            bookingData.price * nights,
            bookingData.price * nights * 0.07,
            bookingData.price * nights * 1.07,
            'confirmed'
        ]);

        const bookingId = result.insertId;
        const bookingReference = `BK${String(bookingId).padStart(6, '0')}`;

        await connection.execute(`
            UPDATE bookings 
            SET booking_reference = ? 
            WHERE id = ?
        `, [bookingReference, bookingId]);

        return NextResponse.json({
            success: true,
            bookingId: bookingId,
            bookingReference: bookingReference
        });

    } catch (error) {
        console.error('Error creating booking:', error);
        return NextResponse.json(
            { error: 'เกิดข้อผิดพลาดในการบันทึกข้อมูลการจอง', details: error.message },
            { status: 500 }
        );
    }
}