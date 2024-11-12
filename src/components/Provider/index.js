import React, { createContext, useState, useContext } from 'react';

// Tạo PaperCountContext
const Context = createContext();

// PaperCountProvider để cung cấp giá trị paperCount
export const Provider = ({ children }) => {
    const [paperCount, setPaperCount] = useState(localStorage.getItem('paperCount') || 500);
    const [history, setHistory] = useState(JSON.parse(localStorage.getItem('history')) || []);
    // Hàm để cập nhật paperCount
    const updatePaperCount = (count) => {
        setPaperCount(count);
        localStorage.setItem('paperCount', count); // Lưu vào localStorage
    };

    const addHistory = (fileName, printer, totalPages) => {
        const startTime = new Date();
        const endTime = new Date(startTime);
        endTime.setSeconds(startTime.getSeconds() + 5); // Cộng thêm 5 giây vào endTime
        const newEntry = {
            startTime: startTime.toLocaleString(),
            endTime: endTime.toLocaleString(), // Có thể thay thế bằng thời gian thực tế
            fileName,
            printer,
            totalPages,
        };

        const newHistory = [...history, newEntry];
        setHistory(newHistory);
        localStorage.setItem('history', JSON.stringify(newHistory));
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem('history');
    };
    return (
        <Context.Provider value={{ paperCount, updatePaperCount, history, addHistory, clearHistory }}>
            {children}
        </Context.Provider>
    );
};

// Hook để sử dụng PaperCountContext trong các component
export const useProvider = () => useContext(Context);
