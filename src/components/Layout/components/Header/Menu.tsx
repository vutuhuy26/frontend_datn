import { useRef } from 'react';
import classNames from 'classnames/bind';
import { HiOutlineSearch } from 'react-icons/hi';
import styles from './Header.module.scss';
import { data } from './data';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaShoppingCart } from 'react-icons/fa';
import { AiOutlineInstagram, AiOutlineMail, AiOutlineTwitter } from 'react-icons/ai';
import { IoMenu } from 'react-icons/io5';

const cx = classNames.bind(styles);

type TData = {
    id: number;
    name: string;
    path: string;
};

function Menu() {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleCloseMenu = () => {
        if (containerRef.current && contentRef.current) {
            containerRef.current.style.visibility = 'hidden';
            contentRef.current.style.transform = 'translateX(-260px)';
        }
    };

    const handleOpenMenu = () => {
        if (containerRef.current && contentRef.current) {
            containerRef.current.style.visibility = 'visible';
            contentRef.current.style.transform = 'translateX(0)';
        }
    };

    return (
        <>
            <div onClick={handleCloseMenu} ref={containerRef} className={cx('menu-header-tablet')}>
                <div ref={contentRef} onClick={(e) => e.stopPropagation()} className={cx('menu-wraper-tablet')}>
                    <div className={cx('menu-search')}>
                        <div className={cx('wraper-item-menu')}>
                            <input type="text" placeholder="Tìm kiếm..." />
                            <span className={cx('span-menu-icon')}>
                                <HiOutlineSearch size={'1.8rem'} />
                            </span>
                        </div>
                    </div>
                    {data.map((item: TData) => (
                        <Link key={item.id} className={cx('menu-link')} to={item.path}>
                            {item.name}
                        </Link>
                    ))}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Link className={cx('menu-link')} to={'/categories'}>
                            <span className={cx('span-menu-icon')}>
                                <FaShoppingCart size={'1.8rem'} />
                            </span>
                        </Link>
                    </div>
                    <div className={cx('social-icons-menu')}>
                        <span>
                            <FaFacebookF size={'2rem'} />
                        </span>
                        <span>
                            <AiOutlineInstagram size={'2rem'} />
                        </span>
                        <span>
                            <AiOutlineTwitter size={'2rem'} />
                        </span>
                        <span>
                            <AiOutlineMail size={'2rem'} />
                        </span>
                    </div>
                </div>
            </div>
            <div className={cx('header-menu')}>
                <span onClick={handleOpenMenu} className={cx('menu-header-icon')}>
                    <IoMenu fontSize={'2.5rem'} />
                </span>
            </div>
        </>
    );
}

export default Menu;
