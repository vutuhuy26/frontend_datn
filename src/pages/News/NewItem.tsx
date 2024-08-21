import classNames from 'classnames/bind';
import styles from './News.module.scss';

const cx = classNames.bind(styles);
type TProps = {
    logo: any;
    title: string;
    description: string;
};

function NewItem(props: TProps) {
    return (
        <div className={cx('new-item')}>
            <div className={cx('wrapper-item')}>
                <div className={cx('item-thumb')}>
                    <img src={props.logo} alt="thumbnail" />
                </div>
                <div className={cx('item-info')}>
                    <h3 className={cx('heading-title')}>{props.title}</h3>
                    <p className={cx('item-description')}>{props.description}</p>
                </div>
            </div>
        </div>
    );
}

export default NewItem;
