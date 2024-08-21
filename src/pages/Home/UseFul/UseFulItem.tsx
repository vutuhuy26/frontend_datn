import { NavLink } from 'react-router-dom';
import styles from './UseFul.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
type TProps = {
    path?: string;
    img: any;
    heading: string;
    description: string;
};

function UseFulItem(props: TProps) {
    return (
        <NavLink to={props.path ?? '/'} className={cx('wrapper-useful-item')}>
            <div className={cx('avatar')}>
                <img src={props.img} alt="preview avatar" />
            </div>
            <div className={cx('description')}>
                <h3 className={cx('heading-item')}>{props.heading}</h3>
                <p className={cx('content-description')}>{props.description}</p>
                <p className={cx('link-useful')}>XEM THÊM</p>
            </div>
        </NavLink>
    );
}

export default UseFulItem;
