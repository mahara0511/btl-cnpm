import React, { useState } from 'react';
import styles from './Print.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import Button from '~/components/Button';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { useProvider } from '~/components/Provider';

const cx = classNames.bind(styles);
function Print() {
    const { addHistory } = useProvider();

    const [fileUrl, setFileUrl] = useState(null);
    const [fileName, setFileName] = useState('Không có tệp nào được chọn');
    const [copies, setCopies] = useState(1);
    const [printer, setPrinter] = useState('');
    const [pages, setPages] = useState(33);
    const [paperSize, setPaperSize] = useState('A4');
    const [sides, setSides] = useState('1 mặt');
    const [orientation, setOrientation] = useState('Khổ dọc');
    const [scaling, setScaling] = useState('100%');
    const [pageSelection, setPageSelection] = useState('2-10');
    const [pagesPerSheet, setPagesPerSheet] = useState(1);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setFileName(file.name);

        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setFileUrl(fileUrl);
            console.log(fileUrl);
        }
    };

    const validateForm = () => {
        if (!fileUrl) {
            alert('Vui lòng chọn tệp trước khi in.');
            return false;
        }
        if (copies < 1) {
            alert('Số bản in phải lớn hơn 0.');
            return false;
        }
        if (!printer) {
            alert('Vui lòng chọn máy in.');
            return false;
        }
        if (pages < 1) {
            alert('Số trang sử dụng phải lớn hơn 0.');
            return false;
        }
        if (sides !== '1 mặt' && sides !== '2 mặt') {
            alert('Số mặt giấy phải là "1 mặt" hoặc "2 mặt".');
            return false;
        }

        if (orientation !== 'Khổ dọc' && orientation !== 'Khổ ngang') {
            alert('Khổ in phải là "Khổ dọc" hoặc "Khổ ngang".');
            return false;
        }

        // const scalingValue = parseInt(scaling.replace('%', ''));
        if (!scaling) {
            alert('Chọn trường thu phóng');
            return false;
        }

        // Validate page selection (e.g., "2-10", "1,3,5", etc.)
        if (!pageSelection) {
            alert('Chọn trang in');
            return false;
        }

        if (![1, 2, 4].includes(pagesPerSheet)) {
            alert('Số trang mỗi tờ phải là 1, 2 hoặc 4.');
            return false;
        }
        return true;
    };

    const handlePrint = () => {
        if (validateForm()) {
            // Logic để thực hiện in ấn
            addHistory(fileName, printer, pages);
            alert('In Thành công!');
        }
    };

    return (
        <div className={cx('app')}>
            <header className={cx('app-header')}>
                <h1>IN ẤN</h1>
            </header>

            <div className={cx('print-header')}>
                <div className={cx('print-options')}>
                    <div className={cx('option-group')}>
                        <label>
                            1. Chọn tệp/Tải tệp lên:
                            <label className={cx('input-file')} htmlFor="dunghoituitaisao">
                                {fileName}
                            </label>
                            <input
                                id="dunghoituitaisao"
                                style={{ display: 'none' }}
                                type="file"
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>
                    <div className={cx('option-group')}>
                        <label>
                            2. Số bản in:
                            <input type="number" value={copies} onChange={(e) => setCopies(e.target.value)} min="1" />
                        </label>
                    </div>
                    <div className={cx('option-group')}>
                        <label>
                            3. Chọn máy in:
                            <select value={printer} onChange={(e) => setPrinter(e.target.value)}>
                                <option value="">Chọn máy in</option>
                                <option value="CLSTK-B2-LAU01">CLSTK-B2-LAU01</option>
                                <option value="CLSTK-A1-LAU01">CLSTK-A1-LAU01</option>
                                <option value="CLSTK-F2-LAU01">CLSTK-F2-LAU01</option>
                                <option value="CLSTK-D2-LAU01">CLSTK-D2-LAU01</option>
                            </select>
                            <FontAwesomeIcon icon={faChevronDown} className={cx('chevron-icon')} />
                        </label>
                    </div>
                    <div className={cx('option-group')}>
                        <label>
                            4. Số trang sử dụng:
                            <input type="number" value={pages} onChange={(e) => setPages(e.target.value)} min="1" />
                        </label>
                    </div>
                </div>
            </div>
            <div className={cx('content')}>
                <div className={cx('print-settings')}>
                    <div className={cx('print-options')}>
                        <h2>5. Chỉnh thông số in:</h2>

                        <div className={cx('options')}>
                            <label>5.1. Cỡ giấy</label>
                            <select value={paperSize} onChange={(e) => setPaperSize(e.target.value)}>
                                <option value="A4">A4</option>
                                <option value="A3">A3</option>
                                <option value="A5">A5</option>
                            </select>
                            <FontAwesomeIcon icon={faChevronDown} className={cx('chevron-icon')} />
                        </div>

                        <div className={cx('options')}>
                            <label>5.2. Số mặt giấy:</label>
                            <div className={cx('options-content')}>
                                <div className={cx('options-item')}>
                                    <input
                                        type="radio"
                                        name="sides"
                                        value="1 mặt"
                                        checked={sides === '1 mặt'}
                                        onChange={(e) => setSides(e.target.value)}
                                    />{' '}
                                    1 mặt
                                </div>
                                <div className={cx('options-item')}>
                                    <input
                                        type="radio"
                                        name="sides"
                                        value="2 mặt"
                                        checked={sides === '2 mặt'}
                                        onChange={(e) => setSides(e.target.value)}
                                    />{' '}
                                    2 mặt
                                </div>
                            </div>
                        </div>

                        <div className={cx('options')}>
                            <label>5.3. Khổ in:</label>
                            <div className={cx('options-content')}>
                                <div className={cx('options-item')}>
                                    <input
                                        type="radio"
                                        name="orientation"
                                        value="Khổ dọc"
                                        checked={orientation === 'Khổ dọc'}
                                        onChange={(e) => setOrientation(e.target.value)}
                                    />{' '}
                                    Khổ dọc
                                </div>
                                <div className={cx('options-item')}>
                                    <input
                                        type="radio"
                                        name="orientation"
                                        value="Khổ ngang"
                                        checked={orientation === 'Khổ ngang'}
                                        onChange={(e) => setOrientation(e.target.value)}
                                    />{' '}
                                    Khổ ngang
                                </div>
                            </div>
                        </div>

                        <div className={cx('options')}>
                            <label>5.4. Thu phóng:</label>
                            <div className={cx('options-content')}>
                                <div className={cx('options-item')}>
                                    <input
                                        type="radio"
                                        name="scaling"
                                        value="Vừa với trang in"
                                        checked={scaling === 'Vừa với trang in'}
                                        onChange={(e) => setScaling(e.target.value)}
                                    />{' '}
                                    Vừa với trang in
                                </div>
                                <div className={cx('options-item')}>
                                    <input
                                        type="radio"
                                        name="scaling"
                                        value="Theo kích cỡ file gốc"
                                        checked={scaling === 'Theo kích cỡ file gốc'}
                                        onChange={(e) => setScaling(e.target.value)}
                                    />{' '}
                                    Theo kích cỡ file gốc
                                </div>
                                <div className={cx('options-item')}>
                                    <label htmlFor="customScaling">Tùy chỉnh:</label>
                                    <input
                                        type="string"
                                        value={scaling}
                                        onChange={(e) => setScaling(e.target.value)}
                                        min="10"
                                        max="200"
                                        step="10"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={cx('options')}>
                            <label>5.5. Chọn trang in:</label>
                            <div className={cx('options-content')}>
                                <div className={cx('options-item')}>
                                    <input
                                        type="radio"
                                        name="pages"
                                        value="Tất cả"
                                        checked={pageSelection === 'Tất cả'}
                                        onChange={(e) => setPageSelection(e.target.value)}
                                    />{' '}
                                    Tất cả
                                </div>
                                <div className={cx('options-item')}>
                                    <input
                                        type="radio"
                                        name="pages"
                                        value="Chỉ in trang lẻ"
                                        checked={pageSelection === 'Chỉ in trang lẻ'}
                                        onChange={(e) => setPageSelection(e.target.value)}
                                    />{' '}
                                    Chỉ in trang lẻ
                                </div>
                                <div className={cx('options-item')}>
                                    <input
                                        type="radio"
                                        name="pages"
                                        value="Chỉ in trang chẵn"
                                        checked={pageSelection === 'Chỉ in trang chẵn'}
                                        onChange={(e) => setPageSelection(e.target.value)}
                                    />{' '}
                                    Chỉ in trang chẵn
                                </div>
                                <div className={cx('options-item')}>
                                    <label htmlFor="customScaling">Tùy chỉnh:</label>
                                    <input
                                        type="string"
                                        value={pageSelection}
                                        onChange={(e) => setPageSelection(e.target.value)}
                                        min="10"
                                        max="200"
                                        step="10"
                                    />
                                </div>
                                {/* Other options */}
                            </div>
                        </div>

                        <div className={cx('options')}>
                            <label>5.6. Số trang mỗi tờ:</label>
                            <select value={pagesPerSheet} onChange={(e) => setPagesPerSheet(Number(e.target.value))}>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={4}>4</option>
                            </select>
                            <FontAwesomeIcon icon={faChevronDown} className={cx('chevron-icon')} />
                        </div>
                    </div>
                </div>
                <div className={cx('print-preview')}>
                    <div className={cx('print-preview-container')}>
                        <h2>6. Xem trước khi in:</h2>
                        <div className={cx('document-preview')}>
                            <div>
                                {fileUrl ? (
                                    fileName.endsWith('.pdf') ? (
                                        <Worker
                                            className={cx('file-content')}
                                            workerUrl={`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`}
                                        >
                                            <Viewer fileUrl={fileUrl} style={{ width: '50px', height: '50px' }} />
                                        </Worker>
                                    ) : (
                                        'Chỉ định dạng pdf mới có thể xem trước'
                                    )
                                ) : (
                                    'File chưa được thêm'
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <Button onClick={handlePrint} className={cx('print-button')}>
                    In
                </Button>
            </footer>
        </div>
    );
}

export default Print;
