import classNames from 'classnames/bind';
import styles from './Categories.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import routesConfig from '../../config/routes';
import noCarts from '../../assets/images/no-cart.png';
import { confirmDialog } from 'primereact/confirmdialog';
import { MdOutlineDiscount } from 'react-icons/md';
import { useConfirmToast } from '../../context/ConfirmAndToastContext';
import { Voucher } from './Voucher';
import { useSessionContext } from '../../context/SessionContext';
import { formatVND } from '../../Helper';
import { TData, T_Cart, T_Categorys } from '../../models';
import { ApiService } from '../../axios/ApiService';
import { Loading } from '../../components/Loading';
import { useRecoilState } from 'recoil';
import { orderItems } from '../../store';

const cx = classNames.bind(styles);

function Categories() {
    const [data, setData] = useState<TData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [openVoucher, setOpenVoucher] = useState<boolean>(false);
    const [checkAll, setCheckAll] = useState<boolean>(false);
    const message = useConfirmToast();
    const apiService = new ApiService();
    const [values] = useSessionContext();
    const navigate = useNavigate();
    const [ordersTest, setDataOrders] = useRecoilState(orderItems);

    useEffect(() => {
        document.title = 'Trang chủ | Petshop chất lượng số 1 Việt Nam!';
        window.scrollTo({
            behavior: 'smooth',
            top: 0,
        });
    }, []);

    useEffect(() => {
        setIsLoading(true);

        apiService.carts
            .getCartsByUserId(`${values.user?.id}`, values.user?.token ?? '')
            .then((res: T_Categorys) => {
                if (res.message === 'success') {
                    console.log('data:', res.data);

                    if (res.data.length > 0) {
                        const result: TData[] = res.data.map((item: T_Cart) => ({
                            id: item.carts_id,
                            id_product: item.carts_product_id,
                            name: item.product_name,
                            color: item.product_color,
                            price: item.product_price ?? 'Không',
                            lastPrice: item.product_price * item.carts_quantity,
                            quantity: item.carts_quantity,
                            previewUrl: item.product_preview_url,
                            checked: false,
                        }));

                        setData(result);
                        setIsLoading(false);
                    }
                }
            })
            .catch((err) => console.error(err));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            const isCheckAll = data.every((item) => item.checked);

            setCheckAll(() => isCheckAll);
        }
    }, [data]);

    useEffect(() => {
        if (checkAll) {
            setDataOrders(data);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkAll]);

    const totalMoney = useMemo(() => {
        const dataChecked: TData[] = data.filter((item) => item.checked === true);

        if (dataChecked.length > 0) {
            const result = dataChecked.reduce((result, cur) => result + cur.lastPrice, 0);

            return {
                price: result,
                length: dataChecked.length,
            };
        }
    }, [data]);

    const confirmOne = (value: TData) => {
        confirmDialog({
            message: 'Bạn có chắc chắn muốn xóa không?',
            position: 'top',
            header: 'Xóa sản phẩm',
            acceptLabel: 'Đồng ý',
            rejectLabel: 'Hủy bỏ',
            icon: 'pi pi-exclamation-triangle',
            accept() {
                message?.toast?.current?.show({
                    severity: 'success',
                    summary: 'Thành công',
                    detail: 'Đã xóa thành công sản phẩm',
                    life: 3000,
                });
                setData((prev) => prev.filter((item) => item.id !== value.id));
            },
        });
    };

    const confirmAll = () => {
        confirmDialog({
            message: 'Bạn có chắc chắn muốn xóa tất cả sản phẩm không?',
            position: 'top',
            header: 'Xóa sản phẩm',
            acceptLabel: 'Đồng ý',
            rejectLabel: 'Hủy bỏ',
            icon: 'pi pi-exclamation-triangle',
            accept() {
                if (checkAll) {
                    setData([]);
                    message?.toast?.current?.show({
                        severity: 'success',
                        summary: 'Thành công',
                        detail: 'Đã xóa thành công',
                        life: 3000,
                    });
                } else {
                    message?.toast?.current?.show({
                        severity: 'error',
                        summary: 'Thất bại',
                        detail: 'Vui lòng chọn sản phẩm cần xóa!',
                        life: 3000,
                    });
                }
            },
        });
    };

    //// chưa tối ưu
    const handleIncrementQuantity = (value: TData) => {
        ////// update quantity data
        const index = data.findIndex((item) => item.id === value.id);

        const dataChanged = [...data];
        dataChanged[index] = {
            ...data[index],
            quantity: data[index].quantity + 1,
            lastPrice: data[index].quantity * data[index].price,
        };

        setData(dataChanged);

        ///// update quantity orders
        if (ordersTest.length > 0) {
            const indexOrder = ordersTest.findIndex((item: any) => item.id === value.id);

            if (indexOrder !== -1) {
                const data = [...ordersTest];
                data[indexOrder] = {
                    ...data[indexOrder],
                    quantity: data[indexOrder].quantity + 1,
                };

                setDataOrders(data);
            }
        }
    };

    ////// chưa tối ưu
    const handleDownQuantity = (value: TData) => {
        ////// update quantity data
        const index = data.findIndex((item) => item.id === value.id);

        const dataChanged = [...data];
        dataChanged[index] = {
            ...dataChanged[index],
            quantity: --data[index].quantity <= 1 ? 1 : data[index].quantity,
            lastPrice: data[index].quantity <= 1 ? data[index].price : data[index].quantity * data[index].price,
        };

        setData(dataChanged);

        /// update quantity orders
        if (ordersTest.length > 0) {
            const indexOrder = ordersTest.findIndex((item: any) => item.id === value.id);

            if (indexOrder !== -1) {
                const data = [...ordersTest];
                data[indexOrder] = {
                    ...data[indexOrder],
                    quantity: --data[indexOrder].quantity <= 1 ? 1 : data[indexOrder].quantity,
                };

                setDataOrders(data);
            }
        }
    };

    const handleChecked = (value: TData) => {
        if (value.checked) {
            setDataOrders((prev: any) => {
                return prev.filter((item: any) => item.id !== value.id);
            });
        } else {
            setDataOrders((prev: any) => {
                return [...prev, value];
            });
        }

        const index = data.findIndex((item) => item.id === value.id);

        const dataChanged = [...data];
        dataChanged[index] = {
            ...dataChanged[index],
            checked: !data[index].checked,
        };

        setData(dataChanged);
    };

    const handeSelectAll = () => {
        setCheckAll((prev) => {
            if (prev) {
                setDataOrders([]);
            }

            return !prev;
        });
        const dataChecked = data.map((item) => ({
            ...item,
            checked: !checkAll ? true : false,
        }));

        setData(dataChecked);
    };

    const handleOpenVoucher = () => {
        setOpenVoucher(true);
    };

    const handleOrder = () => {
        navigate(routesConfig.orders);
    };

    return (
        <div className={cx('categories')}>
            <Voucher open={openVoucher} setOpen={setOpenVoucher} />
            <div className={cx('header')}>
                <div className={cx('info')}>
                    <div className={cx('logo')}>
                        <h3 className={cx('name-petshop')}>Petshop</h3>
                    </div>
                    <div className={cx('line')}></div>
                    <p className={cx('cart-name')}>Giỏ hàng</p>
                </div>
                <Link
                    style={{
                        textDecoration: 'none',
                        color: '#333',
                    }}
                    to={routesConfig.profile}
                >
                    <div className={cx('user')}>
                        <div className={cx('preview')}>
                            <img src={values.user?.avatar} alt="user" />
                        </div>
                        <h3 className={cx('user-name')}>{values.user?.name}</h3>
                    </div>
                </Link>
            </div>
            <div className={cx('carts-list')}>
                <div className={cx('wrapper-carts')}>
                    {isLoading ? (
                        <Loading />
                    ) : (
                        <>
                            {data.length > 0 ? (
                                data.map((item) => (
                                    <div key={item.id} className={cx('cart-item')}>
                                        <div className={cx('input-product-wrap')}>
                                            <input
                                                checked={item.checked}
                                                onChange={() => handleChecked(item)}
                                                type="checkbox"
                                                name="check-cart"
                                            />
                                            <div className={cx('info-item')}>
                                                <div className={cx('preview-product')}>
                                                    <img src={item.previewUrl} alt="preview product" />
                                                </div>
                                                <div className={cx('wrapper-info')}>
                                                    <p className={cx('name-item-cart')}>{item.name}</p>
                                                    <p className={cx('color-product')}>Màu sắc: {item.color}</p>
                                                    <p className={cx('item-price')}>{formatVND.format(item.price)}</p>
                                                    <div className={cx('count-item')}>
                                                        <p
                                                            onClick={() => handleDownQuantity(item)}
                                                            className={cx('p_1')}
                                                        >
                                                            -
                                                        </p>
                                                        <p className={cx('p_2')}>{item.quantity}</p>
                                                        <p
                                                            onClick={() => handleIncrementQuantity(item)}
                                                            className={cx('p_3')}
                                                        >
                                                            +
                                                        </p>
                                                    </div>

                                                    <p className={cx('last-price')}>
                                                        {formatVND.format(item.lastPrice)}
                                                    </p>
                                                    <p onClick={() => confirmOne(item)} className={cx('remove-item')}>
                                                        Xóa
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div style={{ padding: '32px 0' }}>
                                    <p>Giỏ hàng trống!!!</p>
                                    <div className={cx('preview-no-carts')}>
                                        <img src={noCarts} alt="no-carts" />
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
                <div className={cx('footer')}>
                    <div className={cx('voucher')}>
                        <div className={cx('empty')}></div>
                        <div className={cx('info-voucher')}>
                            <div className={cx('icon')}>
                                <MdOutlineDiscount size={'2rem'} />
                                <span>Petshop Voucher</span>
                            </div>
                            <p onClick={handleOpenVoucher} className={cx('add-voucher')}>
                                Chọn Hoặc Nhập Mã
                            </p>
                        </div>
                    </div>
                    <div className={cx('actions-footer')}>
                        <div className={cx('all-remove')}>
                            <div className={cx('select-all')}>
                                <input
                                    onChange={handeSelectAll}
                                    checked={checkAll}
                                    type="checkbox"
                                    name="remove-all"
                                    id="all-del"
                                />
                                <label htmlFor="all-del">Chọn Tất Cả ({data.length})</label>
                            </div>
                            <p onClick={confirmAll} className={cx('deleted-all')}>
                                Xóa
                            </p>
                        </div>
                        <div className={cx('buy-all')}>
                            <p className={cx('total-buy')}>
                                Tổng thanh toán{' '}
                                {totalMoney?.length && (
                                    <span className={cx('total-count')}>({totalMoney?.length} sản phẩm)</span>
                                )}
                                <span>₫{formatVND.format(totalMoney?.price ?? 0)}</span>
                            </p>
                            <button onClick={handleOrder} className={cx('btn-buy')}>
                                Mua Hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Categories;
