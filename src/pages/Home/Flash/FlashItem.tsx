import styles from './Flash.module.scss';
import classNames from 'classnames/bind';
import { ReactElement } from 'react';

const cx = classNames.bind(styles);

type TProps = {
    icon: ReactElement;
    title: string;
    description: string;
    line?: boolean;
};
function FlashItem(props: TProps) {
    return (
        <div className={cx('flash-item', props.line ? 'flash-line' : '')}>
            <span className={cx('flash-icon')}>{props.icon}</span>
            <div className={cx('info')}>
                <h3 className={cx('title')}>{props.title}</h3>
                <p className={cx('description')}>{props.description}</p>
            </div>
        </div>
    );
}

export default FlashItem;
