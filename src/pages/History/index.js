import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './History.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBars, faTable } from '@fortawesome/free-solid-svg-icons';
import { faFilePdf, faFilePowerpoint, faFileWord, faFileExcel } from '@fortawesome/free-regular-svg-icons';
import { useDropzone } from 'react-dropzone';
import ImageSlider from '~/components/Slider';
import Image from '~/components/Image';
import images from '~/assets/images';
import Button from '~/components/Button';
const cx = classNames.bind(styles);

function History() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [acceptedFiles, setAcceptedFiles] = useState([]);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const onDrop = (files) => {
        setAcceptedFiles(files);
    };

    const handleAddFiles = () => {
        console.log('Thêm file:', acceptedFiles);
        setAcceptedFiles([]);
        closeModal();
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    // Dữ liệu giả lập cho các hàng trong bảng
    const tableData = [
        {
            startTime: '12:20 22/10/2024',
            endTime: '12:59 22/10/2024',
            fileName: 'Lab_report_EmbeddedSystem.pdf',
            printer: 'CLSTK-B2-LAU01',
            totalPages: 5,
        },
        {
            startTime: '14:24 12/09/2024',
            endTime: '14:59 12/09/2024',
            fileName: 'Lab_test_DistributeSystem.doc',
            printer: 'CLSTK-A1-LAU01',
            totalPages: 6,
        },
        {
            startTime: '12:20 22/10/2024',
            endTime: '12:59 22/10/2024',
            fileName: 'ComputerNetwork.pptx',
            printer: 'CLSTK-F2-LAU01',
            totalPages: 1,
        },
        {
            startTime: '23:25 10/07/2024',
            endTime: '23:59 10/07/2024',
            fileName: 'BangDiem.xlsx',
            printer: 'CLSTK-D2-LAU01',
            totalPages: 5,
        },
        {
            startTime: '12:20 22/10/2024',
            endTime: '12:59 22/10/2024',
            fileName: 'Lab_report_EmbeddedSystem.pdf',
            printer: 'CLSTK-B2-LAU01',
            totalPages: 5,
        },
        {
            startTime: '14:24 12/09/2024',
            endTime: '14:59 12/09/2024',
            fileName: 'Lab_test_DistributeSystem.doc',
            printer: 'CLSTK-A1-LAU01',
            totalPages: 6,
        },
        {
            startTime: '12:20 22/10/2024',
            endTime: '12:59 22/10/2024',
            fileName: 'ComputerNetwork.pptx',
            printer: 'CLSTK-F2-LAU01',
            totalPages: 1,
        },
        {
            startTime: '23:25 10/07/2024',
            endTime: '23:59 10/07/2024',
            fileName: 'BangDiem.xlsx',
            printer: 'CLSTK-D2-LAU01',
            totalPages: 5,
        },
        {
            startTime: '12:20 22/10/2024',
            endTime: '12:59 22/10/2024',
            fileName: 'Lab_report_EmbeddedSystem.pdf',
            printer: 'CLSTK-B2-LAU01',
            totalPages: 5,
        },
        {
            startTime: '14:24 12/09/2024',
            endTime: '14:59 12/09/2024',
            fileName: 'Lab_test_DistributeSystem.doc',
            printer: 'CLSTK-A1-LAU01',
            totalPages: 6,
        },
        {
            startTime: '12:20 22/10/2024',
            endTime: '12:59 22/10/2024',
            fileName: 'ComputerNetwork.pptx',
            printer: 'CLSTK-F2-LAU01',
            totalPages: 1,
        },
        {
            startTime: '23:25 10/07/2024',
            endTime: '23:59 10/07/2024',
            fileName: 'BangDiem.xlsx',
            printer: 'CLSTK-D2-LAU01',
            totalPages: 5,
        },
        {
            startTime: '12:20 22/10/2024',
            endTime: '12:59 22/10/2024',
            fileName: 'Lab_report_EmbeddedSystem.pdf',
            printer: 'CLSTK-B2-LAU01',
            totalPages: 5,
        },
        {
            startTime: '14:24 12/09/2024',
            endTime: '14:59 12/09/2024',
            fileName: 'Lab_test_DistributeSystem.doc',
            printer: 'CLSTK-A1-LAU01',
            totalPages: 6,
        },
        {
            startTime: '12:20 22/10/2024',
            endTime: '12:59 22/10/2024',
            fileName: 'ComputerNetwork.pptx',
            printer: 'CLSTK-F2-LAU01',
            totalPages: 1,
        },
        {
            startTime: '23:25 10/07/2024',
            endTime: '23:59 10/07/2024',
            fileName: 'BangDiem.xlsx',
            printer: 'CLSTK-D2-LAU01',
            totalPages: 5,
        },
        {
            startTime: '12:20 22/10/2024',
            endTime: '12:59 22/10/2024',
            fileName: 'Lab_report_EmbeddedSystem.pdf',
            printer: 'CLSTK-B2-LAU01',
            totalPages: 5,
        },
        {
            startTime: '14:24 12/09/2024',
            endTime: '14:59 12/09/2024',
            fileName: 'Lab_test_DistributeSystem.doc',
            printer: 'CLSTK-A1-LAU01',
            totalPages: 6,
        },
        {
            startTime: '12:20 22/10/2024',
            endTime: '12:59 22/10/2024',
            fileName: 'ComputerNetwork.pptx',
            printer: 'CLSTK-F2-LAU01',
            totalPages: 1,
        },
        {
            startTime: '23:25 10/07/2024',
            endTime: '23:59 10/07/2024',
            fileName: 'BangDiem.xlsx',
            printer: 'CLSTK-D2-LAU01',
            totalPages: 5,
        },
        // Các hàng khác...
    ];

    // Tính tổng số trang đã in
    const totalPrintedPages = tableData.reduce((acc, row) => acc + row.totalPages, 0);

    return (
        <div>
            <div className={cx('wrapper')}>
                <h2>LỊCH SỬ IN</h2>
                <div className={`${cx('document-table')}`}>
                    <div className={cx('header-table')}>
                        <span> Từ </span>
                        <Button className={cx('header-table-btn')}> 12:30 10/09/2024 </Button>
                        <span> đến </span>
                        <Button className={cx('header-table-btn')}> 12:30 10/10/2024 </Button>
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
                            {tableData.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.startTime}</td>
                                    <td>{row.endTime}</td>
                                    <td>{row.fileName}</td>
                                    <td>{row.printer}</td>
                                    <td>{row.totalPages}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="3"></td>
                                <td>Tổng cộng</td>
                                <td>{totalPrintedPages}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default History;
