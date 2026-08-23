const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { calculateRentalPrice } = require('../algorithms/pricing');
const { checkCameraAvailability } = require('../algorithms/availability');
const Camera = require('../models/Camera');

router.post('/', async (req, res) => {
    try {
        const { cameraId, customerName, phone, startDate, endDate } = req.body;

        const availability = await checkCameraAvailability(cameraId, startDate, endDate);
        if (!availability.isAvailable) {
            return res.status(400).json({ error: 'Thiết bị đã hết trong khoảng thời gian này.' });
        }

        const camera = await Camera.findById(cameraId);
        const pricing = calculateRentalPrice(camera.pricePerDay, startDate, endDate);

        const newBooking = new Booking({
            camera: cameraId,
            customerName,
            phone,
            startDate,
            endDate,
            totalPrice: pricing.finalPrice,
            status: 'confirmed'
        });

        await newBooking.save();
        res.status(201).json({ message: 'Đặt thuê máy thành công!', data: newBooking, pricing });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;