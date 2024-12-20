import { useState, useEffect } from 'react';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    faCoins,
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    faKeyboard,
    faSignOut,
    faUser,
    faFile,
    faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

// import { faFile } from '@fortawesome/free-regular-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { match } from 'path-to-regexp';
import 'tippy.js/dist/tippy.css';
import config from '~/config';
import Button from '~/components/Button';
import styles from './Header.module.scss';
import Menu from '~/components/Popper/Menu';
import images from '~/assets/images';
import Image from '~/components/Image';
import { useProvider } from '~/components/Provider';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

function Header() {
    const { paperCount, updatePaperCount } = useProvider();

    // Retrieve paper count from localStorage
    useEffect(() => {
        const storedPaperCount = localStorage.getItem('paperCount');
        if (storedPaperCount) {
            updatePaperCount(parseInt(storedPaperCount, 10));
        }
    }, []);

    const location = useLocation();
    const currentUser = true;
    const isActive = (path) => {
        const matcher = match(path, { decode: decodeURIComponent });
        return matcher(location.pathname) !== false;
    };
    // Handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // Handle change language
                break;
            default:
        }
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/@hoaa',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get Pages',
            to: '/buy',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/settings',
        },
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            to: '/',
            separate: true,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('navbar')}>
                    <Link to={config.routes.login} className={cx('logo-link')}>
                        <img src={images.logo} alt="" className={cx('logo-img')} />
                        <div className={cx('title')}>
                            <span>HCMUT</span>
                            <span className={cx('SPSS')}>SPSS</span>
                        </div>
                    </Link>

                    <Button
                        to={config.routes.home}
                        className={cx('nav-item', 'nav-btn')}
                        primary={isActive(config.routes.home)}
                    >
                        Trang chủ
                    </Button>

                    <Button
                        to={config.routes.document}
                        className={cx('nav-item', 'nav-btn')}
                        primary={isActive(config.routes.document)}
                    >
                        Tệp của tôi
                    </Button>

                    <Button
                        to={config.routes.print}
                        className={cx('nav-item', 'nav-btn')}
                        primary={isActive(config.routes.print)}
                    >
                        In ấn
                    </Button>

                    <Button
                        to={config.routes.buy}
                        className={cx('nav-item', 'nav-btn')}
                        primary={isActive(config.routes.buy)}
                    >
                        Mua giấy
                    </Button>

                    <Button
                        to={config.routes.history}
                        className={cx('nav-item', 'nav-btn')}
                        primary={isActive(config.routes.history)}
                    >
                        Lịch sử in
                    </Button>
                </div>
                <div className={cx('menu')}>
                    <Button className={cx('menu-balance')} to={config.routes.buy} outline>
                        <FontAwesomeIcon icon={faFile} className={cx('file-icon')} /> {paperCount} Tờ
                    </Button>
                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <div className={cx('avatar-control')}>
                                <Image className={cx('user-avatar')} src={images.avatar} alt="Nguyen Van A" />
                                <FontAwesomeIcon icon={faChevronDown} className={cx('chevron-icon')} />
                            </div>
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
