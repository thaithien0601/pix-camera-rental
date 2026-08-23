/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                pix: {
                    bg: '#FFFFFF',          // Trắng chủ đạo tinh khôi
                    surface: '#F8F9FA',     // Xám khói cực nhạt cho card background
                    border: '#E5E7EB',      // Viền xám mảnh tiêu chuẩn
                    textMain: '#111827',    // Đen tuyền sắc nét cho tiêu đề
                    textMuted: '#6B7280',   // Xám tối cho mô tả phụ
                    dark: '#000000',        // Đen tuyền thuần túy cho điểm nhấn
                }
            }
        },
    },
    plugins: [],
}