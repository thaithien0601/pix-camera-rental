const express = require('express');
const cors = require('cors');
const path = require('path');
const setupDatabase = require('./models/dbSetup');

const app = express();
app.use(express.json());
app.use(cors());

// Cho phép server công khai thư mục 'uploads' để hiển thị ảnh lên web
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

async function startServer() {
    try {
        // Tự động kiểm tra, tạo Database và các bảng trước khi mở cổng server
        await setupDatabase();

        // Khai báo các đường dẫn API
        app.use('/api/cameras', require('./routes/camera.routes'));
        app.use('/api/admin', require('./routes/admin.routes'));

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`🚀 PIX Backend (MySQL) đang chạy tại cổng http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('❌ Lỗi khởi động hệ thống cơ sở dữ liệu:', err.message);
    }
}

startServer();