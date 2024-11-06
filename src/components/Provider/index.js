import React, { createContext, useState, useContext } from 'react';

// Tạo PaperCountContext
const PaperCountContext = createContext();

// PaperCountProvider để cung cấp giá trị paperCount
export const Provider = ({ children }) => {
    const [paperCount, setPaperCount] = useState(localStorage.getItem('paperCount') || 500);

    // Hàm để cập nhật paperCount
    const updatePaperCount = (count) => {
        setPaperCount(count);
        localStorage.setItem('paperCount', count); // Lưu vào localStorage
    };

    return <PaperCountContext.Provider value={{ paperCount, updatePaperCount }}>{children}</PaperCountContext.Provider>;
};

// Hook để sử dụng PaperCountContext trong các component
export const usePaperCount = () => useContext(PaperCountContext);
