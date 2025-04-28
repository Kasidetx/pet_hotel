// lib/roomDb.js
import { getConnection } from './db';

// ฟังก์ชันสำหรับ execute query
export async function query(sql, params) {
    try {
        const connection = getConnection();
        const [results] = await connection.execute(sql, params);
        return results;
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
}

// ดึงข้อมูลห้องพักทั้งหมดพร้อม amenities
export async function getRooms() {
    try {
        // ดึงข้อมูลห้องพักทั้งหมด
        const rooms = await query(`
      SELECT id, type, title, description, price, img, size, beds, max_pets
      FROM rooms
      ORDER BY type, id
    `);

        // ดึงข้อมูล amenities สำหรับแต่ละห้อง
        for (const room of rooms) {
            const amenities = await query(`
        SELECT a.name
        FROM amenities a
        JOIN room_amenities ra ON a.id = ra.amenity_id
        WHERE ra.room_id = ?
      `, [room.id]);

            // แปลงเป็น array ของชื่อ amenities
            room.amenities = amenities.map(a => a.name);

            // แปลง features เป็น array
            room.features = [
                `Size: ${room.size}`,
                `Beds: ${room.beds}`,
                `Max Pets: ${room.max_pets}`
            ];

            // ลบฟิลด์ที่ไม่จำเป็นออก
            delete room.size;
            delete room.beds;
            delete room.max_pets;
        }

        return rooms;
    } catch (error) {
        console.error('Error getting rooms:', error);
        throw error;
    }
}

export async function getRoomsByType(type) {
    try {
        const rooms = await query(`
      SELECT id, type, title, description, price, img, size, beds, max_pets
      FROM rooms
      WHERE type = ?
      ORDER BY id
    `, [type]);

        // ดึงข้อมูล amenities สำหรับแต่ละห้อง
        for (const room of rooms) {
            const amenities = await query(`
        SELECT a.name
        FROM amenities a
        JOIN room_amenities ra ON a.id = ra.amenity_id
        WHERE ra.room_id = ?
      `, [room.id]);

            room.amenities = amenities.map(a => a.name);
            room.features = [
                `Size: ${room.size}`,
                `Beds: ${room.beds}`,
                `Max Pets: ${room.max_pets}`
            ];

            delete room.size;
            delete room.beds;
            delete room.max_pets;
        }

        return rooms;
    } catch (error) {
        console.error(`Error getting rooms by type ${type}:`, error);
        throw error;
    }
}

// ดึงข้อมูลห้องพักตาม ID
export async function getRoomById(id) {
    try {
        const [room] = await query(`
      SELECT id, type, title, description, price, img, size, beds, max_pets
      FROM rooms
      WHERE id = ?
    `, [id]);

        if (!room) {
            return null;
        }

        const amenities = await query(`
      SELECT a.name
      FROM amenities a
      JOIN room_amenities ra ON a.id = ra.amenity_id
      WHERE ra.room_id = ?
    `, [id]);

        room.amenities = amenities.map(a => a.name);
        room.features = [
            `Size: ${room.size}`,
            `Beds: ${room.beds}`,
            `Max Pets: ${room.max_pets}`
        ];

        delete room.size;
        delete room.beds;
        delete room.max_pets;

        return room;
    } catch (error) {
        console.error(`Error getting room by id ${id}:`, error);
        throw error;
    }
}