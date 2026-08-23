import React from 'react';

export default function FloatingContact() {
    return (
        <div className="fixed right-6 bottom-6 z-50 flex flex-col space-y-3 select-none">
            {/* 1. Nút Chat Facebook */}
            <a
                href="https://www.facebook.com/PixProduction" // Thay bằng link Fanpage Facebook của bạn
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 bg-white border border-gray-200 px-4 py-2.5 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
            >
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-sm shadow-md group-hover:bg-blue-700">
                    f
                </div>
                <div className="text-left">
                    <span className="block font-bold text-xs text-gray-900">Chat Facebook</span>
                    <span className="block text-[10px] text-gray-500 font-medium">(9h-22h)</span>
                </div>
            </a>

            {/* 2. Nút Chat Zalo */}
            <a
                href="https://zalo.me/0935508594" // Số điện thoại Zalo của cửa hàng bạn
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 bg-white border border-gray-200 px-4 py-2.5 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
            >
                <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs shadow-md group-hover:bg-blue-600">
                    Zalo
                </div>
                <div className="text-left">
                    <span className="block font-bold text-xs text-gray-900">Chat Zalo</span>
                    <span className="block text-[10px] text-gray-500 font-medium">(9h-22h)</span>
                </div>
            </a>

            {/* 3. Nút Hotline Tư Vấn */}
            <a
                href="tel:0935508594" // Số điện thoại gọi nhanh
                className="flex items-center space-x-3 bg-white border border-gray-200 px-4 py-2.5 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
            >
                <div className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center text-white text-base shadow-md group-hover:bg-green-700">
                    📞
                </div>
                <div className="text-left">
                    <span className="block font-bold text-xs text-gray-900">Hotline Tư Vấn</span>
                    <span className="block text-[10px] text-gray-500 font-medium">(9h-19h)</span>
                </div>
            </a>
        </div>
    );
}