import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './NavBarNewsPage.module.scss';
import image from '../../../../assets/images/meoww.jpg';

const cx = classNames.bind(styles);

function NavBarNewsPage() {
    return (
        <div className={cx('bar-content')}>
            <h2 className={cx('bar-heading')}>BÀI VIẾT MỚI</h2>
            <div className={cx('bar-wrapper')}>
                <div className={cx('bar-item')}>
                    <div className={cx('thumbnail-bar')}>
                        <img src={image} alt="bar item" />
                    </div>
                    <Link to={''} className={cx('bar-description')}>
                        Duis luctus elit nisi, et cursus magna pellentesque non.
                    </Link>
                </div>
                <div className={cx('spacer')}></div>
                <div className={cx('bar-item')}>
                    <div className={cx('thumbnail-bar')}>
                        <img src={image} alt="bar item" />
                    </div>
                    <Link to={''} className={cx('bar-description')}>
                        Duis luctus elit nisi, et cursus magna pellentesque non.
                    </Link>
                </div>
                <div className={cx('spacer')}></div>
                <div className={cx('bar-item')}>
                    <div className={cx('thumbnail-bar')}>
                        <img src={image} alt="bar item" />
                    </div>
                    <Link to={''} className={cx('bar-description')}>
                        Duis luctus elit nisi, et cursus magna pellentesque non.
                    </Link>
                </div>
                <div className={cx('spacer')}></div>
                <div className={cx('bar-item')}>
                    <div className={cx('thumbnail-bar')}>
                        <img src={image} alt="bar item" />
                    </div>
                    <Link to={''} className={cx('bar-description')}>
                        Duis luctus elit nisi, et cursus magna pellentesque non.
                    </Link>
                </div>
                <div className={cx('spacer')}></div>
                <div className={cx('bar-item')}>
                    <div className={cx('thumbnail-bar')}>
                        <img src={image} alt="bar item" />
                    </div>
                    <Link to={''} className={cx('bar-description')}>
                        Duis luctus elit nisi, et cursus magna pellentesque non.
                    </Link>
                </div>
                <div className={cx('spacer')}></div>
                <div className={cx('bar-item')}>
                    <div className={cx('thumbnail-bar')}>
                        <img src={image} alt="bar item" />
                    </div>
                    <Link to={''} className={cx('bar-description')}>
                        Duis luctus elit nisi, et cursus magna pellentesque non.
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NavBarNewsPage;
