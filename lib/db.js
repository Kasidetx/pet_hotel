import mysql from 'mysql2/promise';

let connection;

export function getConnection() {
    if (!connection) {
        connection = mysql.createPool(process.env.DATABASE_URL);
    }
    return connection;
}