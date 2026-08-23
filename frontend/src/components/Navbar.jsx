import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Import logo đúng đuôi .jpg từ thư mục assets
import logoPixImg from '../assets/logo-pix.jpg';

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            {/* Top Bar thông tin liên hệ phía trên */}
            <div className="bg-black text-white text-xs py-2 px-6 hidden md:flex justify-between items-center">
                <div className="flex items-center space-x-6">
                    <span>📍 Địa chỉ: 40/8 Nguyễn Hữu Thọ, Đà Nẵng</span>
                    <span>📞 Hotline: 0935.508.594</span>
                </div>
                <div className="flex items-center space-x-4">
                    <a href="#" className="hover:underline">Fanpage Facebook</a>
                    <a href="#" className="hover:underline">Instagram</a>
                    <a href="#" className="hover:underline">Google Maps</a>
                </div>
            </div>

            {/* Main Navbar chính - Đã mở rộng chiều cao lên h-24 */}
            <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
                {/* Logo phóng to cực đại, sắc nét và cân đối */}
                <Link to="/" className="flex items-center group">
                    <img
                        src={logoPixImg}
                        alt="PIX RENT Logo"
                        className="h-20 w-auto object-contain group-hover:opacity-95 transition"
                    />
                </Link>

                {/* Menu điều hướng */}
                <nav className="hidden md:flex items-center space-x-8 font-semibold text-sm">
                    <Link to="/" className="hover:text-blue-600 transition">Trang chủ</Link>
                    <Link to="/category" className="hover:text-blue-600 transition">Máy ảnh & Thiết bị</Link>
                    <Link to="/admin" className="hover:text-blue-600 transition">Admin Panel</Link>
                </nav>

                {/* Nút Đặt Thuê Ngay */}
                <div>
                    <button
                        onClick={() => navigate('/category')}
                        className="bg-black text-white font-bold text-xs uppercase px-6 py-3 rounded-full hover:bg-gray-800 transition shadow-md"
                    >
                        ĐẶT THUÊ NGAY
                    </button>
                </div>
            </div>
        </header>
    );
}