import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styles from './Buy.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
// import { faFilePdf, faFilePowerpoint, faFileWord, faFileExcel, faFile } from '@fortawesome/free-regular-svg-icons';
import { useDropzone } from 'react-dropzone';
import Button from '~/components/Button';
import { useProvider } from '~/components/Provider';

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

    useEffect(() => {
        const storedHistory = localStorage.getItem('historyTable');
        if (storedHistory) {
            setHistoryTable(JSON.parse(storedHistory));
        }
    }, []);

    // Save history to localStorage whenever it changes
    useEffect(() => {
        if (historyTable.length > 0) {
            localStorage.setItem('historyTable', JSON.stringify(historyTable));
        }
    }, [historyTable]);

    const handlePayment = (e) => {
        e.preventDefault();
        const currentTime = new Date().toLocaleString();
        let newEntry;
        newEntry = {
            time: currentTime,
            numberOfPages,
            totalPrice,
            status: 'Đang chờ', // Assume payment is successful
            'status-color': 'status-pending',
        };
        updatePaperCount(paperCount + parseInt(numberOfPages));
        alert('Đã thêm đơn mua vào hàng chờ!');

        setHistoryTable((prevHistory) => [newEntry, ...prevHistory]);
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
                                            <td>{row.numberOfPages}</td>
                                            <td>{`${row.totalPrice} VNĐ`}</td>
                                            <td className={cx(row['status-color'])}>{row.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Buy;
