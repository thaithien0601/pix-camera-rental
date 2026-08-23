const mysql = require('mysql2/promise');

async function setupDatabase() {
  const db = await mysql.createPool({
    host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
    user: '4PJRcFutc9k2xfX.root',
    password: 'Fp6HCVjb5sP7MNiJ',
    database: 'pix-camera-rental', // Đã cập nhật đúng tên có dấu gạch ngang
    port: 4000,
    ssl: {
      rejectUnauthorized: true
    },
    waitForConnections: true,
    connectionLimit: 10
  });

  const createCamerasTable = `
    CREATE TABLE IF NOT EXISTS cameras (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      serial_origin VARCHAR(255) DEFAULT '',
      quantity INT NOT NULL DEFAULT 1,
      purchase_price DECIMAL(12, 2) NOT NULL DEFAULT 0,
      total_price DECIMAL(12, 2) GENERATED ALWAYS AS (quantity * purchase_price) STORED,
      condition_status VARCHAR(50) DEFAULT 'Cash',
      price_6h DECIMAL(10, 2) NOT NULL DEFAULT 0,
      price_12h DECIMAL(10, 2) NOT NULL DEFAULT 0,
      price_24h DECIMAL(10, 2) NOT NULL DEFAULT 0,
      brand VARCHAR(100) DEFAULT 'Sony',
      category VARCHAR(50) DEFAULT 'Máy ảnh',
      image VARCHAR(500) DEFAULT '',
      sensor VARCHAR(255),
      isoRange VARCHAR(100),
      lensMount VARCHAR(100),
      weight VARCHAR(50),
      videoCapabilities VARCHAR(255),
      batteryLife VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const createBookingsTable = `
    CREATE TABLE IF NOT EXISTS bookings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      camera_id INT NOT NULL,
      customer_name VARCHAR(255) NOT NULL,
      phone VARCHAR(20) NOT NULL,
      start_date DATE NOT NULL,
      end_date DATE NOT NULL,
      total_price DECIMAL(10, 2) NOT NULL,
      status VARCHAR(50) DEFAULT 'confirmed',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (camera_id) REFERENCES cameras(id) ON DELETE CASCADE
    );
  `;

  await db.execute(createCamerasTable);
  await db.execute(createBookingsTable);
  console.log('✅ Đã kết nối và dựng bảng thành công trên TiDB Cloud Database!');

  return db;
}

module.exports = setupDatabase;