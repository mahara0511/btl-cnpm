import React, { useState, useEffect } from 'react';
import styles from './History.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import axios from 'axios';
import moment from 'moment';
const cx = classNames.bind(styles);

function History() {
    // Dữ liệu giả lập cho các hàng trong bảng
    const [history, setHistory] = useState([]);
    const [filteredHistory, setFilteredHistory] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const getStatusColor = (status) => {
        switch (status) {
            case 'Successful':
                return 'status-success'; // Replace with your desired class name
            case 'Failed':
                return 'status-cancelled'; // Replace with your desired class name
            case 'Progressing':
                return 'status-pending'; // Replace with your desired class name
            default:
                return 'default-color'; // Replace with a fallback class name
        }
    };

    const getStatus = (status) => {
        switch (status) {
            case 'Successful':
                return 'Thành công'; // Replace with your desired class name
            case 'Failed':
                return 'Thất bại'; // Replace with your desired class name
            case 'Progressing':
                return 'Đang xử lí'; // Replace with your desired class name
            default:
                return 'default'; // Replace with a fallback class name
        }
    };

    useEffect(() => {
        axios
            .get('http://localhost:8080/v1/api/getHistory/1')
            .then((response) => {
                return response.data.data;
            })
            .then((data) => {
                setHistory(data);
                setFilteredHistory(data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    const handleFilter = async () => {
        if (!startDate || !endDate) {
            setFilteredHistory(history); // Nếu không có ngày nào thì hiển thị tất cả
        } else {
            const start = moment(startDate).startOf('day').toDate().getTime();
            const end = moment(endDate).endOf('day').toDate().getTime();

            const filtered = history.filter((row) => {
                const rowTime = moment(row.time, 'YYYY-MM-DD HH:mm:ss').toDate().getTime();
                console.log('start Time: ', start);
                console.log('end Time: ', end);
                console.log('Row time', rowTime);
                return rowTime >= start && rowTime <= end;
            });
            await setFilteredHistory(filtered);
        }
    };

    const totalPrintedPages = history.reduce((acc, row) => acc + parseInt(row.numPage), 0);

    return (
        <div>
            <div className={cx('wrapper')}>
                <h2>LỊCH SỬ IN</h2>
                <div className={`${cx('document-table')}`}>
                    <div className={cx('header-table')}>
                        <span> Từ </span>{' '}
                        <input
                            type="date"
                            className={cx('header-table-btn')}
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />{' '}
                        <span> đến </span>
                        <input
                            type="date"
                            className={cx('header-table-btn')}
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        <Button onClick={handleFilter} primary className={cx('filter-button')}>
                            Lọc
                        </Button>
                    </div>
                    <table className={`${cx('custom-table')} table`}>
                        <thead>
                            <tr>
                                <th>Thời điểm in</th>
                                <th>Tên tệp</th>
                                <th>Trạng thái</th>
                                <th>Máy in </th>
                                <th>Tổng số tờ </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredHistory.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.time}</td>
                                    <td>{row.fileName}</td>
                                    <td className={cx(getStatusColor(row.status))}>{getStatus(row.status)}</td>
                                    <td>{row.printerID}</td>
                                    <td>{row.numPage}</td>
                                </tr>
                            ))}
                            {filteredHistory.length ? (
                                <tr>
                                    <td colSpan="3"></td>
                                    <td>Tổng cộng</td>
                                    <td>{totalPrintedPages}</td>
                                </tr>
                            ) : (
                                <tr className={cx('no-file')}>
                                    <td colSpan="5">Chưa có file nào được in trong khoảng thời gian trên</td>
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
