import { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './ProfileChangePassword.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useConfirmToast } from '../../context/ConfirmAndToastContext';
import { ApiService } from '../../axios/ApiService';
import { useSessionContext } from '../../context/SessionContext';

const cx = classNames.bind(styles);

type TForm = {
    prevPass: string;
    newPass: string;
    conNewPass: string;
};

function FormChangePass() {
    const prevPassRef = useRef<any>();
    const newPassRef = useRef<any>();
    const conNewPassRef = useRef<any>();
    const message = useConfirmToast();
    const [values] = useSessionContext();
    const apiService = new ApiService();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TForm>();

    const onSubmit: SubmitHandler<TForm> = (data: TForm) => {
        if (data.newPass !== data.conNewPass) {
            message?.toast?.current?.show({
                severity: 'error',
                summary: 'Có lỗi',
                detail: 'Mật khẩu mới không trùng khớp!',
                life: 1500,
            });
        } else {
            apiService.customer
                .updatePassword(
                    (values.user?.id as number).toString(),
                    {
                        password: data.newPass,
                        oldPassword: data.prevPass,
                    },
                    values.user?.token ?? '',
                )
                .then((res: { message: string; statusCode: number; detail?: string }) => {
                    if (res.message === 'mismatched') {
                        message?.toast?.current?.show({
                            severity: 'error',
                            summary: 'Có lỗi',
                            detail: 'Mật khẩu cũ của bạn chưa chính xác, vui lòng thử lại!',
                            life: 2500,
                        });
                    } else if (res.message === 'success') {
                        message?.toast?.current?.show({
                            severity: 'success',
                            summary: 'Thành công',
                            detail: 'Thay đổi mật khẩu thành công!',
                            life: 2000,
                        });

                        reset();
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
        if (errors.prevPass?.ref) {
            prevPassRef.current = errors.prevPass.ref;
            handleErrorInput(errors.prevPass.ref as HTMLInputElement);
        } else {
            if (prevPassRef.current) {
                handleClearErrorInput(prevPassRef.current);
            }
        }

        if (errors.newPass?.ref) {
            newPassRef.current = errors.newPass.ref;
            handleErrorInput(errors.newPass.ref as HTMLInputElement);
        } else {
            if (newPassRef.current) {
                handleClearErrorInput(newPassRef.current);
            }
        }

        if (errors.conNewPass?.ref) {
            conNewPassRef.current = errors.conNewPass.ref;
            handleErrorInput(errors.conNewPass.ref as HTMLInputElement);
        } else {
            if (conNewPassRef.current) {
                handleClearErrorInput(conNewPassRef.current);
            }
        }
    }, [errors.prevPass, errors.newPass, errors.conNewPass]);

    return (
        <div className={cx('form-container')}>
            <form onSubmit={handleSubmit(onSubmit)} className={cx('form-container')}>
                <div className={cx('form-wrapper')}>
                    <div className={cx('form-item')}>
                        <label htmlFor="prevPass">Nhập mật khẩu cũ: </label>
                        <input
                            id="prevPass"
                            type="text"
                            {...register('prevPass', { required: true, minLength: 1 })}
                            placeholder="Your name..."
                            onInput={(e) => handleFocus(e.target as HTMLInputElement)}
                            onBlur={(e) => handleBlur(e.target)}
                        />
                        {errors.prevPass && <p className={cx('error-field')}>This field is required!</p>}
                    </div>
                    <div className={cx('form-item')}>
                        <label htmlFor="newPass">Mật khẩu mới: </label>
                        <input
                            id="newPass"
                            type="text"
                            {...register('newPass', { required: true, minLength: 1 })}
                            placeholder="Your name..."
                            onInput={(e) => handleFocus(e.target as HTMLInputElement)}
                            onBlur={(e) => handleBlur(e.target)}
                        />
                        {errors.newPass && <p className={cx('error-field')}>This field is required!</p>}
                    </div>
                    <div className={cx('form-item')}>
                        <label htmlFor="conNewPass">Nhập lại mật khẩu: </label>
                        <input
                            id="conNewPass"
                            type="text"
                            {...register('conNewPass', { required: true, minLength: 1 })}
                            placeholder="Your name..."
                            onInput={(e) => handleFocus(e.target as HTMLInputElement)}
                            onBlur={(e) => handleBlur(e.target)}
                        />
                        {errors.conNewPass && <p className={cx('error-field')}>This field is required!</p>}
                    </div>
                </div>
                <div className={cx('form-submit')}>
                    <button type="submit">SUBMIT</button>
                </div>
            </form>
        </div>
    );
}

export default FormChangePass;
