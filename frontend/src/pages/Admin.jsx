import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';

export default function Admin() {
    // Trạng thái bảo mật mã PIN
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [inputPin, setInputPin] = useState('');
    const ADMIN_PIN = '1234'; // Bạn có thể đổi mã PIN tại đây

    const [cameras, setCameras] = useState([]);
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('Sony');
    const [category, setCategory] = useState('Máy ảnh');
    const [price6h, setPrice6h] = useState('');
    const [price12h, setPrice12h] = useState('');
    const [price24h, setPrice24h] = useState('');
    const [image, setImage] = useState('');

    // Thông số kỹ thuật linh hoạt cho mọi thiết bị
    const [sensor, setSensor] = useState('');
    const [isoRange, setIsoRange] = useState('');
    const [lensMount, setLensMount] = useState('');
    const [weight, setWeight] = useState('');
    const [videoCapabilities, setVideoCapabilities] = useState('');
    const [batteryLife, setBatteryLife] = useState('');

    const [message, setMessage] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (inputPin === ADMIN_PIN) {
            setIsLoggedIn(true);
            setMessage('');
        } else {
            setMessage('❌ Mã PIN không chính xác! Vui lòng thử lại.');
        }
    };

    const fetchCameras = async () => {
        try {
            const res = await fetch(`${API_URL}/api/cameras`);
            const data = await res.json();
            setCameras(data);
        } catch (err) {
            console.error('Lỗi tải danh sách thiết bị:', err);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            fetchCameras();
        }
    }, [isLoggedIn]);

    const handleAddCamera = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/api/cameras`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    brand,
                    category,
                    price_6h: Number(price6h),
                    price_12h: Number(price12h),
                    price_24h: Number(price24h),
                    image,
                    sensor,
                    isoRange,
                    lensMount,
                    weight,
                    videoCapabilities,
                    batteryLife
                })
            });

            if (res.ok) {
                setMessage('✅ Thêm thiết bị thành công vào hệ thống!');
                setName('');
                setPrice6h('');
                setPrice12h('');
                setPrice24h('');
                setImage('');
                setSensor('');
                setIsoRange('');
                setLensMount('');
                setWeight('');
                setVideoCapabilities('');
                setBatteryLife('');
                fetchCameras();
            } else {
                setMessage('❌ Lỗi khi thêm thiết bị.');
            }
        } catch (err) {
            setMessage('❌ Không thể kết nối tới server.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa thiết bị này?')) return;
        try {
            const res = await fetch(`${API_URL}/api/cameras/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                setMessage('🗑️ Đã xóa thiết bị thành công!');
                fetchCameras();
            } else {
                setMessage('❌ Lỗi khi xóa thiết bị.');
            }
        } catch (err) {
            setMessage('❌ Không thể kết nối tới server.');
        }
    };

    // NẾU CHƯA ĐĂNG NHẬP -> HIỂN THỊ MÀN HÌNH NHẬP MÃ PIN
    if (!isLoggedIn) {
        return (
            <div className="max-w-md mx-auto px-6 py-24">
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm text-center space-y-6">
                    <h2 className="text-2xl font-black">🔐 Đăng Nhập Quản Trị</h2>
                    <p className="text-xs text-gray-500">Vui lòng nhập mã PIN bảo mật để truy cập Admin Panel (Mã mặc định: 1234)</p>

                    {message && <div className="p-3 text-xs font-bold rounded-lg bg-red-50 text-red-700 border border-red-200">{message}</div>}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            value={inputPin}
                            onChange={(e) => setInputPin(e.target.value)}
                            placeholder="Nhập mã PIN..."
                            required
                            className="w-full border border-gray-300 rounded-xl p-3 text-center text-lg tracking-widest focus:outline-none focus:border-black"
                        />
                        <button type="submit" className="w-full bg-black text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider hover:bg-gray-800 transition">
                            Xác Nhận Đăng Nhập
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // NẾU ĐÃ ĐĂNG NHẬP THÀNH CÔNG -> HIỂN THỊ GIAO DIỆN ADMIN
    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-black">Trang Quản Trị Hệ Thống (Admin Panel)</h1>
                <button onClick={() => setIsLoggedIn(false)} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-200 transition">
                    Đăng Xuất 🔒
                </button>
            </div>

            {message && <div className="mb-6 p-4 text-sm font-bold rounded-xl bg-blue-50 text-blue-900 border border-blue-200">{message}</div>}

            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm mb-12">
                <h3 className="font-extrabold text-lg mb-6">Thêm Thiết Bị & Bảng Giá Mới</h3>

                <form onSubmit={handleAddCamera} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-2">Tên thiết bị (VD: Sony 16-35pz)</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-black" placeholder="Nhập tên thiết bị..." />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-2">Hãng sản xuất</label>
                            <select value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 text-sm bg-white focus:outline-none focus:border-black">
                                <option value="Sony">Sony</option>
                                <option value="Canon">Canon</option>
                                <option value="Nanlite">Nanlite / Amaran</option>
                                <option value="Godox">Godox</option>
                                <option value="DJI">DJI</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-2">Phân loại thiết bị</label>
                            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 text-sm bg-white focus:outline-none focus:border-black">
                                <option value="Máy ảnh">Máy ảnh</option>
                                <option value="Ống kính">Ống kính</option>
                                <option value="Đèn Led">Đèn Led</option>
                                <option value="Flash">Flash</option>
                                <option value="Gimbal">Gimbal</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-2">Giá thuê 6 Giờ (VNĐ)</label>
                            <input type="number" value={price6h} onChange={(e) => setPrice6h(e.target.value)} required className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-black" placeholder="VD: 150000" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-2">Giá thuê 12 Giờ (VNĐ)</label>
                            <input type="number" value={price12h} onChange={(e) => setPrice12h(e.target.value)} required className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-black" placeholder="VD: 200000" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-2">Giá thuê 24 Giờ (VNĐ)</label>
                            <input type="number" value={price24h} onChange={(e) => setPrice24h(e.target.value)} required className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-black" placeholder="VD: 250000" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-2">Đường dẫn ảnh trực tiếp (URL) hoặc tên file trong thư mục public (VD: a73-camera.jpg)</label>
                        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-black" placeholder="Dán link ảnh hoặc điền tên file..." />
                    </div>

                    {/* KHU VỰC THÔNG SỐ LINH HOẠT CHO MỌI THIẾT BỊ */}
                    <div className="border-t border-gray-200 pt-6">
                        <h4 className="font-extrabold text-sm mb-4 text-gray-800">Thông số kỹ thuật linh hoạt</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                            <div>
                                <label className="block font-semibold text-gray-600 mb-1">Thông số chính</label>
                                <input type="text" value={sensor} onChange={(e) => setSensor(e.target.value)} placeholder="VD: Tiêu cự 16-35mm / Công suất 60W" className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-black" />
                            </div>
                            <div>
                                <label className="block font-semibold text-gray-600 mb-1">Đặc tính kỹ thuật</label>
                                <input type="text" value={isoRange} onChange={(e) => setIsoRange(e.target.value)} placeholder="VD: Khẩu độ f/4 / Nhiệt độ màu 2700K" className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-black" />
                            </div>
                            <div>
                                <label className="block font-semibold text-gray-600 mb-1">Ngàm / Tương thích</label>
                                <input type="text" value={lensMount} onChange={(e) => setLensMount(e.target.value)} placeholder="VD: Sony E-mount / Universal" className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-black" />
                            </div>
                            <div>
                                <label className="block font-semibold text-gray-600 mb-1">Trọng lượng</label>
                                <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="VD: 353g" className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-black" />
                            </div>
                            <div>
                                <label className="block font-semibold text-gray-600 mb-1">Tính năng nổi bật</label>
                                <input type="text" value={videoCapabilities} onChange={(e) => setVideoCapabilities(e.target.value)} placeholder="VD: Power Zoom, Chống bụi ẩm" className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-black" />
                            </div>
                            <div>
                                <label className="block font-semibold text-gray-600 mb-1">Nguồn điện / Pin</label>
                                <input type="text" value={batteryLife} onChange={(e) => setBatteryLife(e.target.value)} placeholder="VD: Pin rời / Sạc trực tiếp" className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-black" />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-black text-white font-bold py-4 rounded-xl text-sm uppercase tracking-wider hover:bg-gray-800 transition shadow-md">
                        Lưu thiết bị và bảng giá vào cơ sở dữ liệu
                    </button>
                </form>
            </div>

            {/* Danh sách thiết bị hiện tại */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <h3 className="font-extrabold text-lg mb-6">Danh sách thiết bị trong cơ sở dữ liệu</h3>
                {cameras.length === 0 ? (
                    <p className="text-sm text-gray-500">Chưa có thiết bị nào trong cơ sở dữ liệu.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-sm">
                            <thead>
                                <tr className="border-b border-gray-200 text-gray-400 text-xs uppercase">
                                    <th className="py-3 px-4">Tên thiết bị</th>
                                    <th className="py-3 px-4">Hãng</th>
                                    <th className="py-3 px-4">Loại</th>
                                    <th className="py-3 px-4">Giá 24h</th>
                                    <th className="py-3 px-4 text-right">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {cameras.map((cam) => (
                                    <tr key={cam.id} className="hover:bg-gray-50">
                                        <td className="py-3 px-4 font-bold text-gray-900">{cam.name}</td>
                                        <td className="py-3 px-4 text-gray-600">{cam.brand}</td>
                                        <td className="py-3 px-4">
                                            <span className="bg-gray-100 text-gray-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                                                {cam.category || 'Thiết bị'}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 font-black text-green-700">{Number(cam.price_24h || 0).toLocaleString('vi-VN')}đ</td>
                                        <td className="py-3 px-4 text-right">
                                            <button onClick={() => handleDelete(cam.id)} className="bg-red-50 text-red-600 font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-red-100 transition">
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}