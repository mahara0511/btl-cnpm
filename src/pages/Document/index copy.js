import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './Document.module.scss';
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

function Document() {
    const tableData = [
        {
            icon: faFilePdf,
            fileName: 'Lab_report_EmbeddedSystem.pdf',
            fileType: 'Tài liệu PDF',
            date: '12:20 22/10/2024',
            size: '1.102MB',
        },
        {
            icon: faFileWord,
            fileName: 'Lab_test_DistributeSystem.doc',
            fileType: 'Tài liệu Word',
            date: '14:24 12/09/2024',
            size: '5.222MB',
        },
        {
            icon: faFilePowerpoint,
            fileName: 'ComputerNetwork.pptx',
            fileType: 'Tài liệu Powerpoint',
            date: '12:20 22/10/2024',
            size: '3.769MB',
        },
        {
            icon: faFileExcel,
            fileName: 'BangDiem.xlsx',
            fileType: 'Tài liệu Excel',
            date: '23:25 10/07/2024',
            size: '3.33302MB',
        },
        {
            icon: faFilePdf,
            fileName: 'Lab_report_EmbeddedSystem.pdf',
            fileType: 'Tài liệu PDF',
            date: '12:20 22/10/2024',
            size: '1.102MB',
        },
        {
            icon: faFileWord,
            fileName: 'Lab_test_DistributeSystem.doc',
            fileType: 'Tài liệu Word',
            date: '14:24 12/09/2024',
            size: '5.222MB',
        },
        {
            icon: faFilePowerpoint,
            fileName: 'ComputerNetwork.pptx',
            fileType: 'Tài liệu Powerpoint',
            date: '12:20 22/10/2024',
            size: '3.769MB',
        },
        {
            icon: faFileExcel,
            fileName: 'BangDiem.xlsx',
            fileType: 'Tài liệu Excel',
            date: '23:25 10/07/2024',
            size: '3.33302MB',
        },
        {
            icon: faFilePdf,
            fileName: 'Lab_report_EmbeddedSystem.pdf',
            fileType: 'Tài liệu PDF',
            date: '12:20 22/10/2024',
            size: '1.102MB',
        },
        {
            icon: faFileWord,
            fileName: 'Lab_test_DistributeSystem.doc',
            fileType: 'Tài liệu Word',
            date: '14:24 12/09/2024',
            size: '5.222MB',
        },
        {
            icon: faFilePowerpoint,
            fileName: 'ComputerNetwork.pptx',
            fileType: 'Tài liệu Powerpoint',
            date: '12:20 22/10/2024',
            size: '3.769MB',
        },
        {
            icon: faFileExcel,
            fileName: 'BangDiem.xlsx',
            fileType: 'Tài liệu Excel',
            date: '23:25 10/07/2024',
            size: '3.33302MB',
        },
        {
            icon: faFilePdf,
            fileName: 'Lab_report_EmbeddedSystem.pdf',
            fileType: 'Tài liệu PDF',
            date: '12:20 22/10/2024',
            size: '1.102MB',
        },
        {
            icon: faFileWord,
            fileName: 'Lab_test_DistributeSystem.doc',
            fileType: 'Tài liệu Word',
            date: '14:24 12/09/2024',
            size: '5.222MB',
        },
        {
            icon: faFilePowerpoint,
            fileName: 'ComputerNetwork.pptx',
            fileType: 'Tài liệu Powerpoint',
            date: '12:20 22/10/2024',
            size: '3.769MB',
        },
        {
            icon: faFileExcel,
            fileName: 'BangDiem.xlsx',
            fileType: 'Tài liệu Excel',
            date: '23:25 10/07/2024',
            size: '3.33302MB',
        },
    ];
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
        // Thực hiện thêm file ở đây nếu cần
        console.log('Thêm file:', acceptedFiles);

        // Reset danh sách file đã chọn
        setAcceptedFiles([]);
        closeModal();
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    return (
        <div>
            <div className={cx('wrapper')}>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal} // Đóng modal khi nhấn ngoài hoặc nhấn ESC
                    contentLabel="Upload Files"
                    className={cx('modal')}
                    overlayClassName={cx('modal-overlay')}
                >
                    <div {...getRootProps({ className: cx('dropzone') })}>
                        <input {...getInputProps()} />
                        <p className={cx('title')}>
                            Kéo và thả tệp hoặc <span className={cx('underline')}>Duyệt tệp</span>
                        </p>

                        <p>Định dạng hỗ trợ: .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx</p>
                    </div>

                    {acceptedFiles.length > 0 && (
                        <div className={cx('selected-files')}>
                            <h3 className={cx('selected-files-title')}>File đã chọn:</h3>
                            <ul className={cx('selected-files-list')}>
                                {acceptedFiles.map((file) => (
                                    <li key={file.path} className={cx('selected-files-item')}>
                                        {file.path} - {file.size} bytes
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <Button className={cx('modal-btn')} primary slim onClick={handleAddFiles}>
                        Thêm
                    </Button>
                </Modal>
                <h2>TỆP CỦA TÔI</h2>

                <div className={`${cx('document-table')}`}>
                    <div className={cx('header-table')}>
                        <Button onClick={openModal} className={cx('add-btn')}>
                            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> Thêm mới
                        </Button>
                        <div className={cx('header-table-menu')}>
                            <Button className={cx('menu-btn')}>
                                <FontAwesomeIcon icon={faBars} />
                            </Button>

                            <Button className={cx('menu-btn')}>
                                <FontAwesomeIcon icon={faTable} />
                            </Button>
                        </div>
                    </div>
                    <table className={`${cx('custom-table')} table`}>
                        <thead>
                            <tr>
                                <th>Tên tệp</th>
                                <th>Kiểu tệp</th>
                                <th>Ngày tải lên</th>
                                <th>Kích cỡ </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, index) => (
                                <tr key={index}>
                                    <td>
                                        <FontAwesomeIcon icon={row.icon} className={cx('file-icon')} />
                                        {row.fileName}
                                    </td>
                                    <td>{row.fileType}</td>
                                    <td>{row.date}</td>
                                    <td>{row.size}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Document;
