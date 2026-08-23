const mysql = require('mysql2/promise');

// Tạo pool kết nối dùng chung cho toàn bộ các API Backend trỏ thẳng lên TiDB Cloud
const pool = mysql.createPool({
    host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
    user: '4PJRcFutc9k2xfX.root',
    password: 'Fp6HCVjb5sP7MNiJ',
    database: 'pix-camera-rental',
    port: 4000,
    ssl: {
        rejectUnauthorized: true
    },
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = pool;