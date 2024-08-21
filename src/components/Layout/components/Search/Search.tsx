import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { IoIosCloseCircle } from 'react-icons/io';
import { AiOutlineLoading } from 'react-icons/ai';
import img from '../../../../assets/images/cat_item_1.jpg';
import { useDebounce } from '../../../../hooks';
import { formatVND } from '../../../../Helper';
import { Link, useNavigate } from 'react-router-dom';
import { T_Product, T_Search } from '../../../../models';
import { ApiService } from '../../../../axios/ApiService';
import { App } from '../../../../const/App';

const cx = classNames.bind(styles);

type T_Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
};

function Search(props: T_Props) {
    const [inputValue, setInputValue] = useState<string>('');
    const [fakeData, setFakeData] = useState<T_Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('Không có tìm kiếm gần đây');
    const debounced = useDebounce(inputValue, App.DELAY_SEARCH);
    const apiService = new ApiService();
    const navigate = useNavigate();

    useEffect(() => {
        if (debounced.trim().length > 0) {
            setLoading(true);

            apiService.products
                .searchProducts({
                    search: debounced.trim(),
                })
                .then((res: T_Search) => {
                    if (res.message === 'success') {
                        setLoading(false);

                        if (res.data.length > 0) {
                            setFakeData(res.data);
                        } else {
                            setFakeData([]);
                            setMessage('Không có kết quả tìm kiếm!');
                        }
                    }
                })
                .catch((err) => console.log('err: ', err));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounced]);

    const handleCloseSearch = () => {
        props.setOpen(false);
    };

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            console.log('searching...', inputValue);
            navigate('/search', {
                state: {
                    q: inputValue,
                },
            });

            props.setOpen(false);
        }
    };

    return (
        <>
            <div
                style={{
                    visibility: props.open ? 'visible' : 'hidden',
                }}
                id="mask"
                onClick={handleCloseSearch}
                className={cx('search')}
            ></div>
            <div
                style={{
                    transform: props.open ? 'translateX(0)' : 'translateX(450px)',
                }}
                id="search-wrap"
                className={cx('wrapper')}
            >
                <div className={cx('contents')}>
                    <h4 className={cx('heading')}>Tìm kiếm trong Shop</h4>
                    <div className={cx('input-search')}>
                        <input
                            value={inputValue}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                            type="text"
                            placeholder="Nhập để tìm kiếm..."
                            onKeyDown={handleSearch}
                        />
                        <span>
                            {inputValue?.trim().length > 0 && !loading && (
                                <IoIosCloseCircle onClick={() => setInputValue('')} />
                            )}
                            {loading && <AiOutlineLoading className={cx('loading-input')} />}
                        </span>
                    </div>
                    <div className={cx('line-search')}></div>
                    <div className={cx('result-search')}>
                        {fakeData.length > 0 ? (
                            fakeData.map((item) => (
                                <Link
                                    to={`/product/${item.type}/${item.id}`}
                                    onClick={() => props.setOpen(false)}
                                    key={item.id}
                                    className={cx('result-item')}
                                >
                                    <div className={cx('item-info')}>
                                        <div className={cx('preview')}>
                                            <img src={item.preview_url ?? img} alt="images preview" />
                                        </div>
                                        <p className={cx('name-item')}>{item.name}</p>
                                    </div>
                                    <p className={cx('price-item')}>{formatVND.format(item.price)}</p>
                                </Link>
                            ))
                        ) : (
                            <p className={cx('message-noti')}>{message}</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Search;
