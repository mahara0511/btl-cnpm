import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Header from '~/layouts/components/LoginHeader';
import Footer from '~/layouts/components/Footer';
import styles from './HeaderLogin.module.scss';
import Motion from '~/components/Motion';

const cx = classNames.bind(styles);
function HeaderLogin({ children }) {
    return (
        <Motion>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
        </Motion>
    );
}

export default HeaderLogin;
