import React, { useState } from 'react';

export default function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState('');
    const [activeTab, setActiveTab] = useState('add-camera');
    const [bookings, setBookings] = useState([]);
    const [loadingBookings, setLoadingBookings] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        brand: 'Sony',
        category: 'Máy ảnh',
        price6h: '',
        price12h: '',
        price24h: '',
        stockTotal: 1,
        sensor: '',
        isoRange: '',
        lensMount: '',
        weight: '',
        videoCapabilities: '',
        batteryLife: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (pin === '0601') {
            setIsAuthenticated(true);
            fetchBookings();
        } else {
            alert('Sai mã PIN quản trị!');
        }
    };

    const fetchBookings = async () => {
        setLoadingBookings(true);
        try {
            const res = await fetch('http://localhost:5000/api/admin/bookings', {
                headers: { 'x-admin-auth': 'PIX_ADMIN_SUPER_SECRET' }
            });
            const data = await res.json();
            if (res.ok) setBookings(data);
        } catch (err) {
            console.error('Lỗi tải danh sách đơn thuê:', err);
        }
        setLoadingBookings(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (let key in formData) {
            data.append(key, formData[key]);
        }
        if (imageFile) {
            data.append('image', imageFile);
        }

        try {
            const response = await fetch('http://localhost:5000/api/admin/cameras', {
                method: 'POST',
                headers: { 'x-admin-auth': 'PIX_ADMIN_SUPER_SECRET' },
                body: data
            });

            const result = await response.json();
            if (response.ok) {
                setMessage('✅ Thêm thiết bị và các mức giá thuê vào MySQL thành công!');
                setFormData({ name: '', brand: 'Sony', category: 'Máy ảnh', price6h: '', price12h: '', price24h: '', stockTotal: 1, sensor: '', isoRange: '', lensMount: '', weight: '', videoCapabilities: '', batteryLife: '' });
                setImageFile(null);
            } else {
                setMessage('❌ Lỗi: ' + result.error);
            }
        } catch (err) {
            setMessage('❌ Không thể kết nối tới server!');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl p-8 shadow-xl">
                    <h2 className="text-2xl font-black mb-2 text-center">Khu vực Quản trị</h2>
                    <p className="text-xs text-gray-500 text-center mb-6">Nhập mã PIN để quản lý kho máy và thiết lập bảng giá.</p>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            placeholder="Nhập mã PIN (1234)..."
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 text-center text-lg tracking-widest focus:outline-none focus:border-black font-bold"
                            autoFocus
                        />
                        <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-bold text-sm hover:bg-gray-800 transition">
                            XÁC THỰC QUYỀN ADMIN
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight">Admin Dashboard</h1>
                    <p className="text-sm text-gray-500">Quản lý kho thiết bị, thiết lập bảng giá linh hoạt theo giờ và theo dõi đơn thuê.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setActiveTab('add-camera')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition ${activeTab === 'add-camera' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                        + Thêm thiết bị mới
                    </button>
                    <button
                        onClick={() => { setActiveTab('bookings'); fetchBookings(); }}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition ${activeTab === 'bookings' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                        📋 Khách hàng đặt thuê ({bookings.length})
                    </button>
                    <button
                        onClick={() => setIsAuthenticated(false)}
                        className="text-xs bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg font-bold transition"
                    >
                        Đăng xuất
                    </button>
                </div>
            </div>

            {message && (
                <div className={`p-4 mb-6 rounded-xl text-sm font-medium ${message.includes('✅') ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                    {message}
                </div>
            )}

            {activeTab === 'add-camera' && (
                <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm space-y-6">
                    <h3 className="text-lg font-bold border-b pb-3">Thêm thiết bị & Thiết lập bảng giá linh hoạt</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Tên thiết bị</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="VD: Sony A7 IV" className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-black" />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Hãng sản xuất</label>
                            <select name="brand" value={formData.brand} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 text-sm bg-white focus:outline-none focus:border-black">
                                <option value="Sony">Sony</option>
                                <option value="Canon">Canon</option>
                                <option value="Nanlite">Nanlite / Amaran</option>
                                <option value="Godox">Godox</option>
                                <option value="DJI">DJI</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Danh mục</label>
                            <select name="category" value={formData.category} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 text-sm bg-white focus:outline-none focus:border-black">
                                <option value="Máy ảnh">Máy ảnh</option>
                                <option value="Ống kính">Ống kính</option>
                                <option value="Đèn Led">Đèn Led</option>
                                <option value="Flash">Flash</option>
                                <option value="Gimbal">Gimbal</option>
                                <option value="Chân máy">Chân máy</option>
                                <option value="Âm thanh">Âm thanh</option>
                                <option value="Phụ kiện">Phụ kiện</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Số lượng kho</label>
                            <input type="number" name="stockTotal" value={formData.stockTotal} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-black" />
                        </div>

                        {/* BẢNG GIÁ LINH HOẠT 6H, 12H, 24H */}
                        <div className="md:col-span-2 bg-gray-50 p-4 rounded-xl border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase text-green-700 mb-1">Giá Thuê 6H (VNĐ)</label>
                                <input type="number" name="price6h" value={formData.price6h} onChange={handleChange} required placeholder="VD: 210000" className="w-full border border-gray-300 rounded-lg p-3 text-sm bg-white focus:outline-none focus:border-black font-semibold" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-green-700 mb-1">Giá Thuê 12H (VNĐ)</label>
                                <input type="number" name="price12h" value={formData.price12h} onChange={handleChange} required placeholder="VD: 280000" className="w-full border border-gray-300 rounded-lg p-3 text-sm bg-white focus:outline-none focus:border-black font-semibold" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-green-700 mb-1">Giá Thuê 24H (VNĐ)</label>
                                <input type="number" name="price24h" value={formData.price24h} onChange={handleChange} required placeholder="VD: 350000" className="w-full border border-gray-300 rounded-lg p-3 text-sm bg-white focus:outline-none focus:border-black font-semibold" />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Hình ảnh thiết bị (Chọn file từ máy tính)</label>
                            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} required className="w-full border border-gray-300 rounded-lg p-2 text-sm bg-gray-50 focus:outline-none file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800" />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                        <h4 className="font-bold text-sm mb-4">Thông số kỹ thuật chi tiết (Specs)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" name="sensor" placeholder="Cảm biến (VD: Full-frame Exmor R)" value={formData.sensor} onChange={handleChange} className="border border-gray-300 rounded-lg p-3 text-sm" />
                            <input type="text" name="isoRange" placeholder="Dải ISO (VD: 100 - 51200)" value={formData.isoRange} onChange={handleChange} className="border border-gray-300 rounded-lg p-3 text-sm" />
                            <input type="text" name="lensMount" placeholder="Ngàm ống kính (VD: E-mount)" value={formData.lensMount} onChange={handleChange} className="border border-gray-300 rounded-lg p-3 text-sm" />
                            <input type="text" name="weight" placeholder="Trọng lượng (VD: 658g)" value={formData.weight} onChange={handleChange} className="border border-gray-300 rounded-lg p-3 text-sm" />
                            <input type="text" name="videoCapabilities" placeholder="Khả năng quay phim (VD: 4K 60p)" value={formData.videoCapabilities} onChange={handleChange} className="border border-gray-300 rounded-lg p-3 text-sm" />
                            <input type="text" name="batteryLife" placeholder="Thời lượng pin (VD: 400 tấm)" value={formData.batteryLife} onChange={handleChange} className="border border-gray-300 rounded-lg p-3 text-sm" />
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-black text-white py-4 rounded-xl font-bold text-sm hover:bg-gray-800 transition shadow-lg">
                        LƯU THIẾT BỊ VÀ BẢNG GIÁ VÀO MYSQL
                    </button>
                </form>
            )}

            {activeTab === 'bookings' && (
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold mb-4">Danh sách khách hàng đặt thuê thiết bị</h3>

                    {loadingBookings ? (
                        <p className="text-center py-8 text-gray-500 font-medium">Đang tải danh sách đơn thuê...</p>
                    ) : bookings.length === 0 ? (
                        <div className="border border-dashed border-gray-300 rounded-xl p-12 text-center bg-gray-50">
                            <p className="text-gray-500 text-sm font-medium">Chưa có khách hàng nào đặt thuê thiết bị.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-200 text-xs uppercase text-gray-500 bg-gray-50">
                                        <th className="p-3">Mã đơn</th>
                                        <th className="p-3">Khách hàng</th>
                                        <th className="p-3">Số điện thoại</th>
                                        <th className="p-3">Thiết bị thuê</th>
                                        <th className="p-3">Thời gian thuê</th>
                                        <th className="p-3">Tổng tiền</th>
                                        <th className="p-3">Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-sm">
                                    {bookings.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50 transition">
                                            <td className="p-3 font-mono font-bold">#PIX-{item.id}</td>
                                            <td className="p-3 font-bold text-gray-900">{item.customer_name}</td>
                                            <td className="p-3 text-gray-600 font-medium">{item.phone}</td>
                                            <td className="p-3 flex items-center gap-3">
                                                <img src={item.camera_image || 'https://via.placeholder.com/40'} alt="" className="w-10 h-10 object-contain bg-gray-50 border rounded p-1" />
                                                <span className="font-semibold">{item.camera_name}</span>
                                            </td>
                                            <td className="p-3 text-xs text-gray-600">
                                                {item.start_date} → {item.end_date}
                                            </td>
                                            <td className="p-3 font-black text-gray-900">
                                                {Number(item.total_price).toLocaleString('vi-VN')}đ
                                            </td>
                                            <td className="p-3">
                                                <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                                                    {item.status || 'Confirmed'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}