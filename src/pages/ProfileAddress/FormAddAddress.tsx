import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ProfileAddress.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSessionContext } from '../../context/SessionContext';
import { ApiService } from '../../axios/ApiService';
import { useConfirmToast } from '../../context/ConfirmAndToastContext';
import { Address, TPostCreateAddress, TPostUpdateAddress } from '../../models';
import { useAppContext } from '../../providers/AppProvider';
import { socketContext } from '../../context/SocketContext';

const cx = classNames.bind(styles);

type TForm = {
    name: string;
    phone: string;
    city: string;
    detail: string;
};

type _T_Props = {
    visible: boolean;
    setIsVisible: (visible: boolean) => void;
    data: Address | undefined;
    type: string;
    setType: (action: string) => void;
    setData: Function;
};

function FormAddAddress(props: _T_Props) {
    const nameRef = useRef<any>();
    const phoneRef = useRef<any>();
    const cityRef = useRef<any>();
    const detailRef = useRef<any>();
    const message = useConfirmToast();
    const [values] = useSessionContext();
    const [typeAddress, setTypeAddress] = useState<string>('home');
    const apiService = new ApiService();
    const { isConnected } = useAppContext();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<TForm>();

    const onSubmit: SubmitHandler<TForm> = (data: TForm) => {
        if (props.type === 'add') {
            const dataPost: TPostCreateAddress = {
                full_name: data.name,
                customer_id: values.user?.id ?? 0,
                phone_number: data.phone,
                main_address: data.city,
                detail_address: data.detail,
                type: typeAddress,
            };
            apiService.address
                .createAddress(dataPost, values.user?.token ?? '')
                .then((res) => {
                    if (res.message === 'success') {
                        handleCloseForm();

                        message?.toast?.current?.show({
                            severity: 'success',
                            summary: 'Thành công',
                            detail: 'Thêm thành công',
                            life: 3000,
                        });

                        if (isConnected) {
                            socketContext.emit('create-address', {
                                id: values.user?.id,
                                status: 'success',
                            });
                        }
                    }
                })
                .catch((_) => {
                    message?.toast?.current?.show({
                        severity: 'error',
                        summary: 'Có lỗi',
                        detail: 'Xảy ra lỗi!!!',
                        life: 3000,
                    });
                });
        } else if (props.type === 'update') {
            const dataPost: TPostUpdateAddress = {
                full_name: data.name,
                id: props.data?.id ?? 0,
                phone_number: data.phone,
                main_address: data.city,
                detail_address: data.detail,
                type: typeAddress,
            };
            apiService.address
                .updateAddressById(values.user?.id.toString() ?? '', dataPost, values.user?.token ?? '')
                .then((res) => {
                    if (res.message === 'success') {
                        handleCloseForm();

                        message?.toast?.current?.show({
                            severity: 'success',
                            summary: 'Thành công',
                            detail: 'Cập nhật thành công',
                            life: 3000,
                        });

                        if (isConnected) {
                            socketContext.emit('update-address', {
                                id: values.user?.id,
                                status: 'success',
                            });
                        }
                    }
                })
                .catch((_) => {
                    message?.toast?.current?.show({
                        severity: 'error',
                        summary: 'Có lỗi',
                        detail: 'Xảy ra lỗi!!!',
                        life: 3000,
                    });
                });
        }
    };

    useEffect(() => {
        if (props.type === 'update') {
            setValue('name', props.data?.full_name as string);
            setValue('city', props.data?.main_address as string);
            setValue('phone', props.data?.phone_number as string);
            setValue('detail', props.data?.detail_address as string);
            setTypeAddress(props.data?.type as string);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.data]);

    useEffect(() => {
        if (errors.name?.ref) {
            nameRef.current = errors.name.ref;
            handleErrorInput(errors.name.ref as HTMLInputElement);
        } else {
            if (nameRef.current) {
                handleClearErrorInput(nameRef.current);
            }
        }

        if (errors.phone?.ref) {
            phoneRef.current = errors.phone.ref;
            handleErrorInput(errors.phone.ref as HTMLInputElement);
        } else {
            if (phoneRef.current) {
                handleClearErrorInput(phoneRef.current);
            }
        }

        if (errors.city?.ref) {
            cityRef.current = errors.city.ref;
            handleErrorInput(errors.city.ref as HTMLInputElement);
        } else {
            if (cityRef.current) {
                handleClearErrorInput(cityRef.current);
            }
        }

        if (errors.detail?.ref) {
            detailRef.current = errors.detail.ref;
            handleErrorInput(errors.detail.ref as HTMLInputElement);
        } else {
            if (detailRef.current) {
                handleClearErrorInput(detailRef.current);
            }
        }
    }, [errors.name, errors.phone, errors.city, errors.detail]);

    const handleCloseForm = () => {
        reset();
        props.setIsVisible(false);
        props.setData({});
        props.setType('');
    };

    const handleErrorInput = (ele: HTMLInputElement) => {
        if (ele) {
            ele.style.border = '1px solid red';
        }
    };

    const handleClearErrorInput = (ele: HTMLInputElement) => {
        if (ele) {
            ele.style.border = '1px solid dodgerblue';
        }
    };

    const handleFocus = (ele: HTMLInputElement) => {
        if (ele) {
            ele.style.border = '1px solid dodgerblue';
        }
    };

    const handleBlur = (ele: HTMLInputElement) => {
        if (ele) {
            ele.style.border = '1px solid #d7d7d7';
        }
    };

    return (
        <>
            <div
                className={cx('mask')}
                style={{
                    visibility: props.visible ? 'visible' : 'hidden',
                }}
            ></div>
            <div
                className={cx('form-contents')}
                style={{
                    transform: props.visible ? 'translateX(-50%) scale(1)' : 'translateX(-50%) scale(0)',
                }}
            >
                <h3 className={cx('heading-form-add')}>Thêm địa chỉ</h3>

                <div className={cx('detail-card')}>
                    <form onSubmit={handleSubmit(onSubmit)} className={cx('form-container')}>
                        <div className={cx('form-wrapper')}>
                            <div className={cx('form-item')}>
                                <label htmlFor="name">Họ Và Tên: </label>
                                <input
                                    id="name"
                                    type="text"
                                    {...register('name', { required: true, minLength: 1 })}
                                    placeholder="Your name..."
                                    onInput={(e) => handleFocus(e.target as HTMLInputElement)}
                                    onBlur={(e) => handleBlur(e.target)}
                                />
                                {errors.name && <p className={cx('error-field')}>This field is required!</p>}
                            </div>
                            <div className={cx('form-item')}>
                                <label htmlFor="phone">Số điện thoại: </label>
                                <input
                                    id="phone"
                                    type="text"
                                    {...register('phone', { required: true, minLength: 1 })}
                                    placeholder="Your name..."
                                    onInput={(e) => handleFocus(e.target as HTMLInputElement)}
                                    onBlur={(e) => handleBlur(e.target)}
                                />
                                {errors.phone && <p className={cx('error-field')}>This field is required!</p>}
                            </div>
                            <div className={cx('form-item')}>
                                <label htmlFor="city">Tỉnh/Thành Phố/, Quận/Huyện, Phường/Xã: </label>
                                <input
                                    id="city"
                                    type="text"
                                    {...register('city', { required: true, minLength: 1 })}
                                    placeholder="Your name..."
                                    onInput={(e) => handleFocus(e.target as HTMLInputElement)}
                                    onBlur={(e) => handleBlur(e.target)}
                                />
                                {errors.city && <p className={cx('error-field')}>This field is required!</p>}
                            </div>
                            <div className={cx('form-item')}>
                                <label htmlFor="detail">Địa chỉ cụ thể: </label>
                                <input
                                    id="detail"
                                    type="text"
                                    {...register('detail', { required: true, minLength: 1 })}
                                    placeholder="Your name..."
                                    onInput={(e) => handleFocus(e.target as HTMLInputElement)}
                                    onBlur={(e) => handleBlur(e.target)}
                                />
                                {errors.detail && <p className={cx('error-field')}>This field is required!</p>}
                            </div>
                        </div>

                        <div className={cx('type-address')}>
                            <h3 className={cx('type-address-heading')}>Loại địa chỉ</h3>
                            <div className={cx('type-item')}>
                                <button
                                    type="button"
                                    onClick={() => setTypeAddress('home')}
                                    style={{
                                        borderColor: typeAddress === 'home' ? 'blue' : '#d7d7d7',
                                    }}
                                >
                                    Nhà Riêng
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setTypeAddress('office')}
                                    style={{
                                        borderColor: typeAddress === 'office' ? 'blue' : '#d7d7d7',
                                    }}
                                >
                                    Văn Phòng
                                </button>
                            </div>
                            <div className={cx('add-default-type')}>
                                <input type="checkbox" id="address-type" />
                                <label htmlFor="address-type">Đặt làm địa chỉ mặc định</label>
                            </div>
                        </div>
                        <div className={cx('form-submit')}>
                            <button onClick={handleCloseForm} type="button" className={cx('btn-back')}>
                                Trở lại
                            </button>
                            <button type="submit">SUBMIT</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default FormAddAddress;
