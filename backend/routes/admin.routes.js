const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Cấu hình thư mục lưu trữ file ảnh tải lên từ máy tính
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Middleware xác thực quyền Admin
const verifyAdmin = (req, res, next) => {
    const secretKey = req.headers['x-admin-auth'];
    if (secretKey !== 'PIX_ADMIN_SUPER_SECRET') {
        return res.status(403).json({ error: 'Từ chối truy cập! Yêu cầu quyền Quản trị viên.' });
    }
    next();
};

// API Thêm thiết bị kèm giá 6h, 12h, 24h và upload ảnh
router.post('/cameras', verifyAdmin, upload.single('image'), async (req, res) => {
    try {
        const { name, brand, category, price6h, price12h, price24h, stockTotal, sensor, isoRange, lensMount, weight, videoCapabilities, batteryLife } = req.body;

        const imagePath = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : '';

        const query = `
      INSERT INTO cameras (name, brand, category, price_6h, price_12h, price_24h, quantity, image, sensor, isoRange, lensMount, weight, videoCapabilities, batteryLife)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

        const values = [
            name, brand, category,
            price6h || 0, price12h || 0, price24h || 0,
            stockTotal || 1, imagePath,
            sensor || '', isoRange || '', lensMount || '', weight || '', videoCapabilities || '', batteryLife || ''
        ];

        const [result] = await db.execute(query, values);
        res.status(201).json({ message: 'Thêm thiết bị và các mức giá thuê thành công!', id: result.insertId });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// API Lấy danh sách toàn bộ khách hàng đã booking thuê máy cho Admin kiểm tra
router.get('/bookings', verifyAdmin, async (req, res) => {
    try {
        const query = `
      SELECT b.*, c.name as camera_name, c.image as camera_image 
      FROM bookings b
      JOIN cameras c ON b.camera_id = c.id
      ORDER BY b.created_at DESC
    `;
        const [rows] = await db.execute(query);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;