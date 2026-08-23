import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-black text-white pt-16 pb-12 border-t border-gray-800 mt-20">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-gray-800">

                {/* Cột 1: Thông tin thương hiệu */}
                <div className="space-y-4">
                    <span className="text-xl font-black tracking-tighter bg-white text-black px-2.5 py-1 inline-block">⚡ PIX RENT</span>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Hệ thống cho thuê máy ảnh, ống kính và thiết bị quay phim chuyên nghiệp hàng đầu. Đồng hành cùng mọi creator và nhà làm phim.
                    </p>
                </div>

                {/* Cột 2: Danh mục thiết bị */}
                <div className="space-y-3">
                    <h4 className="font-bold text-sm tracking-wider uppercase text-gray-300">Danh mục chính</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><Link to="/category" className="hover:text-white transition">Máy ảnh Sony & Canon</Link></li>
                        <li><Link to="/category" className="hover:text-white transition">Ống kính G-Master / Prime</Link></li>
                        <li><Link to="/category" className="hover:text-white transition">Đèn Led Nanlite / Amaran</Link></li>
                        <li><Link to="/category" className="hover:text-white transition">Gimbal & Chống rung DJI</Link></li>
                    </ul>
                </div>

                {/* Cột 3: Kết nối & Liên hệ có kèm Icon Facebook, TikTok, Zalo */}
                <div className="space-y-3">
                    <h4 className="font-bold text-sm tracking-wider uppercase text-gray-300">Kết nối & Liên hệ</h4>
                    <ul className="space-y-3 text-sm text-gray-400">

                        {/* Hotline */}
                        <li className="flex items-center gap-3">
                            <span className="w-6 h-6 flex items-center justify-center bg-gray-900 rounded text-xs">📞</span>
                            <div>
                                <span className="block text-[10px] text-gray-500 uppercase font-bold">Hotline</span>
                                <a href="tel:0935508594" className="font-semibold text-white hover:underline">0935.508.594</a>
                            </div>
                        </li>

                        {/* Zalo */}
                        <li className="flex items-center gap-3">
                            <span className="w-6 h-6 flex items-center justify-center bg-blue-900/40 text-blue-400 rounded text-xs font-black">Z</span>
                            <div>
                                <span className="block text-[10px] text-gray-500 uppercase font-bold">Zalo</span>
                                <a href="https://zalo.me/0935508594" target="_blank" rel="noreferrer" className="font-semibold text-white hover:underline">0935.508.594</a>
                            </div>
                        </li>

                        {/* Facebook Fanpage */}
                        <li className="flex items-center gap-3">
                            <svg className="w-6 h-6 fill-blue-500 shrink-0" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            <div>
                                <span className="block text-[10px] text-gray-500 uppercase font-bold">Fanpage Facebook</span>
                                <a href="https://www.facebook.com/PixProduction" target="_blank" rel="noreferrer" className="font-semibold text-white hover:underline">PIX Rent - Cho Thuê Máy Ảnh</a>
                            </div>
                        </li>

                        {/* TikTok */}
                        <li className="flex items-center gap-3">
                            <svg className="w-6 h-6 fill-white shrink-0" viewBox="0 0 24 24">
                                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                            </svg>
                            <div>
                                <span className="block text-[10px] text-gray-500 uppercase font-bold">TikTok</span>
                                <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="font-semibold text-white hover:underline">@pixrent.official</a>
                            </div>
                        </li>

                    </ul>
                </div>

                {/* Cột 4: Giờ làm việc & Địa chỉ */}
                <div className="space-y-3">
                    <h4 className="font-bold text-sm tracking-wider uppercase text-gray-300">Cửa hàng & Thời gian</h4>
                    <p className="text-sm text-gray-400">
                        <strong>Địa chỉ:</strong> 40/8 Nguyễn Hữu Thọ, Quận Hải Châu, Thành phố Đà Nẵng.
                    </p>
                    <p className="text-sm text-gray-400">
                        <strong>Giờ mở cửa:</strong> 08:00 - 21:00 (Thứ Hai - Chủ Nhật)
                    </p>
                </div>

            </div>

            {/* Copyright */}
            <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500">
                <p>© 2026 PIX RENT Platform. All rights reserved.</p>
                <p className="mt-2 sm:mt-0">Thiết kế tối ưu cho Creator & Nhà làm phim chuyên nghiệp.</p>
            </div>
        </footer>
    );
}