import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Header from '~/layouts/components/LoginHeader';
import Footer from '~/layouts/components/Footer';
import Sidebar from '~/layouts/components/Sidebar';
import styles from './DefaultLayout.module.scss';
import { motion, AnimatePresence } from 'framer-motion';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')} role="main">
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
