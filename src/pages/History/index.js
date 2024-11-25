import React, { useState, useEffect } from 'react';
import styles from './History.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function History() {
    // Dữ liệu giả lập cho các hàng trong bảng
    const [history, setHistory] = useState([
        // sử dụng useState đúng cách
        {
            startTime: 1,
            endTime: 2,
            fileName: 'File 1',
            printer: 'Printer 1',
            totalPages: 5,
        },
        {
            startTime: 3,
            endTime: 4,
            fileName: 'File 2',
            printer: 'Printer 2',
            totalPages: 10,
        },
    ]);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

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
