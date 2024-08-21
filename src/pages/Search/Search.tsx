import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { useLocation } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { useDebounce } from '../../hooks';
import { AiOutlineLoading } from 'react-icons/ai';
import { CardItemFlip } from '../../components/CardItemFlip';
import { T_Product, T_Search } from '../../models';
import { ApiService } from '../../axios/ApiService';
import { App } from '../../const/App';
import { getNameFromType } from '../../Helper';

const cx = classNames.bind(styles);

type TStateSearch = {
    q?: string;
};

function Search() {
    const { state }: { state: TStateSearch } = useLocation();
    const [searchText, setSearchText] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('Không có tìm kiếm gần đây');
    const [data, setData] = useState<T_Product[]>([]);
    const apiService = new ApiService();
    const debounced = useDebounce(searchText, App.DELAY_SEARCH);

    useEffect(() => {
        if (debounced.trim().length > 0) {
            setLoading(true);

            apiService.products
                .searchProducts({
                    search: debounced.trim(),
                })
                .then((res: T_Search) => {
                    setLoading(false);

                    if (res.data.length > 0) {
                        setData(res.data);
                    } else {
                        setData([]);
                        setMessage('Không có kết quả tìm kiếm !');
                    }
                })
                .catch((err) => console.log('err: ', err));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounced]);

    useEffect(() => {
        if (state && state.q && state.q.length > 0) {
            setSearchText(state.q);
        }
    }, [state]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-contents')}>
                <div className={cx('header')}>
                    <h5>Tìm kiếm trong Shop</h5>
                    <div className={cx('input-search')}>
                        <input
                            value={searchText}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
                            type="text"
                            placeholder="Nhập từ khóa để tìm kiếm..."
                        />
                        <span>{!loading ? <BiSearch /> : <AiOutlineLoading className={cx('loading-input')} />}</span>
                    </div>
                </div>
                <div className={cx('contents')}>
                    {data.length > 0 && <h2>Kết quả tìm kiếm</h2>}
                    <div className={cx('containers')}>
                        {data.length > 0 ? (
                            data.map((item: T_Product) => (
                                <CardItemFlip
                                    key={item.id}
                                    to={`/product/${item.type}/${item.id}`}
                                    title={getNameFromType(item.type)}
                                    name={item.name}
                                    src={item.preview_url}
                                    price={item.price}
                                />
                            ))
                        ) : (
                            <p style={{ textAlign: 'center' }}>{message}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;
