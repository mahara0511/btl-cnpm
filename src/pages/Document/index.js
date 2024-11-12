import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styles from './Document.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBars, faTable, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faFilePdf, faFilePowerpoint, faFileWord, faFileExcel, faFile } from '@fortawesome/free-regular-svg-icons';
import { useDropzone } from 'react-dropzone';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Document() {
    const [tableData, setTableData] = useState(() => {
        const savedData = localStorage.getItem('tableData');
        return savedData ? JSON.parse(savedData) : [];
    });

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [acceptedFiles, setAcceptedFiles] = useState([]);

    useEffect(() => {
        localStorage.setItem('tableData', JSON.stringify(tableData));
    }, [tableData]);

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
        const newFilesData = acceptedFiles.map((file) => {
            const fileExtension = file.name.split('.').pop().toLowerCase();

            let fileType = 'Tài liệu khác';
            let icon = faFile;

            switch (fileExtension) {
                case 'pdf':
                    fileType = 'Tài liệu PDF';
                    icon = faFilePdf;
                    break;
                case 'doc':
                case 'docx':
                    fileType = 'Tài liệu Word';
                    icon = faFileWord;
                    break;
                case 'xls':
                case 'xlsx':
                    fileType = 'Tài liệu Excel';
                    icon = faFileExcel;
                    break;
                case 'ppt':
                case 'pptx':
                    fileType = 'Tài liệu PowerPoint';
                    icon = faFilePowerpoint;
                    break;
                default:
                    fileType = 'Tài liệu khác';
                    icon = faFile;
                    break;
            }

            return {
                icon,
                fileName: file.name,
                fileType,
                date: new Date().toLocaleString(),
                size: `${(file.size / (1024 * 1024)).toFixed(3)} MB`,
            };
        });

        setTableData((prevTableData) => [...prevTableData, ...newFilesData]);
        setAcceptedFiles([]);
        closeModal();
    };

    const handleDeleteFile = (index) => {
        setTableData((prevTableData) => prevTableData.filter((_, i) => i !== index));
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div>
            <div className={cx('wrapper')}>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
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
                            <FontAwesomeIcon icon={faPlus} /> Thêm mới
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
                                <th>Kích cỡ</th>
                                <th>Hành động</th>
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
                                    <td>
                                        <Button
                                            leftIcon={<FontAwesomeIcon icon={faTrash} className={cx('delete-icon')} />}
                                            className={cx('delete-btn')}
                                            onClick={() => handleDeleteFile(index)}
                                        >
                                            <span> Xóa</span>
                                        </Button>
                                    </td>
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
