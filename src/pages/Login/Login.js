import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import config from '~/config';
import Button from '~/components/Button';
import styles from './Login.module.scss';
import images from '~/assets/images';
import Image from '~/components/Image';
import Motion from '~/components/Motion';
const cx = classNames.bind(styles);
function Login() {
    return (
        <Motion>
            <main className={`${cx('wrapper')} container`}>
                <div className={`${cx('page-content')} row`}>
                    <div className="col-md-7">
                        <div className={cx('title')}>
                            <span>Print </span> smart,
                            <span> study </span> hard.
                        </div>
                        <span className={cx('slogan')}>In ấn ý tưởng của bạn, cho bài báo cáo thành công... </span>
                        <span className={cx('desc')}>
                            HCMUT SPSS là dịch vụ in ấn dành riêng cho sinh viên trường đại học Bách khoa, ĐHQG-HCM sử
                            dụng trong các cơ sở của trường{' '}
                        </span>
                        <div className={cx('button-list')}>
                            <Button className={cx('custom-btn', 'login-btn')} primary slim to={config.routes.home}>
                                Đăng nhập
                            </Button>
                            <Button className={cx('custom-btn', 'custom-btn-more')}>Tìm hiểu thêm</Button>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <Image className={cx('landing-image')} src={images.landing_pg_1} alt="Image" />
                    </div>
                </div>
            </main>
        </Motion>
    );
}

export default Login;
