import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../config';
import categoryCameraImg from '../assets/category-camera.jpg';
import a74CameraImg from '../assets/a74-camera.jpg';

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const [customerName, setCustomerName] = useState('');
    const [phone, setPhone] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [bookingType, setBookingType] = useState('24h');
    const [message, setMessage] = useState('');

    const defaultCameras = [
        { id: 'def-1', name: 'Sony A7 IV + Kit 24-70mm', brand: 'Sony', category: 'Máy ảnh', price_6h: 210000, price_12h: 280000, price_24h: 350000, image: a74CameraImg, sensor: 'Full-frame Exmor R', isoRange: '100 - 51200', lensMount: 'E-mount', weight: '658g', videoCapabilities: '4K 60p', batteryLife: '400 tấm' },
        { id: 'def-2', name: 'Canon EOS R6 Mark II', brand: 'Canon', category: 'Máy ảnh', price_6h: 240000, price_12h: 320000, price_24h: 400000, image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=600&q=80', sensor: 'Full-frame CMOS', isoRange: '100 - 102400', lensMount: 'RF mount', weight: '670g', videoCapabilities: '4K 60p', batteryLife: '450 tấm' },
        { id: 'def-3', name: 'Sony FE 35mm f/1.4 GM', brand: 'Sony', category: 'Ống kính', price_6h: 150000, price_12h: 200000, price_24h: 250000, image: categoryCameraImg, sensor: 'N/A', isoRange: 'N/A', lensMount: 'E-mount', weight: '524g', videoCapabilities: 'N/A', batteryLife: 'N/A' },
        { id: 'def-4', name: 'Godox AD200 Pro Strobe', brand: 'Godox', category: 'Flash', price_6h: 90000, price_12h: 120000, price_24h: 150000, image: categoryCameraImg, sensor: 'N/A', isoRange: 'N/A', lensMount: 'N/A', weight: '560g', videoCapabilities: 'N/A', batteryLife: '2900mAh' },
        { id: 'def-5', name: 'Đèn Nanlite Forza 60B', brand: 'Nanlite', category: 'Đèn Led', price_6h: 110000, price_12h: 150000, price_24h: 180000, image: categoryCameraImg, sensor: 'N/A', isoRange: 'N/A', lensMount: 'N/A', weight: '830g', videoCapabilities: 'Bi-color', batteryLife: 'Pin V-mount' },
        { id: 'def-6', name: 'Gimbal DJI Ronin RS 3 Pro', brand: 'DJI', category: 'Gimbal', price_6h: 120000, price_12h: 160000, price_24h: 200000, image: categoryCameraImg, sensor: 'N/A', isoRange: 'N/A', lensMount: 'N/A', weight: '1.5kg', videoCapabilities: 'Tải trọng 4.5kg', batteryLife: '12 giờ' }
    ];

    // Hàm xử lý ảnh an toàn
    const getSafeImage = (img) => {
        if (!img) return categoryCameraImg;
        if (img.startsWith('http') || img.startsWith('data:') || img.startsWith('/')) return img;
        return categoryCameraImg;
    };

    useEffect(() => {
        const foundDefault = defaultCameras.find(item => item.id === id);
        if (foundDefault) {
            setProduct(foundDefault);
            setLoading(false);
        } else {
            fetch(`${API_URL}/api/cameras/${id}`)
                .then(res => res.json())
                .then(data => {
                    setProduct(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Lỗi tải thông tin thiết bị:', err);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) {
        return <div className="text-center py-24 font-bold text-gray-500">Đang tải thông tin thiết bị...</div>;
    }

    if (!product) {
        return (
            <div className="text-center py-24">
                <h2 className="text-xl font-bold mb-4">Không tìm thấy thiết bị này!</h2>
                <button onClick={() => navigate('/category')} className="bg-black text-white px-6 py-2 rounded-lg font-bold text-xs">QUAY LẠI DANH MỤC</button>
            </div>
        );
    }

    const p6h = Number(product.price_6h || product.price6h || 0);
    const p12h = Number(product.price_12h || product.price12h || 0);
    const p24h = Number(product.price_24h || product.price24h || 0);

    const handleBooking = async (e) => {
        e.preventDefault();
        let unitPrice = bookingType === '6h' ? p6h : bookingType === '12h' ? p12h : p24h;

        try {
            const res = await fetch(`${API_URL}/api/cameras/booking`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    camera_id: product.id || 1,
                    customer_name: customerName,
                    phone: phone,
                    start_date: startDate || new Date().toISOString().split('T')[0],
                    end_date: endDate || new Date().toISOString().split('T')[0],
                    total_price: unitPrice
                })
            });
            const data = await res.json();
            if (res.ok) {
                setMessage('✅ Đặt thuê thiết bị thành công! Cửa hàng sẽ liên hệ xác nhận sớm.');
                setCustomerName('');
                setPhone('');
            } else {
                setMessage('❌ Lỗi đặt thuê: ' + data.error);
            }
        } catch (err) {
            setMessage('❌ Không thể kết nối tới server!');
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 flex items-center justify-center">
                    <img src={getSafeImage(product.image)} alt={product.name} className="max-h-96 object-contain" />
                </div>

                <div className="space-y-6">
                    <div>
                        <span className="bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            {product.category || 'Thiết bị'}
                        </span>
                        <h1 className="text-3xl font-black mt-2 text-gray-900">{product.name}</h1>
                        <p className="text-sm text-gray-500 font-medium mt-1">Hãng sản xuất: {product.brand}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <div className={`text-center p-2 rounded-lg cursor-pointer border ${bookingType === '6h' ? 'border-black bg-black text-white' : 'border-gray-200 bg-white'}`} onClick={() => setBookingType('6h')}>
                            <span className="block text-[10px] uppercase font-bold opacity-80">Thuê 6 Giờ</span>
                            <span className="text-sm font-black">{p6h.toLocaleString('vi-VN')}đ</span>
                        </div>
                        <div className={`text-center p-2 rounded-lg cursor-pointer border ${bookingType === '12h' ? 'border-black bg-black text-white' : 'border-gray-200 bg-white'}`} onClick={() => setBookingType('12h')}>
                            <span className="block text-[10px] uppercase font-bold opacity-80">Thuê 12 Giờ</span>
                            <span className="text-sm font-black">{p12h.toLocaleString('vi-VN')}đ</span>
                        </div>
                        <div className={`text-center p-2 rounded-lg cursor-pointer border ${bookingType === '24h' ? 'border-black bg-black text-white' : 'border-gray-200 bg-white'}`} onClick={() => setBookingType('24h')}>
                            <span className="block text-[10px] uppercase font-bold opacity-80">Thuê 24 Giờ</span>
                            <span className="text-sm font-black">{p24h.toLocaleString('vi-VN')}đ</span>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                        <h3 className="font-bold text-sm mb-3">Thông số kỹ thuật</h3>
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                            <div><strong>Cảm biến:</strong> {product.sensor || 'Chính hãng'}</div>
                            <div><strong>Dải ISO:</strong> {product.isoRange || 'Tiêu chuẩn'}</div>
                            <div><strong>Ngàm:</strong> {product.lensMount || 'Linh hoạt'}</div>
                            <div><strong>Trọng lượng:</strong> {product.weight || 'Gọn nhẹ'}</div>
                            <div><strong>Quay phim:</strong> {product.videoCapabilities || 'HD/4K'}</div>
                            <div><strong>Pin:</strong> {product.batteryLife || 'Độ bền cao'}</div>
                        </div>
                    </div>

                    <form onSubmit={handleBooking} className="border-t border-gray-200 pt-6 space-y-4">
                        <h3 className="font-bold text-sm">Form Đặt Thuê Thiết Bị Nhanh</h3>
                        {message && <div className="p-3 text-xs font-bold rounded-lg bg-green-50 text-green-800 border border-green-200">{message}</div>}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input type="text" placeholder="Họ và tên của bạn..." value={customerName} onChange={(e) => setCustomerName(e.target.value)} required className="border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-black" />
                            <input type="text" placeholder="Số điện thoại liên hệ..." value={phone} onChange={(e) => setPhone(e.target.value)} required className="border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-black" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                            <div>
                                <label className="block text-gray-500 mb-1 font-bold">Ngày nhận thiết bị</label>
                                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-black" />
                            </div>
                            <div>
                                <label className="block text-gray-500 mb-1 font-bold">Ngày trả thiết bị</label>
                                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-black" />
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-black text-white py-4 rounded-xl font-bold text-sm hover:bg-gray-800 transition shadow-lg">
                            XÁC NHẬN ĐẶT THUÊ NGAY
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}