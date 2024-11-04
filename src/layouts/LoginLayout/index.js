import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Header from '~/layouts/components/LoginHeader';
import Footer from '~/layouts/components/Footer';
import styles from './loginLayout.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom'; // Nhập useLocation

const cx = classNames.bind(styles);
function LoginLayout({ children }) {
    const location = useLocation();
    return (
        <div>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default LoginLayout;
