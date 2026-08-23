import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Category from './pages/Category';
import ProductDetail from './pages/ProductDetail';
import Admin from './pages/Admin';

export default function App() {
    return (
        <Router>
            {/* Khung bọc cố định chiều rộng 1200px, tạo hiệu ứng như một khung cửa sổ PC trên điện thoại */}
            <div className="w-[1200px] mx-auto bg-white min-h-screen shadow-2xl overflow-x-hidden">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/category" element={<Category />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </div>
        </Router>
    );
}