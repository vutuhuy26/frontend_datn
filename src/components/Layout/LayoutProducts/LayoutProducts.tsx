import classNames from 'classnames/bind';
import styles from './LayoutProducts.module.scss';
import { NavProducts } from '../components/NavProducts';
import { BarProducts } from '../components/BarProducts';

const cx = classNames.bind(styles);
type TProps = {
    children: React.ReactNode;
    value: [number, number];
    title: string;
    subTitle?: string;
};

function LayoutProducts(props: TProps) {
    return (
        <div className={cx('layout-products')}>
            <div className={cx('wrapper')}>
                <NavProducts subTitle={props.subTitle} title={props.title} />
                <div className={cx('contents')}>
                    <BarProducts value={props.value} />
                    <div className={cx('main-products')}>{props.children}</div>
                </div>
            </div>
        </div>
    );
}

export default LayoutProducts;
