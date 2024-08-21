import classNames from 'classnames/bind';
import styles from './Loading.module.scss';

const cx = classNames.bind(styles);

function Loading() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('lds-ripple')}>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default Loading;
