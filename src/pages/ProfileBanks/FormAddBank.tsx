import { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './ProfileBanks.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';

const cx = classNames.bind(styles);

type TForm = {
    phoneNumber: string;
    verifyNumber: string;
};

type _T_Props = {
    visible: boolean;
    setIsVisible: (visible: boolean) => void;
};

function FormAdBank(props: _T_Props) {
    const phoneRef = useRef<any>();
    const codeRef = useRef<any>();

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
        if (errors.phoneNumber?.ref) {
            phoneRef.current = errors.phoneNumber.ref;
            handleErrorInput(errors.phoneNumber.ref as HTMLInputElement);
        } else {
            if (phoneRef.current) {
                handleClearErrorInput(phoneRef.current);
            }
        }

        if (errors.verifyNumber?.ref) {
            codeRef.current = errors.verifyNumber.ref;
            handleErrorInput(errors.verifyNumber.ref as HTMLInputElement);
        } else {
            if (codeRef.current) {
                handleClearErrorInput(codeRef.current);
            }
        }
    }, [errors.phoneNumber, errors.verifyNumber]);

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
                <h3 className={cx('heading-form-add')}>Thêm số điện thoại</h3>

                <div className={cx('detail-card')}>
                    <form onSubmit={handleSubmit(onSubmit)} className={cx('form-container')}>
                        <div className={cx('form-wrapper')}>
                            <div className={cx('form-item')}>
                                <label htmlFor="phoneNumber">Số điện thoại: </label>
                                <div className={cx('wrapper-bank-phone')}>
                                    <input
                                        id="phoneNumber"
                                        type="text"
                                        {...register('phoneNumber', { required: true, minLength: 1 })}
                                        placeholder="Your name..."
                                        onInput={(e) => handleFocus(e.target as HTMLInputElement)}
                                        onBlur={(e) => handleBlur(e.target)}
                                    />
                                    <button type="button" className={cx('verify-phone')}>
                                        Gửi mã xác minh
                                    </button>
                                    <button type="button" className={cx('verify-phone-mobile')}>
                                        Mã xác minh
                                    </button>
                                </div>
                                {errors.phoneNumber && <p className={cx('error-field')}>This field is required!</p>}
                            </div>
                            <div className={cx('form-item')}>
                                <label htmlFor="verifyNumber">Mã xác minh: </label>
                                <input
                                    id="verifyNumber"
                                    type="text"
                                    {...register('verifyNumber', { required: true, minLength: 1 })}
                                    placeholder="Your name..."
                                    onInput={(e) => handleFocus(e.target as HTMLInputElement)}
                                    onBlur={(e) => handleBlur(e.target)}
                                />
                                {errors.verifyNumber && <p className={cx('error-field')}>This field is required!</p>}
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

export default FormAdBank;
