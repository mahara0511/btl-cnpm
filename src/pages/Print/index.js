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

const cx = classNames.bind(styles);
function Print() {
    const [fileContent, setFileContent] = useState('');
    const [fileUrl, setFileUrl] = useState(null);
    const [fileName, setFileName] = useState('Không có tệp nào được chọn');
    const [copies, setCopies] = useState(1);
    const [printer, setPrinter] = useState('');
    const [pages, setPages] = useState(33);
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setFileName(file.name);

        if (file && file.type === 'application/pdf') {
            const fileUrl = URL.createObjectURL(file);
            setFileUrl(fileUrl);
            console.log(fileUrl);
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
                                <option value="printer1">CLSTK-B2-LAU01</option>
                                <option value="printer2">CLSTK-A1-LAU01</option>
                                <option value="printer3">CLSTK-F2-LAU01</option>
                                <option value="printer4">CLSTK-D2-LAU01</option>
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
                            <select>
                                <option>A4</option>
                                <option>A3</option>
                                <option>A5</option>
                            </select>
                            <FontAwesomeIcon icon={faChevronDown} className={cx('chevron-icon')} />
                        </div>
                        <div className={cx('options')}>
                            <label>5.2. Số mặt giấy:</label>
                            <div className={cx('options-content')}>
                                <div className={cx('options-item')}>
                                    <input type="radio" name="sides" /> 1 mặt
                                </div>
                                <div className={cx('options-item')}>
                                    <input type="radio" name="sides" /> 2 mặt
                                </div>
                            </div>
                        </div>
                        <div className={cx('options')}>
                            <label>5.3. Khổ in:</label>
                            <div className={cx('options-content')}>
                                <div className={cx('options-item')}>
                                    <input type="radio" name="orientation" /> Khổ dọc
                                </div>
                                <div className={cx('options-item')}>
                                    <input type="radio" name="orientation" /> Khổ ngang{' '}
                                </div>
                            </div>
                        </div>
                        <div className={cx('options')}>
                            <label>5.4. Thu phóng:</label>

                            <div className={cx('options-content')}>
                                <div className={cx('options-item')}>
                                    <input type="radio" name="scaling" /> Vừa với trang in
                                </div>
                                <div className={cx('options-item')}>
                                    <input type="radio" name="scaling" /> Theo kích cỡ file gốc
                                </div>
                                <div className={cx('options-item')}>
                                    <label htmlFor="pagesNum">Tùy chỉnh: </label>
                                    <input type="number" defaultValue="100" />%
                                </div>
                            </div>
                        </div>
                        <div className={cx('options')}>
                            <label>5.5. Chọn trang in:</label>

                            <div className={cx('options-content')}>
                                <div className={cx('options-item')}>
                                    <input type="radio" name="pages" /> Tất cả
                                </div>
                                <div className={cx('options-item')}>
                                    <input type="radio" name="pages" /> Chỉ in trang lẻ
                                </div>
                                <div className={cx('options-item')}>
                                    <input type="radio" name="pages" /> Chỉ in trang chẵn
                                </div>
                                <div className={cx('options-item')}>
                                    <label htmlFor="pagesNum">Tùy chỉnh: </label>
                                    <input id="pagesNum" type="text" placeholder="ví dụ: 1-5, 8, 11-13" />
                                </div>
                            </div>
                        </div>
                        <div className={cx('options')}>
                            <label>5.6. Số trang mỗi tờ:</label>
                            <select>
                                <option>1</option>
                                <option>2</option>
                                <option>4</option>
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
                <Button className={cx('print-button')}>In</Button>
            </footer>
        </div>
    );
}

export default Print;
