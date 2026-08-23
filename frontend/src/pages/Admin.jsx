import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';

export default function Admin() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [inputPin, setInputPin] = useState('');
    const ADMIN_PIN = '0601';

    const [cameras, setCameras] = useState([]);
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('Sony');
    const [category, setCategory] = useState('Máy ảnh');
    const [price6h, setPrice6h] = useState('');
    const [price12h, setPrice12h] = useState('');
    const [price24h, setPrice24h] = useState('');
    const [image, setImage] = useState('');

    // 6 trường thông số kỹ thuật
    const [spec1, setSpec1] = useState('');
    const [spec2, setSpec2] = useState('');
    const [spec3, setSpec3] = useState('');
    const [spec4, setSpec4] = useState('');
    const [spec5, setSpec5] = useState('');
    const [spec6, setSpec6] = useState('');

    const [message, setMessage] = useState('');

    // HÀM ĐỔI NHÃN VÀ GỢI Ý ĐỘNG THEO LOẠI THIẾT BỊ
    const getFieldLabels = () => {
        switch (category) {
            case 'Ống kính':
                return {
                    l1: { label: 'Tiêu cự', placeholder: 'VD: 16-35mm' },
                    l2: { label: 'Khẩu độ tối đa', placeholder: 'VD: f/4' },
                    l3: { label: 'Ngàm tương thích', placeholder: 'VD: Sony E-mount' },
                    l4: { label: 'Trọng lượng', placeholder: 'VD: 353g' },
                    l5: { label: 'Tính năng đặc biệt', placeholder: 'VD: Power Zoom, Chống bụi ẩm' },
                    l6: { label: 'Kích thước Filter', placeholder: 'VD: 72mm' }
                };
            case 'Đèn Led':
                return {
                    l1: { label: 'Công suất', placeholder: 'VD: 60W' },
                    l2: { label: 'Nhiệt độ màu', placeholder: 'VD: 2700K - 6500K' },
                    l3: { label: 'Chỉ số CRI / TLCI', placeholder: 'VD: CRI 96+' },
                    l4: { label: 'Trọng lượng', placeholder: 'VD: 830g' },
                    l5: { label: 'Hiệu ứng ánh sáng', placeholder: 'VD: 10 hiệu ứng FX' },
                    l6: { label: 'Nguồn điện / Pin', placeholder: 'VD: Pin V-mount / Adapter' }
                };
            case 'Flash':
                return {
                    l1: { label: 'Công suất / GN', placeholder: 'VD: GN60' },
                    l2: { label: 'Tốc độ hồi đèn', placeholder: 'VD: 0.1 - 1.5s' },
                    l3: { label: 'Hệ thống TTL', placeholder: 'VD: Sony / Canon TTL' },
                    l4: { label: 'Trọng lượng', placeholder: 'VD: 560g' },
                    l5: { label: 'Chế độ đèn', placeholder: 'VD: TTL / Manual / Multi' },
                    l6: { label: 'Loại pin', placeholder: 'VD: Pin Li-ion 2900mAh' }
                };
            case 'Gimbal':
                return {
                    l1: { label: 'Tải trọng tối đa', placeholder: 'VD: 4.5 kg' },
                    l2: { label: 'Số trục chống rung', placeholder: 'VD: 3 trục' },
                    l3: { label: 'Góc quay / Xoay', placeholder: 'VD: 360 độ vô cực' },
                    l4: { label: 'Trọng lượng', placeholder: 'VD: 1.5 kg' },
                    l5: { label: 'Màn hình điều khiển', placeholder: 'VD: OLED cảm ứng' },
                    l6: { label: 'Thời gian pin', placeholder: 'VD: 12 giờ' }
                };
            default: // Máy ảnh
                return {
                    l1: { label: 'Cảm biến', placeholder: 'VD: Full-frame Exmor R' },
                    l2: { label: 'Dải ISO', placeholder: 'VD: 100 - 51200' },
                    l3: { label: 'Ngàm ống kính', placeholder: 'VD: E-mount' },
                    l4: { label: 'Trọng lượng', placeholder: 'VD: 658g' },
                    l5: { label: 'Khả năng quay phim', placeholder: 'VD: 4K 60p' },
                    l6: { label: 'Thời lượng pin', placeholder: 'VD: 400 tấm' }
                };
        }
    };

    const labels = getFieldLabels();

    const handleLogin = (e) => {
        e.preventDefault();
        if (inputPin === ADMIN_PIN) {
            setIsLoggedIn(true);
            setMessage('');
        } else {
            setMessage('❌ Mã PIN không chính xác!');
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
                    sensor: spec1,
                    isoRange: spec2,
                    lensMount: spec3,
                    weight: spec4,
                    videoCapabilities: spec5,
                    batteryLife: spec6
                })
            });

            if (res.ok) {
                setMessage('✅ Thêm thiết bị thành công vào hệ thống!');
                setName('');
                setPrice6h('');
                setPrice12h('');
                setPrice24h('');
                setImage('');
                setSpec1('');
                setSpec2('');
                setSpec3('');
                setSpec4('');
                setSpec5('');
                setSpec6('');
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

    if (!isLoggedIn) {
        return (
            <div className="max-w-md mx-auto px-6 py-24">
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm text-center space-y-6">
                    <h2 className="text-2xl font-black">🔐 Đăng Nhập Quản Trị</h2>
                    <p className="text-xs text-gray-500">Nhập mã PIN để tiếp tục (Mặc định: 1234)</p>
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

                    {/* KHU VỰC THÔNG SỐ ĐỘNG THEO LOẠI THIẾT BỊ */}
                    <div className="border-t border-gray-200 pt-6">
                        <h4 className="font-extrabold text-sm mb-4 text-gray-800">
                            Thông số kỹ thuật chi tiết cho: <span className="text-blue-600 uppercase">{category}</span>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                            <div>
                                <label className="block font-semibold text-gray-600 mb-1">{labels.l1.label}</label>
                                <input type="text" value={spec1} onChange={(e) => setSpec1(e.target.value)} placeholder={labels.l1.placeholder} className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-black" />
                            </div>
                            <div>
                                <label className="block font-semibold text-gray-600 mb-1">{labels.l2.label}</label>
                                <input type="text" value={spec2} onChange={(e) => setSpec2(e.target.value)} placeholder={labels.l2.placeholder} className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-black" />
                            </div>
                            <div>
                                <label className="block font-semibold text-gray-600 mb-1">{labels.l3.label}</label>
                                <input type="text" value={spec3} onChange={(e) => setSpec3(e.target.value)} placeholder={labels.l3.placeholder} className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-black" />
                            </div>
                            <div>
                                <label className="block font-semibold text-gray-600 mb-1">{labels.l4.label}</label>
                                <input type="text" value={spec4} onChange={(e) => setSpec4(e.target.value)} placeholder={labels.l4.placeholder} className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-black" />
                            </div>
                            <div>
                                <label className="block font-semibold text-gray-600 mb-1">{labels.l5.label}</label>
                                <input type="text" value={spec5} onChange={(e) => setSpec5(e.target.value)} placeholder={labels.l5.placeholder} className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-black" />
                            </div>
                            <div>
                                <label className="block font-semibold text-gray-600 mb-1">{labels.l6.label}</label>
                                <input type="text" value={spec6} onChange={(e) => setSpec6(e.target.value)} placeholder={labels.l6.placeholder} className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-black" />
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