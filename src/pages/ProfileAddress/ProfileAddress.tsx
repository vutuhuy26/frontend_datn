import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ProfileAddress.module.scss';
import { LayoutProfile } from '../../components/Layout/LayoutProfile';
import { IoAdd } from 'react-icons/io5';
import { AddressIcon } from '../../assets/svg';
import FormAddAddress from './FormAddAddress';
import { HiMenu } from 'react-icons/hi';
import { useSetRecoilState } from 'recoil';
import { isMenuMobile } from '../../store';
import { ApiService } from '../../axios/ApiService';
import { useSessionContext } from '../../context/SessionContext';
import { confirmDialog } from 'primereact/confirmdialog';
import { useConfirmToast } from '../../context/ConfirmAndToastContext';
import { Address, T_ProfileAddress } from '../../models';
import { useAppContext } from '../../providers/AppProvider';
import { socketContext } from '../../context/SocketContext';

const cx = classNames.bind(styles);

function ProfileAddress() {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [typeAction, setTypeAction] = useState<string>('');
    const [dataAddress, setDataAddress] = useState<Address>();
    const [init, setInit] = useState<boolean>(false);
    const setState = useSetRecoilState(isMenuMobile);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [values] = useSessionContext();
    const message = useConfirmToast();
    const apiService = new ApiService();
    const { isConnected } = useAppContext();

    useEffect(() => {
        if (isConnected) {
            socketContext.on('create-address-give', (_) => {
                if (values.isAuth) {
                    apiService.address
                        .getAddressesById(values.user?.id.toString() ?? '', values.user?.token ?? '')
                        .then((res: T_ProfileAddress) => {
                            if (res.message === 'success') {
                                setAddresses((prev: Address[]) => {
                                    return [...prev, res.data[res.data.length - 1]];
                                });
                            }
                        })
                        .catch((err) => console.error(err));
                }
            });

            socketContext.on('update-address-give', (_) => {
                if (values.isAuth) {
                    apiService.address
                        .getAddressesById(values.user?.id.toString() ?? '', values.user?.token ?? '')
                        .then((res: T_ProfileAddress) => {
                            if (res.message === 'success') {
                                setAddresses(res.data);
                            }
                        })
                        .catch((err) => console.error(err));
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (init && values.isAuth) {
            apiService.address
                .getAddressesById(values.user?.id.toString() ?? '', values.user?.token ?? '')
                .then((res: T_ProfileAddress) => {
                    if (res.message === 'success') {
                        setAddresses((prev: Address[]) => {
                            console.log('prev: ' + [...prev, ...res.data]);

                            return [...prev, ...res.data];
                        });
                    }
                })
                .catch((err) => console.error(err));
        }

        setInit(true);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [init]);

    const confirm = (value: string) => {
        confirmDialog({
            message: 'Bạn có chắc chắn muốn xóa không?',
            position: 'top',
            header: 'Xóa sản phẩm',
            acceptLabel: 'Đồng ý',
            rejectLabel: 'Hủy bỏ',
            icon: 'pi pi-exclamation-triangle',
            accept() {
                apiService.address
                    .deleteAddressById(value, values.user?.token ?? '')
                    .then((res: { message: string; statusCode: number }) => {
                        if (res.message === 'success') {
                            message?.toast?.current?.show({
                                severity: 'success',
                                summary: 'Thành công',
                                detail: 'Đã xóa thành công',
                                life: 3000,
                            });

                            apiService.address
                                .getAddressesById(values.user?.id.toString() ?? '', values.user?.token ?? '')
                                .then((res: T_ProfileAddress) => {
                                    if (res.message === 'success') {
                                        setAddresses(res.data);
                                    }
                                })
                                .catch((err) => console.error(err));
                        } else {
                            message?.toast?.current?.show({
                                severity: 'error',
                                summary: 'Có lỗi',
                                detail: 'Xảy ra lỗi!!!',
                                life: 3000,
                            });
                        }
                    });

                // setData((prev) => prev.filter((item) => item.id !== value.id));
            },
        });
    };

    return (
        <LayoutProfile>
            <div className={cx('profile-address')}>
                <div className={cx('my-address')}>
                    <FormAddAddress
                        visible={isVisible}
                        setIsVisible={setIsVisible}
                        data={dataAddress}
                        setData={setDataAddress}
                        type={typeAction}
                        setType={setTypeAction}
                    />
                    <div className={cx('header')}>
                        <p className={cx('heading')}>
                            <span onClick={() => setState(true)} className={cx('back-btn-profile')}>
                                <HiMenu />
                            </span>
                            <span>Địa Chỉ Của Tôi</span>
                        </p>
                        <p
                            onClick={() => {
                                setTypeAction('add');
                                setIsVisible(true);
                            }}
                            className={cx('btn-credit')}
                        >
                            <IoAdd />
                            Thêm Địa Chỉ Mới
                        </p>
                        <p
                            onClick={() => {
                                setTypeAction('add');
                                setIsVisible(true);
                            }}
                            className={cx('btn-credit-mobile')}
                        >
                            <IoAdd />
                            Thêm
                        </p>
                    </div>
                    <div className={cx('contents')}>
                        {addresses.length > 0 ? (
                            <div className={cx('address-item')}>
                                <h5>Địa chỉ</h5>
                                {addresses.map((item) => (
                                    <div className={cx('wrapper-item')} key={item.id}>
                                        <div className={cx('infos')}>
                                            <h3>
                                                {item.full_name} | <span>(+84) {item.phone_number.slice(1)}</span>
                                            </h3>
                                            <p>{item.detail_address}</p>
                                            <p>{item.main_address}</p>
                                            <button>Mặc định</button>
                                        </div>
                                        <div className={cx('actions')}>
                                            <p
                                                onClick={() => {
                                                    setTypeAction('update');
                                                    setDataAddress(item);
                                                    setIsVisible(true);
                                                }}
                                            >
                                                Cập nhật
                                            </p>
                                            <p onClick={() => confirm(item.id.toString())}>Xóa</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className={cx('wrapper-icon-empty')}>
                                <div className={cx('address-icon')}>
                                    <AddressIcon />
                                    <p>Bạn chưa có địa chỉ!</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </LayoutProfile>
    );
}

export default ProfileAddress;
