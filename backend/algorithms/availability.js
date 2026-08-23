const Booking = require('../models/Booking'); // Đã sửa đường dẫn trỏ đúng vào thư mục models
const Camera = require('../models/Camera');

async function checkCameraAvailability(cameraId, requestedStart, requestedEnd) {
    const camera = await Camera.findById(cameraId);
    if (!camera) throw new Error('Không tìm thấy thiết bị');

    const overlappingBookings = await Booking.find({
        camera: cameraId,
        status: { $in: ['confirmed', 'active'] },
        $or: [
            { startDate: { $lte: new Date(requestedEnd) }, endDate: { $gte: new Date(requestedStart) } }
        ]
    });

    const rentedCount = overlappingBookings.length;
    const isAvailable = (camera.stockTotal - rentedCount) > 0;

    return {
        isAvailable,
        remainingStock: camera.stockTotal - rentedCount
    };
}

module.exports = { checkCameraAvailability };