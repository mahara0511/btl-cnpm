import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styles from './Buy.module.scss';
import axios from 'axios';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
// import { faFilePdf, faFilePowerpoint, faFileWord, faFileExcel, faFile } from '@fortawesome/free-regular-svg-icons';
import { useDropzone } from 'react-dropzone';
import Button from '~/components/Button';
import { useProvider } from '~/components/Provider';
const qs = require('qs');
const cx = classNames.bind(styles);

function Buy() {
    const { paperCount, updatePaperCount } = useProvider();

    const priceTable = [
        {
            numberOfPages: '0-10',
            price: 500,
        },
        {
            numberOfPages: '11-100',
            price: 400,
        },
        {
            numberOfPages: '101-1000',
            price: 300,
        },
        {
            numberOfPages: '>1000',
            price: 250,
        },
    ];

    const PRICETABLE = [
        { min: 0, max: 10, price: 500 },
        { min: 11, max: 100, price: 400 },
        { min: 101, max: 1000, price: 300 },
        { min: 1001, max: Infinity, price: 250 },
    ];
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [totalPrice, setTotalPrice] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('BK Pay');

    const [historyTable, setHistoryTable] = useState([
        // {
        //     time: '11:30 10/10/2024',
        //     numberOfPages: 20,
        //     totalPrice: '80,000',
        //     status: 'Chờ thanh toán',
        //     'status-color': 'status-pending',
        // },
        // {
        //     time: '11:30 10/10/2024',
        //     numberOfPages: 20,
        //     totalPrice: '80,000',
        //     status: 'Thành công',
        //     'status-color': 'status-success',
        // },
        // {
        //     time: '11:30 10/10/2024',
        //     numberOfPages: 20,
        //     totalPrice: '80,000',
        //     status: 'Đã hủy',
        //     'status-color': 'status-cancelled',
        // },
    ]);

    const fetchHistoryTable = async () => {
        try {
            const response = await axios.get('http://localhost:8080/v1/api/buyPages/records');
            if (response.status === 200) {
                const data = response.data.data;

                // Sort data by time in descending order
                const sortedData = data.sort((a, b) => new Date(b.time) - new Date(a.time));
                setHistoryTable(sortedData);
            }
        } catch (e) {
            if (e.response) {
                console.log(`Error from server: ${e.response.data.message || 'unknown error'}`);
            } else if (e.request) {
                console.log('Cannot connect to the server');
            } else {
                console.log('Error:', e.message);
            }
        }
    };

    useEffect(() => {
        fetchHistoryTable();
    }, []);

    const handlePayment = async (e) => {
        e.preventDefault();
        if (numberOfPages < 1) {
            alert('Số trang muốn mua phải lớn hơn 1');
        } else {
            try {
                const data = qs.stringify({
                    numPage: numberOfPages,
                    cost: parseInt(totalPrice.replace(/,/g, ''), 10),
                    method: paymentMethod,
                });
                const response = await axios.post('http://localhost:8080/v1/api/buyPages', data, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });
                if (response.status === 200) {
                    alert(response.message || 'Giao dịch thành công');
                    try {
                        const response = await axios.get('http://localhost:8080/v1/api/user/1');
                        if (response.status === 200) {
                            updatePaperCount(response.data.data.pages); // Set paper count from response
                            fetchHistoryTable();
                        } else {
                            console.log('Data not found', response.data.message);
                        }
                    } catch (e) {
                        if (e.response) {
                            console.log(`Error from server: ${e.response.data.message || 'unknown error'}`);
                        } else if (e.request) {
                            console.log('Cannot connect to the server');
                        } else {
                            console.log('Error:', e.message);
                        }
                    }
                } else if (response.status === 404) {
                    alert(response.message || 'Không tìm thấy tài nguyên');
                } else if (response.status === 400) {
                    console.log(response.message);
                }
            } catch (e) {
                if (e.response) {
                    console.log(`Lỗi từ server: ${e.response.message || 'không xác định'} `);
                    // alert('Hệ thống hiện đang lỗi, vui lòng thử lại sau');
                } else if (e.request) {
                    console.log('Không thể kết nối đến server');
                }
            }

            // setHistoryTable((prevHistory) => [newEntry, ...prevHistory]);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Successful':
                return 'status-success'; // Replace with your desired class name
            case 'Failed':
                return 'status-cancelled'; // Replace with your desired class name
            case 'Pending':
                return 'status-pending'; // Replace with your desired class name
            default:
                return 'default-color'; // Replace with a fallback class name
        }
    };

    historyTable.forEach((entry) => {
        entry.totalPrice = entry.totalPrice.toLocaleString('en-US'); // Formats with commas
    });

    const calculatePrice = (pages) => {
        const pricing = PRICETABLE.find((rule) => pages >= rule.min && pages <= rule.max);
        return pricing ? pricing.price * pages : 0;
    };

    useEffect(() => {
        const calculatedPrice = calculatePrice(numberOfPages);
        setTotalPrice(`${calculatedPrice.toLocaleString('en-US')}`);
    }, [numberOfPages]);

    return (
        <div className={`${cx('print-wrapper')} container`}>
            <h1 className={`${cx('purchase-header')} `}>MUA GIẤY</h1>

            <div className={`${cx()} row`}>
                <div className="col-md-6">
                    <div className={`${cx()} col-md-12`}>
                        <div className={`${cx('table')}`}>
                            <h3>BẢNG GIÁ</h3>
                            <table className={`${cx('custom-table')} table`}>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Số lượng {`(tờ)`}</th>
                                        <th>Đơn giá {`(VND/tờ)`}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {priceTable.map((row, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{row.numberOfPages}</td>
                                            <td>{row.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className={`${cx('')} col-md-12`}>
                        <div className={`${cx('purchase-wrapper')} `}>
                            <div className={`${cx('purchase-section')}`}>
                                <h5>MUA GIẤY & THANH TOÁN</h5>
                                <form>
                                    <div className={`${cx('form-group')} form-group`}>
                                        <label>Số tờ khả dụng:</label>
                                        <input type="text" className="form-control" value={paperCount} disabled />
                                    </div>
                                    <div className={`${cx('form-group')} form-group`}>
                                        <label>1. Nhập số tờ:</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            min={1}
                                            value={numberOfPages}
                                            onChange={(e) => setNumberOfPages(e.target.value)}
                                        />
                                    </div>
                                    <div className={`${cx('form-group')} form-group`}>
                                        <label>2. Thành tiền:</label>
                                        <input type="text" className="form-control" value={totalPrice} disabled />
                                    </div>
                                    <div className={`${cx('form-group', 'last')} form-group`}>
                                        <label>3. Phương thức thanh toán:</label>
                                        <select
                                            className="form-control"
                                            value={paymentMethod}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        >
                                            <option>BK Pay</option>
                                            <option>VN Pay</option>
                                            <option>Zalo Pay</option>
                                        </select>
                                        <FontAwesomeIcon icon={faChevronDown} className={cx('chevron-icon')} />
                                    </div>
                                    <Button slim primary className={cx('pay-btn')} onClick={handlePayment}>
                                        Thanh toán
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className={`${cx()} col-md-12`}>
                        <div className={`${cx('table-wrapper')}`}>
                            <table className={`${cx('table')} table-bordered`}></table>
                        </div>

                        <div className={`${cx('table')}`}>
                            <h3>LỊCH SỬ</h3>
                            <div style={{ height: '571px', overflowY: 'auto' }}>
                                <table className={`${cx('custom-table')} table`}>
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Thời gian</th>
                                            <th>Số lượng</th>
                                            <th>Số tiền</th>
                                            <th>Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {historyTable.map((row, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{row.time}</td>
                                                <td>{row.amount}</td>
                                                <td>{`${row.totalPrice} VNĐ`}</td>
                                                <td className={cx(getStatusColor(row.status))}>{row.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Buy;
