import React, { useState, useEffect } from 'react';
import styles from './History.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';

import { useProvider } from '~/components/Provider';
const cx = classNames.bind(styles);

function History() {
    // Dữ liệu giả lập cho các hàng trong bảng
    const { history, clearHistory } = useProvider();
    const [filteredHistory, setFilteredHistory] = useState([]);
    // Tính tổng số trang đã in
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        // Lấy thời gian hiện tại
        const currentDate = new Date();
        const currentTime = new Date();
        // Lấy mốc thời gian của một tháng trước
        const startOfLastMonth = new Date(currentDate.setMonth(currentDate.getMonth() - 1));

        // Cập nhật state với thời gian
        setStartDate(startOfLastMonth.toLocaleString());
        setEndDate(currentTime.toLocaleString());
        const filtered = history.filter((row) => {
            const rowStartDate = new Date(row.startTime); // Giả sử startTime là chuỗi ngày tháng

            return rowStartDate >= startOfLastMonth && rowStartDate <= currentTime;
        });
        setFilteredHistory(filtered);
    }, []);
    const totalPrintedPages = history.reduce((acc, row) => acc + parseInt(row.totalPages), 0);

    return (
        <div>
            <div className={cx('wrapper')}>
                <h2>LỊCH SỬ IN</h2>
                <div className={`${cx('document-table')}`}>
                    <div className={cx('header-table')}>
                        <span> Từ </span>
                        <Button className={cx('header-table-btn')}> {startDate} </Button>
                        <span> đến </span>
                        <Button className={cx('header-table-btn')}> {endDate} </Button>
                    </div>
                    <table className={`${cx('custom-table')} table`}>
                        <thead>
                            <tr>
                                <th>Thời điểm bắt đầu in</th>
                                <th>Thời điểm kết thúc in</th>
                                <th>Tên tệp</th>
                                <th>Máy in </th>
                                <th>Tổng số tờ </th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.startTime}</td>
                                    <td>{row.endTime}</td>
                                    <td>{row.fileName}</td>
                                    <td>{row.printer}</td>
                                    <td>{row.totalPages}</td>
                                </tr>
                            ))}
                            {history.length ? (
                                <tr>
                                    <td colSpan="3"></td>
                                    <td>Tổng cộng</td>
                                    <td>{totalPrintedPages}</td>
                                </tr>
                            ) : (
                                <tr className={cx('no-file')}>
                                    <td colSpan="5">Chưa có file nào được in</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default History;
