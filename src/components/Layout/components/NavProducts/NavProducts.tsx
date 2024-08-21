import classNames from 'classnames/bind';
import styles from './NavProducts.module.scss';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { useRecoilState } from 'recoil';
import { filterItem } from '../../../../store';

const cx = classNames.bind(styles);

type TProps = {
    title: string;
    subTitle?: string;
};

type Select = {
    name: string;
};

function NavProducts(props: TProps) {
    const [selected, setSelected] = useRecoilState(filterItem);

    const cities: Select[] = [
        { name: 'Phổ biến' },
        { name: 'Điểm đánh giá' },
        { name: 'Mới về' },
        { name: 'Giá thấp đến cao' },
        { name: 'Giá cao đến thấp' },
    ];

    return (
        <div className={cx('nav-products')}>
            <h3 className={cx('heading-nav')}>
                <span>TRANG CHỦ /</span> {props.title} {props.subTitle ? '/ ' + props.subTitle : ''}
            </h3>
            <div className={cx('filters')}>
                <span className={cx('filter-title')}>Sắp xếp: </span>
                <Dropdown
                    onChange={(e: DropdownChangeEvent) => setSelected(e.value)}
                    value={selected}
                    className={cx('drop-down-filter')}
                    placeholder="Mặc định"
                    options={cities}
                    optionLabel="name"
                    style={{ color: 'red !important' }}
                />
            </div>
        </div>
    );
}

export default NavProducts;
