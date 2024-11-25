import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styles from './Document.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBars, faTable, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { faFilePdf, faFilePowerpoint, faFileWord, faFileExcel, faFile } from '@fortawesome/free-regular-svg-icons';
import { useDropzone } from 'react-dropzone';
import Button from '~/components/Button';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

function Document() {
    const [tableData, setTableData] = useState([]);
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [acceptedFiles, setAcceptedFiles] = useState([]);

    const fetchFileTable = async () => {
        try {
            const response = await axios.get('http://localhost:8080/v1/api/file/user/1');
            const files = response.data.data;

            // Adjust the data format to match the table structure
            const formattedFiles = files.map((file) => {
                const fileExtension = file.fileName.split('.').pop().toLowerCase();
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
                    fileName: file.fileName,
                    fileType,
                    date: new Date(file.time).toLocaleString(), // Convert time to readable format
                    size: `${(file.size / (1024 * 1024)).toFixed(3)} MB`, // Convert size to MB
                    url: file.url,
                    id: file.id,
                };
            });

            setTableData(formattedFiles);
        } catch (e) {}
    };

    useEffect(() => {
        fetchFileTable();
    }, []);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const onDrop = (files) => {
        setAcceptedFiles(files);
    };

    const handleAddFiles = async () => {
        try {
            const formData = new FormData();

            // Append files to FormData
            acceptedFiles.forEach((file) => {
                formData.append('file', file); // Assuming 'files' is the field name expected by the backend
            });

            // Make the POST request
            const response = await axios.post('http://localhost:8080/v1/api/uploadFile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // This header is important for file uploads
                },
            });
            if (response.status === 200) {
                fetchFileTable();
            }
        } catch (e) {
            if (e.response) {
                console.log(`Error from server: ${e}`);
            } else if (e.request) {
                console.log('Cannot connect to the server');
            } else {
                console.log('Error:', e.message);
            }
        }

        closeModal();
    };

    const handlePrintFile = async (fileId) => {};

    const handleDeleteFile = async (fileId) => {
        console.log(fileId);
        try {
            // Send a DELETE request to your backend API
            const response = await axios.delete(`http://localhost:8080/v1/api/file/delete/${fileId}`);

            if (response.status === 200) {
                // File successfully deleted, now update the table data
                setTableData((prevTableData) => prevTableData.filter((file) => file.id !== fileId));
                console.log(response.data.message);
            }
        } catch (error) {
            if (error.response) {
                console.error(`Error deleting file: ${error.response}`);
            } else if (error.request) {
                console.error('Error connecting to the server');
            } else {
                console.error('Error:', error);
            }
        }
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
                                            leftIcon={<FontAwesomeIcon icon={faTrash} className={cx('print-icon')} />}
                                            className={cx('print-btn')}
                                            // onClick={() => handlePrintFile(row.id)}
                                            to={`/print/${row.id}`}
                                        >
                                            <span> In</span>
                                        </Button>

                                        <Button
                                            leftIcon={<FontAwesomeIcon icon={faTrash} className={cx('delete-icon')} />}
                                            className={cx('delete-btn')}
                                            onClick={() => handleDeleteFile(row.id)}
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
