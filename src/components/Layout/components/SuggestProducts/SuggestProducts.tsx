import classNames from 'classnames/bind';
import styles from './SuggestProducts.module.scss';
import { useEffect, useState } from 'react';
import { formatVND } from '../../../../Helper';
import { T_Product, T_Suggest } from '../../../../models';
import { ApiService } from '../../../../axios/ApiService';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function SuggestProducts() {
    const [data, setData] = useState<T_Product[]>([]);
    const apiService = new ApiService();

    useEffect(() => {
        apiService.products
            .randomProducts()
            .then((res: T_Suggest) => {
                if (res.message === 'success') {
                    setData(res.data);
                }
            })
            .catch((err) => console.log('err: ', err));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('suggest-pro')}>
            <h6 className={cx('heading-menu')}>SẢN PHẨM</h6>
            <div className={cx('wrapper-suggest')}>
                {data.length > 0 &&
                    data.map((item: T_Product) => (
                        <div key={item.id}>
                            <div className={cx('suggest-item')}>
                                <Link to={`/product/${item.type}/${item.id}`} className={cx('preview-suggest')}>
                                    <img src={item.preview_url} alt="preview product" />
                                </Link>
                                <div className={cx('suggest-info')}>
                                    <Link to={`/product/${item.type}/${item.id}`} className={cx('heading-suggest')}>
                                        {item.name}
                                    </Link>
                                    <p className={cx('price-suggest-item')}>{formatVND.format(item.price)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default SuggestProducts;
