import { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './BarProducts.module.scss';
import { Slider } from 'primereact/slider';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { filterItemByPrice, isFilter } from '../../../../store';
import { formatVND } from '../../../../Helper';
import { useDebouneClick } from '../../../../hooks';

const cx = classNames.bind(styles);

type TProps = {
    value: [number, number];
};

function Filter(props: TProps) {
    const [value, setValue] = useRecoilState<[number, number]>(filterItemByPrice);
    const setIsFilter = useSetRecoilState(isFilter);

    useEffect(() => {
        setValue(props.value);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.value]);

    const handleChange = (value: [number, number]) => {
        setValue(value);
    };

    const handleSubmitFilter = useDebouneClick(() => {
        setIsFilter((prev) => !prev);
    }, 450);

    return (
        <div className={cx('filter')}>
            <h6 className={cx('heading-menu')}>LỌC THEO GIÁ</h6>
            <div className={cx('wrapper-filter')}>
                <Slider
                    min={props.value[0]}
                    max={props.value[1]}
                    range
                    value={value}
                    onChange={(e) => handleChange(e.value as [number, number])}
                />
                <div className={cx('info-filter')}>
                    <button onClick={handleSubmitFilter}>Lọc</button>
                    <p>
                        Giá: {formatVND.format(value[0])} - {formatVND.format(value[1])}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Filter;
