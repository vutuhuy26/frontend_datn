import { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { SiAdguard } from 'react-icons/si';
import styles from './ProfileBanks.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';

const cx = classNames.bind(styles);

type TForm = {
    cardNumber: string;
    endDate: string;
    cvvCode: string;
    fullName: string;
    address: string;
    codeBC: string;
};

type _T_Props = {
    visible: boolean;
    setIsVisible: (visible: boolean) => void;
};

function FormAdCredit(props: _T_Props) {
    const cardRef = useRef<any>();
    const dateRef = useRef<any>();
    const cvvRef = useRef<any>();
    const fullNameRef = useRef<any>();
    const addressRef = useRef<any>();
    const codeBCRef = useRef<any>();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TForm>();

    const onSubmit: SubmitHandler<TForm> = (data: TForm) => {};

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

    useEffect(() => {
        if (errors.cardNumber?.ref) {
            cardRef.current = errors.cardNumber.ref;
            handleErrorInput(errors.cardNumber.ref as HTMLInputElement);
        } else {
            if (cardRef.current) {
                handleClearErrorInput(cardRef.current);
            }
        }

        if (errors.endDate?.ref) {
            dateRef.current = errors.endDate.ref;
            handleErrorInput(errors.endDate.ref as HTMLInputElement);
        } else {
            if (dateRef.current) {
                handleClearErrorInput(dateRef.current);
            }
        }

        if (errors.fullName?.ref) {
            fullNameRef.current = errors.fullName.ref;
            handleErrorInput(errors.fullName.ref as HTMLInputElement);
        } else {
            if (fullNameRef.current) {
                handleClearErrorInput(fullNameRef.current);
            }
        }

        if (errors.cvvCode?.ref) {
            cvvRef.current = errors.cvvCode.ref;
            handleErrorInput(errors.cvvCode.ref as HTMLInputElement);
        } else {
            if (cvvRef.current) {
                handleClearErrorInput(cvvRef.current);
            }
        }

        if (errors.address?.ref) {
            addressRef.current = errors.address.ref;
            handleErrorInput(errors.address.ref as HTMLInputElement);
        } else {
            if (addressRef.current) {
                handleClearErrorInput(addressRef.current);
            }
        }

        if (errors.codeBC?.ref) {
            codeBCRef.current = errors.codeBC.ref;
            handleErrorInput(errors.codeBC.ref as HTMLInputElement);
        } else {
            if (codeBCRef.current) {
                handleClearErrorInput(codeBCRef.current);
            }
        }
    }, [errors.cardNumber, errors.endDate, errors.codeBC, errors.cvvCode, errors.fullName, errors.address]);

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
                <h3 className={cx('heading-form-add')}>Thêm thẻ</h3>
                <div className={cx('description')}>
                    <p className={cx('guards-icon')}>
                        <SiAdguard />
                    </p>
                    <div className={cx('text-description')}>
                        <p>Thông tin thẻ của bạn được bảo mật.</p>
                        <p className={cx('sub-text')}>
                            Chúng tôi hợp tác với CyberSource để đảm bảo thông tin thẻ của bạn được an toàn và bảo mật
                            tuyệt đối. Shopee sẽ không được cấp quyền truy cập vào thông tin thẻ của bạn.
                        </p>
                    </div>
                </div>
                <div className={cx('detail-card')}>
                    <form onSubmit={handleSubmit(onSubmit)} className={cx('form-container')}>
                        <div className={cx('form-wrapper')}>
                            <div className={cx('form-item')}>
                                <label htmlFor="cardNumber">Số thẻ: </label>
                                <input
                                    id="cardNumber"
                                    type="text"
                                    {...register('cardNumber', { required: true, minLength: 1 })}
                                    placeholder="Your name..."
                                    onInput={(e) => handleFocus(e.target as HTMLInputElement)}
                                    onBlur={(e) => handleBlur(e.target)}
                                />
                                {errors.cardNumber && <p className={cx('error-field')}>This field is required!</p>}
                            </div>
                            <div className={cx('form-item')}>
                                <label htmlFor="endDate">Ngày hết hạn: </label>
                                <input
                                    id="endDate"
                                    type="text"
                                    {...register('endDate', { required: true, minLength: 1 })}
                                    placeholder="Your name..."
                                    onInput={(e) => handleFocus(e.target as HTMLInputElement)}
                                    onBlur={(e) => handleBlur(e.target)}
                                />
                                {errors.endDate && <p className={cx('error-field')}>This field is required!</p>}
                            </div>
                            <div className={cx('form-item')}>
                                <label htmlFor="cvvCode">Mã CVV: </label>
                                <input
                                    id="cvvCode"
                                    type="text"
                                    {...register('cvvCode', { required: true, minLength: 1 })}
                                    placeholder="Your name..."
                                    onInput={(e) => handleFocus(e.target as HTMLInputElement)}
                                    onBlur={(e) => handleBlur(e.target)}
                                />
                                {errors.cvvCode && <p className={cx('error-field')}>This field is required!</p>}
                            </div>
                            <div className={cx('form-item')}>
                                <label htmlFor="fullName">Họ và tên chủ thẻ: </label>
                                <input
                                    id="fullName"
                                    type="text"
                                    {...register('fullName', { required: true, minLength: 1 })}
                                    placeholder="Your name..."
                                    onInput={(e) => handleFocus(e.target as HTMLInputElement)}
                                    onBlur={(e) => handleBlur(e.target)}
                                />
                                {errors.fullName && <p className={cx('error-field')}>This field is required!</p>}
                            </div>
                            <div className={cx('form-item')}>
                                <label htmlFor="address">Địa chỉ: </label>
                                <input
                                    id="address"
                                    type="text"
                                    {...register('address', { required: true, minLength: 1 })}
                                    placeholder="Your name..."
                                    onInput={(e) => handleFocus(e.target as HTMLInputElement)}
                                    onBlur={(e) => handleBlur(e.target)}
                                />
                                {errors.address && <p className={cx('error-field')}>This field is required!</p>}
                            </div>
                            <div className={cx('form-item')}>
                                <label htmlFor="codeBC">Mã bưu chính: </label>
                                <input
                                    id="codeBC"
                                    type="text"
                                    {...register('codeBC', { required: true, minLength: 1 })}
                                    placeholder="Your name..."
                                    onInput={(e) => handleFocus(e.target as HTMLInputElement)}
                                    onBlur={(e) => handleBlur(e.target)}
                                />
                                {errors.codeBC && <p className={cx('error-field')}>This field is required!</p>}
                            </div>
                        </div>

                        <div className={cx('form-submit')}>
                            <button
                                onClick={() => {
                                    reset();
                                    props.setIsVisible(false);
                                }}
                                type="button"
                                className={cx('btn-back')}
                            >
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

export default FormAdCredit;
