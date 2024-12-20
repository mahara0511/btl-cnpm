import React, { useState, useEffect } from 'react';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import ImageSlider from '~/components/Slider';

import Image from '~/components/Image';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Home() {
    const IMAGES = [images.slider1, images.slider2, images.slider3, images.landing_pg_1];
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Kiểm tra tất cả các hình ảnh đã tải xong
        const loadImages = IMAGES.map((imgSrc) => {
            return new Promise((resolve) => {
                const img = new window.Image(); // Sử dụng window.Image thay vì component Image
                img.src = imgSrc;
                img.onload = resolve;
            });
        });

        // Cập nhật trạng thái sau khi tất cả hình ảnh đã tải xong
        Promise.all(loadImages).then(() => setIsLoaded(true));
    }, []);

    return (
        <div className={cx('container')}>
            {isLoaded ? (
                <>
                    <div>
                        <ImageSlider images={IMAGES.slice(0, 3)} className={cx('slider')} />
                    </div>
                    <div className={`${cx('home-content')} row`}>
                        <div className={`${cx('price-table')} col-md-7`}>
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
                                    <tr>
                                        <td>1</td>
                                        <td>0-10</td>
                                        <td>500</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>11-100</td>
                                        <td>400</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>101-1000</td>
                                        <td>300</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td> {`>`} 1000</td>
                                        <td>250</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={`${cx('')} col-md-5`}>
                            <Image className={cx('landing-image')} src={images.landing_pg_1} alt="home-landing" />
                        </div>
                    </div>
                </>
            ) : (
                <div>Đang tải...</div> // Hiển thị thông báo tải khi chưa tải xong
            )}
        </div>
    );
}

export default Home;
