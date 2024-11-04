import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import ImageSlider from '~/components/Slider';

import Image from '~/components/Image';
import images from '~/assets/images';

const cx = classNames.bind(styles);
function Home() {
    const IMAGES = [images.slider1, images.slider2, images.slider3];
    return (
        <div className={cx('container')}>
            <div>
                <ImageSlider images={IMAGES} className={cx('slider')} />
            </div>
            <div className={`${cx('home-content')} row`}>
                <div className={`${cx('price-table')} col-md-7`}>
                    <h3>Bảng Giá</h3>
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
        </div>
    );
}

export default Home;
