import { Link } from 'react-router-dom';
import styles from './CardItemZoomIn.module.scss';
import classNames from 'classnames/bind';
import { formatVND } from '../../Helper';

const cx = classNames.bind(styles);

type TProps = {
    src: any;
    to?: string;
    title: string;
    name: string;
    price: number;
    flash?: string;
};

function CardItemZoomIn(props: TProps) {
    return (
        <Link className={cx('link-detail')} to={props.to ?? '/'}>
            <div className={cx('detail-dog')}>
                <div data-aos="zoom-in">
                    <div className={cx('wrap')}>
                        <div className={cx('preview')}>
                            <img src={props.src} alt="preview dog" />
                        </div>
                        <div className={cx('info')}>
                            <p className={cx('title')}>{props.title}</p>
                            <h3 className={cx('name-dog')}>{props.name}</h3>
                            <p className={cx('price')}>{formatVND.format(props.price)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default CardItemZoomIn;
