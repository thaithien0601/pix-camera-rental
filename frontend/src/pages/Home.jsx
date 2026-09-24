import React from 'react';
import { Link } from 'react-router-dom';

// IMPORT HÌNH ẢNH ĐÚNG ĐỊNH DẠNG CHUẨN category-...
import heroBannerImg from '../assets/hero-banner.jpg';
import catSonyCameraImg from '../assets/category-sony-camera.jpg';
import catSonyLensImg from '../assets/category-sony-lens.jpg';
import catLedLightImg from '../assets/category-led-light.jpg';
import catFlashGodoxImg from '../assets/category-flash-godox.jpg';
import catGimbalImg from '../assets/category-gimbal.jpg';
import catVideoTripodImg from '../assets/category-video-tripod.jpg';
import catPhotoTripodImg from '../assets/category-photo-tripod.jpg';
import catAudioMicImg from '../assets/category-audio-mic.jpg';
import catAccessoryImg from '../assets/category-accessory.jpg';

export default function Home() {
    // 9 DANH MỤC CHUYÊN SÂU CỦA TIỆM PIX
    const categories = [
        { title: 'Máy ảnh Sony', desc: 'A7 series, FX line, Cinema line cao cấp đáp ứng mọi khung hình.', img: catSonyCameraImg, tag: 'Hot' },
        { title: 'Ống kính Sony', desc: 'Prime, Zoom G-Master, tiêu cự đa dạng khẩu độ lớn sắc nét.', img: catSonyLensImg, tag: 'Sắc nét' },
        { title: 'Đèn Led Nanlite / Amaran', desc: 'Ánh sáng studio chuyên nghiệp, công suất cao, chuẩn màu CRI.', img: catLedLightImg, tag: 'Studio' },
        { title: 'Flash Godox', desc: 'Đèn chớp studio, flash rời đồng bộ tốc độ cao.', img: catFlashGodoxImg, tag: 'Chớp sáng' },
        { title: 'Gimbal - Chống rung', desc: 'DJI Ronin series hỗ trợ chuyển động mượt mà, ổn định.', img: catGimbalImg, tag: 'Chuyển động' },
        { title: 'Chân máy quay phim', desc: 'Fluid head chắc chắn, chịu tải nặng cho các dòng cinema.', img: catVideoTripodImg, tag: 'Chuyên dụng' },
        { title: 'Chân máy chụp ảnh', desc: 'Carbon siêu nhẹ, linh hoạt cho nhiếp ảnh ngoại cảnh.', img: catPhotoTripodImg, tag: 'Cơ động' },
        { title: 'Âm thanh / Mic thu âm', desc: 'Wireless Go, Shotgun mic thu âm phỏng vấn, phim ảnh trong trẻo.', img: catAudioMicImg, tag: 'Hi-Fi' },
        { title: 'Phụ kiện quay / chụp', desc: 'Filter, thẻ nhớ tốc độ cao, pin dự phòng, monitor trọn gói.', img: catAccessoryImg, tag: 'Đầy đủ' }
    ];

    return (
        <div className="bg-white text-gray-900 min-h-screen font-sans selection:bg-black selection:text-white">

            {/* 1. HERO SECTION */}
            <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-b border-gray-100">
                <div className="space-y-6">
                    <span className="text-xs uppercase tracking-widest text-gray-400 border-b-2 border-black pb-1 font-semibold">
                        PIX RENT // HỆ THỐNG THUÊ MÁY ẢNH CHUYÊN NGHIỆP
                    </span>
                    <h1 className="text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                        Mở khẩu độ,<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">Thuê đúng máy,</span><br />
                        bấm đúng khoảnh khắc.
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed font-normal">
                        PIX hóa việc thuê máy ảnh, ống kính và thiết bị quay chụp cao cấp thành một trải nghiệm nhanh gọn, an toàn tuyệt đối cho creator và nhà làm phim.
                    </p>

                    {/* Ô tìm kiếm nhanh */}
                    <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg p-2 max-w-lg shadow-sm focus-within:border-black transition-all">
                        <input
                            type="text"
                            placeholder="Nhập tên thiết bị (VD: Sony A7 IV, Nanlite...)"
                            className="bg-transparent px-4 py-2 w-full focus:outline-none text-sm text-gray-900 font-medium"
                        />
                        <Link to="/category" className="bg-black text-white px-6 py-3 rounded-md text-xs font-extrabold tracking-wider hover:bg-gray-800 transition whitespace-nowrap">
                            TÌM THIẾT BỊ
                        </Link>
                    </div>

                    {/* Chỉ số uy tín */}
                    <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-100">
                        <div>
                            <p className="text-3xl font-black">500+</p>
                            <p className="text-xs text-gray-500 font-medium mt-0.5">Thiết bị sẵn sàng</p>
                        </div>
                        <div>
                            <p className="text-3xl font-black">4.9/5</p>
                            <p className="text-xs text-gray-500 font-medium mt-0.5">Đánh giá hài lòng</p>
                        </div>
                        <div>
                            <p className="text-3xl font-black">+25k</p>
                            <p className="text-xs text-gray-500 font-medium mt-0.5">Lượt thuê an toàn</p>
                        </div>
                    </div>
                </div>

                {/* Khung Hero Image tự động căn chỉnh */}
                <div className="relative group overflow-hidden rounded-2xl bg-gray-50 border border-gray-200 p-4 shadow-xl flex items-center justify-center">
                    <img
                        src={heroBannerImg}
                        alt="Professional Camera Studio"
                        className="w-full h-[380px] object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
            </section>

            {/* 2. 9 DANH MỤC CHUYÊN SÂU CỦA TIỆM PIX */}
            <section className="max-w-7xl mx-auto px-6 py-20 border-b border-gray-100">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">HỆ THỐNG THIẾT BỊ TOÀN DIỆN</span>
                    <h2 className="text-3xl font-black mt-2 tracking-tight">Pix Rent - Tất cả mọi thứ bạn cần .</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-black hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
                        >
                            <div className="h-48 bg-gray-50 p-3 flex items-center justify-center relative overflow-hidden border-b border-gray-100">
                                <span className="absolute top-3 left-3 bg-black text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider z-10">
                                    {item.tag}
                                </span>
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold mb-1 flex items-center justify-between group-hover:text-black">
                                    {item.title}
                                    <span className="text-gray-300 group-hover:text-black transition-colors">→</span>
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. THIẾT BỊ HOT TRONG TUẦN */}
            <section className="max-w-7xl mx-auto px-6 py-20 border-b border-gray-100">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">XU HƯỚNG TUẦN NÀY</span>
                        <h2 className="text-3xl font-black mt-1 tracking-tight">Thiết bị được thuê nhiều nhất.</h2>
                    </div>
                    <Link to="/category" className="text-sm font-extrabold border-b-2 border-black pb-1 hover:text-gray-600 transition">
                        Xem tất cả thiết bị →
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { name: 'Sony A7 IV + Kit 24-70mm', price: '450.000đ / ngày', img: catSonyCameraImg },
                        { name: 'Sony FE 35mm f/1.4 GM', price: '250.000đ / ngày', img: catSonyLensImg },
                        { name: 'Đèn Nanlite Forza 60B', price: '180.000đ / ngày', img: catLedLightImg },
                        { name: 'Gimbal DJI Ronin RS 3 Pro', price: '200.000đ / ngày', img: catGimbalImg }
                    ].map((prod, idx) => (
                        <div key={idx} className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                            <div>
                                {/* Bọc thẻ Link vào khung ảnh */}
                                <Link to="/product/1" className="h-48 bg-gray-50 p-3 flex items-center justify-center relative overflow-hidden border-b border-gray-100 block">
                                    <span className="absolute top-3 left-3 bg-black text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider z-10">HOT</span>
                                    <img src={prod.img} alt={prod.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                                </Link>
                                <div className="p-4">
                                    {/* Bọc thẻ Link vào tên sản phẩm */}
                                    <Link to="/product/1">
                                        <h4 className="font-bold text-sm text-gray-900 line-clamp-1 hover:text-gray-600 transition">{prod.name}</h4>
                                    </Link>
                                </div>
                            </div>
                            <div className="p-4 pt-0 flex items-center justify-between border-t border-gray-100 mt-2">
                                <div>
                                    <span className="text-[10px] text-gray-400 block uppercase font-bold">Giá thuê</span>
                                    <span className="text-xs font-black text-gray-900">{prod.price}</span>
                                </div>
                                <Link to="/product/1" className="bg-black text-white px-4 py-2 rounded-md text-xs font-bold hover:bg-gray-800 transition">
                                    Thuê ngay
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. QUY TRÌNH 4 BƯỚC */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <h2 className="text-3xl font-black mb-12 tracking-tight">Bốn bước — từ chọn máy đến cầm máy trên tay.</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { step: '01', title: 'Xác thực eKYC', desc: 'Xác minh CCCD và định danh tài khoản an toàn chỉ trong 1 phút.' },
                        { step: '02', title: 'Chọn ngày & đặt giữ', desc: 'Chọn chính xác thời gian nhận máy, hệ thống tự động giữ kho realtime.' },
                        { step: '03', title: 'Nhận đồ qua Grab', desc: 'Thiết bị được chống sốc kỹ lưỡng và giao tận tay qua hỏa tốc.' },
                        { step: '04', title: 'Thanh toán & trải nghiệm', desc: 'Thanh toán minh bạch, theo dõi lịch trình đơn hàng dễ dàng.' }
                    ].map((item, i) => (
                        <div key={i} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                            <span className="text-xs font-mono font-black tracking-widest bg-black text-white px-2.5 py-1 rounded">{item.step}</span>
                            <h4 className="font-bold text-lg mt-4">{item.title}</h4>
                            <p className="text-sm text-gray-600 mt-2 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}