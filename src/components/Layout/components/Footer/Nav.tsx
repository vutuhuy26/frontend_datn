import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import { RxDotFilled } from 'react-icons/rx';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

type TNav = {
    id: number;
    name: string;
    path: string;
};

function Nav() {
    const data: TNav[] = [
        {
            id: 1,
            name: 'Trang chủ',
            path: '/',
        },
        {
            id: 2,
            name: 'Về chúng tôi',
            path: '/description',
        },
        {
            id: 3,
            name: 'Sản phẩm',
            path: '/shop',
        },
        {
            id: 4,
            name: 'Tin tức',
            path: '/news',
        },
        {
            id: 5,
            name: 'Liên hệ',
            path: '/contact',
        },
    ];

    return (
        <div>
            <h2 className={cx('heading-nav')}>điều hướng</h2>
            <nav className={cx('nav-footer')}>
                {data.map((item: TNav) => (
                    <NavLink
                        className={(nav) => cx('link-footer', { active: nav.isActive })}
                        key={item.id}
                        to={item.path}
                    >
                        <span>
                            <RxDotFilled color="orange" size="18px" />
                        </span>
                        {item.name}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
}

export default Nav;
