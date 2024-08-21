import classNames from 'classnames/bind';
import styles from './Orders.module.scss';
import { TiLocation } from 'react-icons/ti';
import image from '../../assets/images/success-pay.png';
import imagefail from '../../assets/images/fail-pay.png';
import { Button } from '../../components/Button';
import { RiCoupon3Fill } from 'react-icons/ri';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { BiDetail } from 'react-icons/bi';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { orderItems } from '../../store';
import { useConfirmToast } from '../../context/ConfirmAndToastContext';
import { ApiService } from '../../axios/ApiService';
import { useSessionContext } from '../../context/SessionContext';
import { useNavigate } from 'react-router-dom';
import { Address, TData, T_AddOrder, T_Payment, T_Payments, T_ProfileAddress } from '../../models';
import routesConfig from '../../config/routes';
import { formatVND } from '../../Helper';
import { AddressScreen } from '../../components/Layout/components/Address';
import { useAppContext } from '../../providers/AppProvider';
import { socketContext } from '../../context/SocketContext';

const cx = classNames.bind(styles);

function Orders() {
    const [data, setData] = useRecoilState(orderItems);
    const message = useConfirmToast();
    const apiService = new ApiService();
    const [values] = useSessionContext();
    const navigate = useNavigate();
    const [init, setInit] = useState<boolean>(false);
    const [isChangeAddress, setIsChangeAddress] = useState<boolean>(false);
    const [statePay, setStatePay] = useState<string>('');
    const [vouchers, setVouchers] = useState<{
        ship: number;
        shop: number;
    }>({
        shop: 100000,
        ship: 0,
    });
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [addressChoose, setAddressChoose] = useState<Address>();
    const { isConnected } = useAppContext();

    const timer = useRef<any>();

    useEffect(() => {
        apiService.address
            .getAddressesById((values.user?.id as number).toString(), values.user?.token ?? '')
            .then((res: T_ProfileAddress) => {
                if (res.message === 'success') {
                    setAddresses(res.data);

                    if (res.data.length > 0) {
                        setAddressChoose(res.data[0]);
                    }
                }
            })
            .catch((err) => console.error(err));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        document.title = 'Mua sắm | Petshop chất lượng số 1 Việt Nam!';
        window.scrollTo({
            behavior: 'smooth',
            top: 0,
        });
    }, []);

    const totalMoney = useMemo(() => {
        if (data.length > 0) {
            const result = data.reduce((result, cur) => result + cur.lastPrice, 0);

            return {
                price: result,
                length: data.length,
            };
        }
    }, [data]);

    const totalPay = useMemo(() => {
        if (totalMoney?.price) {
            return totalMoney.price - totalMoney.length * vouchers.ship - totalMoney.length * vouchers.shop;
        }

        return 0;
    }, [totalMoney, vouchers]);

    useEffect(() => {
        setInit(true);

        return () => {
            init && setData([]);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [init]);

    useEffect(() => {
        if (data.length <= 0) {
            navigate(routesConfig.categories);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const handleGetPaymentById = (response: { url: string; id: number[] }) => {
        console.log(response.id);

        let total: { is_success: boolean; message: string }[] = [];
        if (response.id.length > 0) {
            response.id.forEach((item) => {
                apiService.payments
                    .getPaymentById(`${item}`, values.user?.token ?? '')
                    .then((res: T_Payment) => {
                        if (res.message === 'success') {
                            if (res.data.state === '00') {
                                total.push({
                                    is_success: true,
                                    message: 'success',
                                });
                            } else if (res.data.state === '03') {
                                total.push({
                                    is_success: false,
                                    message: 'error',
                                });
                            } else if (res.data.state === '97') {
                                total.push({
                                    is_success: false,
                                    message: 'failed',
                                });
                            }
                        }
                    })
                    .catch((_) => {
                        setStatePay('error');
                    });
            });
        }

        if (total.length === response.id.length) {
            const checking = total.every((item: { is_success: boolean; message: string }) => item.is_success);

            if (checking) {
                setStatePay('success');
                message?.toast?.current?.show({
                    severity: 'success',
                    summary: 'Thành công',
                    detail: 'Thanh toán thành công!',
                    life: 4500,
                });
                clearInterval(timer.current);
            } else {
                setStatePay('error');
                message?.toast?.current?.show({
                    severity: 'error',
                    summary: 'Có lỗi',
                    detail: 'Thanh toán thất bại!',
                    life: 4500,
                });
                clearInterval(timer.current);
            }
        }
    };

    const handleRemoveFromCart = (id: number[]) => {
        if (id.length > 0) {
            id.forEach((item) => {
                apiService.carts
                    .deleteToCart(`${item}`, `${values.user?.token}`)
                    .then((res: { message: string; code: number }) => {
                        if (res.message === 'success') {
                            if (isConnected) {
                                socketContext.emit('delete-to-cart', {
                                    id: item,
                                    status: 'success',
                                });
                            }
                        }
                    })

                    .catch((_) => {
                        message?.toast?.current?.show({
                            severity: 'error',
                            summary: 'Có lỗi',
                            detail: 'Xảy ra lỗi, vui lòng thử lại',
                            life: 4500,
                        });
                    });
            });
        }
    };

    const handleOrders = () => {
        if (data.length > 0) {
            setStatePay('paying');

            const dataPost = data.map((item) => ({
                customer_id: values.user?.id,
                product_id: item.id_product,
                quantity: item.quantity,
                price: item.price,
            }));

            apiService.orders
                .addOrder(dataPost, values.user?.token ?? '')
                .then((res: T_AddOrder) => {
                    if (res.message === 'success') {
                        // delete from carts
                        const idCarts = data.map((item) => item.id);
                        handleRemoveFromCart(idCarts);

                        const dataPayments = res.data.map((item) => ({
                            state: '99',
                            order_id: item.id,
                        }));

                        return apiService.payments
                            .addPayment(dataPayments, values.user?.token ?? '')
                            .then((res: T_Payments) => {
                                if (res.message === 'success') {
                                    return res;
                                }
                            })

                            .catch((err) => console.error(err));
                    }
                })
                .then((res) => {
                    const idPayments = res?.data.map((item) => item.id);

                    return apiService.payments
                        .createVNPAY(
                            {
                                amount: 1000000,
                                pay_id: idPayments,
                                // bankCode: 'VNPAYQR',
                            },
                            values.user?.token ?? '',
                        )
                        .then((res: { url: string; id: number[] }) => {
                            if (res.url) {
                                window.open(res.url);

                                timer.current = setInterval(() => {
                                    handleGetPaymentById(res);
                                }, 1500);
                            }
                        })
                        .catch((err) => {
                            console.log('error VNPAY: ' + err);
                        });
                })
                .catch((err) => {
                    console.error(err);
                    message?.toast?.current?.show({
                        severity: 'error',
                        summary: 'Thất bại',
                        detail: 'Đã xảy ra lỗi, vui lòng thử lại!',
                        life: 3000,
                    });
                });
        } else {
            message?.toast?.current?.show({
                severity: 'error',
                summary: 'Có lỗi',
                detail: 'Vui lòng chọn sản phẩm cần mua!',
                life: 3000,
            });
        }
    };

    return (
        <div className={cx('orders')}>
            <AddressScreen
                data={addresses}
                open={isChangeAddress}
                setOpen={setIsChangeAddress}
                setChoose={setAddressChoose}
                choose={addressChoose}
            />
            {!!statePay && (
                <div className={cx('fixed-payment')}>
                    <div className={cx('wrapper-payment')}>
                        {statePay !== 'success' && statePay !== 'error' && statePay !== 'checksumfail' && (
                            <span className={cx('loader')}></span>
                        )}
                        <div className={cx('image-pay-success')}>
                            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                            {statePay === 'success' && <img src={image} alt="success image" />}
                            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                            {statePay === 'error' && <img src={imagefail} alt="fail image" />}
                        </div>
                        <p>
                            {statePay === 'success'
                                ? 'Thanh toán thành công'
                                : statePay === 'error'
                                ? 'Thanh toán thất bại'
                                : statePay === 'checksumfail'
                                ? 'Thanh toán thất bại, chữ ký không hợp lệ'
                                : 'Đang tiến hành thanh toán...'}
                        </p>
                        <div className={cx('group-button-pay')}>
                            {statePay === 'success' && (
                                <>
                                    <Button to={routesConfig.profile_buy}>Đến đơn mua</Button>
                                    <Button to={routesConfig.home}>Về trang chủ</Button>
                                </>
                            )}
                            {statePay === 'error' && <Button to={routesConfig.categories}>Quay lại giỏ hàng</Button>}
                        </div>
                    </div>
                </div>
            )}
            <div className={cx('address')}>
                <div className={cx('heading')}>
                    <span>
                        <TiLocation />
                    </span>
                    <div className={cx('detail-info')}>
                        <h5 style={{ fontWeight: 'bold' }}>Địa chỉ nhận hàng</h5>
                        {addresses.length > 0 ? (
                            <div className="detail-info">
                                <h5 style={{ margin: '4px 0' }}>
                                    {addressChoose?.full_name} | {addressChoose?.phone_number}
                                </h5>
                                <p>
                                    {addressChoose?.detail_address}, {addressChoose?.main_address}
                                </p>
                            </div>
                        ) : (
                            <div className="detail-info">
                                <p>Bạn chưa có địa chỉ, vui lòng thêm địa chỉ!</p>
                            </div>
                        )}
                    </div>
                </div>
                {addresses.length > 0 ? (
                    <Button onClick={() => setIsChangeAddress(true)} medium={'true'}>
                        Thay đổi địa chỉ
                    </Button>
                ) : (
                    <Button to={routesConfig.profile_address} medium={'true'}>
                        Thêm địa chỉ
                    </Button>
                )}
            </div>
            <div className={cx('products')}>
                <h3 className={cx('heading')}>Tu Huy Shop</h3>
                <div className={cx('product-container')}>
                    {data.length > 0 &&
                        data.map((item: TData) => (
                            <div key={item.id} className={cx('product-item')}>
                                <div className={cx('preview-product')}>
                                    <img src={item.previewUrl} alt={item.name} />
                                </div>
                                <div className={cx('info-product')}>
                                    <h3>{item.name}</h3>
                                    <p>Phân loại: {item.color ?? 'Không có'}</p>
                                    <p>Số lượng: x{item.quantity}</p>
                                    <p>Giá : {formatVND.format(item.price)}</p>
                                    <p>Thành tiền : {formatVND.format(item.lastPrice)}</p>
                                </div>
                            </div>
                        ))}
                </div>
                <div className={cx('voucher-shop')}>
                    <div className={cx('heading')}>
                        <span>
                            <RiCoupon3Fill />
                        </span>
                        <p>Voucher của Shop</p>
                    </div>
                    <p className={cx('select-voucher')}>Chọn hoặc nhập mã</p>
                </div>
            </div>
            <div className={cx('shippp')}>
                <h3>Phương thức vận chuyển (Có thể thay đổi)</h3>
                <div className={cx('info-ship')}>
                    <div>
                        <h5>Phương thức vận chuyển: Nhanh</h5>
                        <p>Nhận hàng vào 22/2 - 25/2</p>
                        <p style={{ color: 'orange' }}>Option áp mã vận chuyển</p>
                    </div>
                    <p style={{ color: '#000' }}>Phí giao hàng: {formatVND.format(vouchers.ship)}</p>
                    <Button small={'true'}>Thay đổi</Button>
                </div>
            </div>
            <div className={cx('total-money')}>
                <h3>Tống số tiền ({totalMoney?.length} sản phẩm): </h3>
                <p>{formatVND.format(totalMoney?.price ?? 0)}</p>
            </div>
            <div className={cx('voucher-shop')}>
                <div className={cx('heading')}>
                    <span>
                        <RiCoupon3Fill />
                    </span>
                    <p>Voucher của shop</p>
                </div>
                <p className={cx('select-voucher')}>Chọn hoặc nhập mã</p>
            </div>
            <div className={cx('voucher-shop')}>
                <div className={cx('heading')}>
                    <span>
                        <AiOutlineDollarCircle />
                    </span>
                    <p>Phương thức thanh toán</p>
                </div>
                <p className={cx('select-voucher')}>Chọn phương thức</p>
            </div>
            <div className={cx('details-payments')}>
                <div className={cx('heading-pay')}>
                    <span>
                        <BiDetail />
                    </span>
                    <p>Chi tiết thanh toán</p>
                </div>
                <div className={cx('contents')}>
                    <div className={cx('item-pay')}>
                        <p>Tổng tiền hàng</p>
                        <p>{formatVND.format(totalMoney?.price ?? 0)}</p>
                    </div>
                    <div className={cx('item-pay')}>
                        <p>Giảm giá của Shop</p>
                        <p>{formatVND.format((totalMoney?.length ?? 1) * vouchers.shop)}</p>
                    </div>
                    <div className={cx('item-pay')}>
                        <p>Tổng tiền phí vận chuyển</p>
                        <p>{formatVND.format(vouchers.ship)}</p>
                    </div>
                    <div className={cx('item-pay')}>
                        <p>Giảm giá phí vận chuyển</p>
                        <p>{formatVND.format(vouchers.ship)}</p>
                    </div>
                    <div className={cx('item-total')}>
                        <p>Tổng thanh toán</p>
                        <p>{formatVND.format(totalPay)}</p>
                    </div>
                </div>
            </div>
            <div className={cx('buy-submit')}>
                <div className={cx('buys-container')}>
                    <div className={cx('info-total')}>
                        <p>Tổng thanh toán</p>
                        <h6>{formatVND.format(totalPay)}</h6>
                    </div>
                    <button onClick={handleOrders}>{!!statePay ? 'Đang thanh toán...' : 'Đặt hàng'}</button>
                </div>
            </div>
        </div>
    );
}

export default Orders;
