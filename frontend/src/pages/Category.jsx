import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';

import categoryCameraImg from '../assets/category-camera.jpg';
import categoryLensImg from '../assets/category-lens.jpg';
import categoryAccessoryImg from '../assets/category-accessory.jpg';
import categoryLedLightImg from '../assets/category-led-light.jpg';
import categoryGimbalImg from '../assets/category-gimbal.jpg';
import a74CameraImg from '../assets/a74-camera.jpg';

export default function Category() {
    const [dbCameras, setDbCameras] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('Tất cả');

    const defaultCameras = [
        { id: 'def-1', name: 'Sony A7 IV + Kit 24-70mm', brand: 'Sony', category: 'Máy ảnh', price_6h: 210000, price_12h: 280000, price_24h: 350000, image: a74CameraImg },
        { id: 'def-2', name: 'Canon EOS R6 Mark II', brand: 'Canon', category: 'Máy ảnh', price_6h: 240000, price_12h: 320000, price_24h: 400000, image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=600&q=80' },
        { id: 'def-3', name: 'Sony FE 35mm f/1.4 GM', brand: 'Sony', category: 'Ống kính', price_6h: 150000, price_12h: 200000, price_24h: 250000, image: categoryLensImg },
        { id: 'def-4', name: 'Godox AD200 Pro Strobe', brand: 'Godox', category: 'Flash', price_6h: 90000, price_12h: 120000, price_24h: 150000, image: categoryAccessoryImg },
        { id: 'def-5', name: 'Đèn Nanlite Forza 60B', brand: 'Nanlite', category: 'Đèn Led', price_6h: 110000, price_12h: 150000, price_24h: 180000, image: categoryLedLightImg },
        { id: 'def-6', name: 'Gimbal DJI Ronin RS 3 Pro', brand: 'DJI', category: 'Gimbal', price_6h: 120000, price_12h: 160000, price_24h: 200000, image: categoryGimbalImg }
    ];

    // Hàm xử lý ảnh an toàn chống lỗi mất ảnh
    const getSafeImage = (img) => {
        if (!img) return categoryCameraImg;
        if (img.startsWith('http') || img.startsWith('data:') || img.startsWith('/')) return img;
        return categoryCameraImg;
    };

    useEffect(() => {
        fetch(`${API_URL}/api/cameras`)
            .then((res) => res.json())
            .then((data) => {
                const formatted = data.map(item => ({ ...item, id: item.id }));
                setDbCameras(formatted);
            })
            .catch((err) => console.error('Lỗi khi tải thiết bị:', err));
    }, []);

    const allCameras = [...defaultCameras, ...dbCameras];
    const filteredCameras = selectedBrand === 'Tất cả'
        ? allCameras
        : allCameras.filter(cam => cam.brand?.toLowerCase() === selectedBrand.toLowerCase());

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
            <h1 className="text-2xl md:text-3xl font-extrabold mb-6 tracking-tight">Danh mục thiết bị & Bảng giá linh hoạt</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
                {/* Bộ lọc */}
                <div className="border border-gray-200 rounded-xl p-4 md:p-6 bg-gray-50 h-fit space-y-4">
                    <h3 className="font-bold text-sm uppercase tracking-wider text-gray-700">Bộ lọc thông minh</h3>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Hãng</label>
                        <select
                            value={selectedBrand}
                            onChange={(e) => setSelectedBrand(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2.5 bg-white text-sm focus:outline-none focus:border-black"
                        >
                            <option value="Tất cả">Tất cả hãng</option>
                            <option value="Sony">Sony</option>
                            <option value="Canon">Canon</option>
                            <option value="Nanlite">Nanlite / Amaran</option>
                            <option value="Godox">Godox</option>
                            <option value="DJI">DJI</option>
                        </select>
                    </div>
                </div>

                {/* Lưới sản phẩm */}
                <div className="md:col-span-3">
                    {filteredCameras.length === 0 ? (
                        <div className="border border-dashed border-gray-300 rounded-xl p-12 text-center bg-gray-50">
                            <p className="text-gray-500 text-sm font-medium">Chưa có thiết bị nào thuộc hãng này.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCameras.map((cam) => (
                                <div key={cam.id} className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                                    <div>
                                        <div className="h-48 bg-gray-50 p-3 flex items-center justify-center relative overflow-hidden border-b border-gray-100">
                                            <span className="absolute top-3 left-3 bg-black text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider z-10">
                                                {cam.category || 'Thiết bị'}
                                            </span>
                                            <img
                                                src={getSafeImage(cam.image)}
                                                alt={cam.name}
                                                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h4 className="font-bold text-sm text-gray-900 line-clamp-1">{cam.name}</h4>
                                            <p className="text-xs text-gray-500 mt-0.5">{cam.brand || 'Chính hãng'}</p>

                                            <div className="mt-3 grid grid-cols-3 gap-1 bg-gray-50 p-2 rounded-lg text-center border border-gray-100">
                                                <div>
                                                    <span className="block text-[9px] text-gray-400 font-bold uppercase">6H</span>
                                                    <span className="text-xs font-black text-gray-800">{Number(cam.price_6h || cam.price6h || 0).toLocaleString('vi-VN')}đ</span>
                                                </div>
                                                <div className="border-x border-gray-200">
                                                    <span className="block text-[9px] text-gray-400 font-bold uppercase">12H</span>
                                                    <span className="text-xs font-black text-gray-800">{Number(cam.price_12h || cam.price12h || 0).toLocaleString('vi-VN')}đ</span>
                                                </div>
                                                <div>
                                                    <span className="block text-[9px] text-gray-400 font-bold uppercase">24H</span>
                                                    <span className="text-xs font-black text-green-700">{Number(cam.price_24h || cam.price24h || 0).toLocaleString('vi-VN')}đ</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 pt-0">
                                        <Link
                                            to={`/product/${cam.id}`}
                                            className="w-full block text-center bg-black text-white py-2.5 rounded-md text-xs font-bold hover:bg-gray-800 transition"
                                        >
                                            XEM CHI TIẾT & ĐẶT THUÊ
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}