import { Schema, model } from 'mongoose';

const SpecSchema = new Schema({
    sensor: { type: String, default: '' },
    isoRange: { type: String, default: '' },
    lensMount: { type: String, default: '' },
    weight: { type: String, default: '' },
    videoCapabilities: { type: String, default: '' },
    batteryLife: { type: String, default: '' }
});

const CameraSchema = new Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true }, // Sony, Canon, Fujifilm, Godox...
    category: { type: String, required: true }, // camera, lens, accessory
    pricePerDay: { type: Number, required: true },
    stockTotal: { type: Number, required: true },
    image: { type: String, required: true },
    status: { type: String, enum: ['available', 'maintenance', 'out_of_stock'], default: 'available' },
    specs: SpecSchema,
    createdAt: { type: Date, default: Date.now }
});

export default model('Camera', CameraSchema);