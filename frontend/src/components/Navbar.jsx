import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoPixImg from '../assets/logo-pix.jpg';

export default function Navbar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            {/* Top Bar thông tin liên hệ phía trên */}
            <div className="bg-black text-white text-[10px] md:text-xs py-2 px-4 md:px-6 flex justify-between items-center">
                <div className="truncate mr-2">
                    <span>📍 40/8 Nguyễn Hữu Thọ, Đà Nẵng</span>
                </div>
                <div className="hidden sm:flex items-center space-x-4">
                    <a href="#" className="hover:underline">Facebook</a>
                    <a href="#" className="hover:underline">Instagram</a>
                    <a href="#" className="hover:underline">Google Maps</a>
                </div>
            </div>

            {/* Main Navbar chính */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 md:h-24 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center group">
                    <img
                        src={logoPixImg}
                        alt="PIX RENT Logo"
                        className="h-12 md:h-20 w-auto object-contain"
                    />
                </Link>

                {/* Menu cho Desktop */}
                <nav className="hidden md:flex items-center space-x-8 font-semibold text-sm">
                    <Link to="/" className="hover:text-blue-600 transition">Trang chủ</Link>
                    <Link to="/category" className="hover:text-blue-600 transition">Máy ảnh & Thiết bị</Link>
                    <Link to="/admin" className="hover:text-blue-600 transition">Admin Panel</Link>
                </nav>

                {/* Nút Đặt Thuê Ngay (Desktop) */}
                <div className="hidden md:block">
                    <button
                        onClick={() => navigate('/category')}
                        className="bg-black text-white font-bold text-xs uppercase px-6 py-3 rounded-full hover:bg-gray-800 transition shadow-md"
                    >
                        ĐẶT THUÊ NGAY
                    </button>
                </div>

                {/* Nút Hamburger Menu (Mobile) */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-gray-800 focus:outline-none p-2"
                    aria-label="Toggle Menu"
                >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Menu xổ xuống khi bấm trên điện thoại */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-gray-200 px-6 py-4 space-y-3 shadow-lg">
                    <Link
                        to="/"
                        onClick={() => setIsOpen(false)}
                        className="block font-semibold text-sm py-2 border-b border-gray-100"
                    >
                        Trang chủ
                    </Link>
                    <Link
                        to="/category"
                        onClick={() => setIsOpen(false)}
                        className="block font-semibold text-sm py-2 border-b border-gray-100"
                    >
                        Máy ảnh & Thiết bị
                    </Link>
                    <Link
                        to="/admin"
                        onClick={() => setIsOpen(false)}
                        className="block font-semibold text-sm py-2 border-b border-gray-100"
                    >
                        Admin Panel
                    </Link>
                    <button
                        onClick={() => { setIsOpen(false); navigate('/category'); }}
                        className="w-full bg-black text-white font-bold text-xs uppercase py-3 rounded-full mt-2 shadow-md"
                    >
                        ĐẶT THUÊ NGAY
                    </button>
                </div>
            )}
        </header>
    );