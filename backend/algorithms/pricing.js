function calculateRentalPrice(pricePerDay, startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const totalDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1);

    let discountRate = 1.0;
    if (totalDays >= 30) discountRate = 0.65;      // Giảm 35% gói tháng
    else if (totalDays >= 14) discountRate = 0.75; // Giảm 25% gói 2 tuần
    else if (totalDays >= 7) discountRate = 0.82;  // Giảm 18% gói 1 tuần
    else if (totalDays >= 3) discountRate = 0.90;  // Giảm 10% gói 3 ngày

    const finalPrice = Math.round(pricePerDay * totalDays * discountRate);

    return {
        totalDays,
        pricePerDay,
        discountRate,
        finalPrice,
        formattedPrice: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(finalPrice)
    };
}

module.exports = { calculateRentalPrice };