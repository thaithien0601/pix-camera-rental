import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [pathname]);
    return null;
}

// Import Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact'; // <-- 1. Import vào đây

// Import các Trang
import Home from './pages/Home';
import Category from './pages/Category';
import Admin from './pages/Admin';
import ProductDetail from './pages/ProductDetail';

export default function App() {
    return (
        <Router>
            <ScrollToTop />

            <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans relative">
                <Navbar />

                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/category" element={<Category />} />
                        <Route path="/product/:id" element={<ProductDetail />} />
                        <Route path="/admin" element={<Admin />} />
                    </Routes>
                </main>

                <Footer />

                {/* 2. Đặt cụm nút liên hệ nổi ở đây để hiển thị xuyên suốt */}
                <FloatingContact />
            </div>
        </Router>
    );
}