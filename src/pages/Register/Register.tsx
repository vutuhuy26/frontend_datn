import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import logo from '../../assets/images/logo-petshop.jpg';
import { Link, useNavigate } from 'react-router-dom';
import routesConfig from '../../config/routes';
import { useEffect, useRef, useState } from 'react';
import { ApiService } from '../../axios/ApiService';
import { useConfirmToast } from '../../context/ConfirmAndToastContext';
import { useSessionContext } from '../../context/SessionContext';
import { T_Auth } from '../../models';

const cx = classNames.bind(styles);

type TForm = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

function Register() {
    const nameRef = useRef<any>();
    const emailRef = useRef<any>();
    const passwordRef = useRef<any>();
    const confirmPasswordRef = useRef<any>();
    const [checkPassword, setCheckPassword] = useState<boolean>(false);
    const apiService = new ApiService();
    const [, setStateContext] = useSessionContext();
    const message = useConfirmToast();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TForm>();

    const onSubmit: SubmitHandler<TForm> = (data: TForm) => {
        if (data.password !== data.confirmPassword) {
            handleErrorInput(confirmPasswordRef.current as HTMLInputElement);
            setCheckPassword(true);
        } else {
            handleClearErrorInput(confirmPasswordRef.current as HTMLInputElement);
            setCheckPassword(false);

            apiService.auth
                .register({
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    confirm_password: data.confirmPassword,
                })
                .then((res: T_Auth) => {
                    if (res.message === 'success') {
                        console.log('DATA REGISTER: ' + res.data);

                        setStateContext({
                            isAuth: true,
                            user: {
                                id: res.data.id,
                                name: res.data.name,
                                email: res.data.email,
                                phone: res.data.phone_number,
                                token: res.data.access_token,
                                avatar: res.data.avatar,
                                gender: res.data.gender,
                                birthdate: res.data.birth_day,
                            },
                        });

                        message?.toast?.current?.show({
                            severity: 'success',
                            summary: 'Thành công',
                            detail: 'Đăng ký thành công!',
                            life: 3000,
                        });

                        setTimeout(() => {
                            navigate(routesConfig.home);
                        }, 2000);
                    } else {
                        message?.toast?.current?.show({
                            severity: 'warn',
                            summary: 'Có lỗi',
                            detail: res.message,
                            life: 3000,
                        });
                    }
                })
                .catch((_) => {
                    message?.toast?.current?.show({
                        severity: 'error',
                        summary: 'Thất bại',
                        detail: 'Có lỗi, vui lòng thử lại!',
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
        if (errors.name?.ref) {
            nameRef.current = errors.name.ref;
            handleErrorInput(errors.name.ref as HTMLInputElement);
        } else {
            if (nameRef.current) {
                handleClearErrorInput(nameRef.current);
            }
        }

        if (errors.email?.ref) {
            emailRef.current = errors.email.ref;
            handleErrorInput(errors.email.ref as HTMLInputElement);
        } else {
            if (emailRef.current) {
                handleClearErrorInput(emailRef.current);
            }
        }

        if (errors.password?.ref) {
            passwordRef.current = errors.password.ref;
            handleErrorInput(errors.password.ref as HTMLInputElement);
        } else {
            if (passwordRef.current) {
                handleClearErrorInput(passwordRef.current);
            }
        }

        if (errors.confirmPassword?.ref) {
            confirmPasswordRef.current = errors.confirmPassword.ref;
            handleErrorInput(errors.confirmPassword.ref as HTMLInputElement);
        } else {
            if (confirmPasswordRef.current) {
                handleClearErrorInput(confirmPasswordRef.current);
            }
        }
    }, [errors.name, errors.password, errors.confirmPassword, errors.email]);

    return (
        <div className={cx('login')}>
            <div className={cx('contents')}>
                <div className={cx('logo')}>
                    <img src={logo} alt="logo shop" />
                </div>
                <div className={cx('heading')}>
                    <h3>Sign up to PetShop</h3>
                    <p>Vui lòng nhập đầy đủ thông tin của bạn</p>
                </div>
                <div className={cx('login-form')}>
                    <form onSubmit={handleSubmit(onSubmit)} className={cx('form-container')}>
                        <div className={cx('form-item')}>
                            <label htmlFor="name">Tài khoản: </label>
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
                            <label htmlFor="email">Email: </label>
                            <input
                                id="email"
                                type="text"
                                {...register('email', {
                                    required: true,
                                    minLength: 1,
                                    pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                })}
                                placeholder="Your email..."
                                onInput={(e) => handleFocus(e.target as HTMLInputElement)}
                                onBlur={(e) => handleBlur(e.target)}
                            />
                            {errors.email && <p className={cx('error-field')}>This field is required!</p>}
                        </div>
                        <div className={cx('form-item')}>
                            <label htmlFor="password">Mật khẩu: </label>
                            <input
                                id="password"
                                type="text"
                                {...register('password', {
                                    required: true,
                                    pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                })}
                                placeholder="Password..."
                                onInput={(e) => handleFocus(e.target as HTMLInputElement)}
                                onBlur={(e) => handleBlur(e.target)}
                            />
                            {errors.password && (
                                <p className={cx('error-field')}>
                                    Password Minimum eight characters, at least one letter, one number and one special
                                    character!
                                </p>
                            )}
                        </div>
                        <div className={cx('form-item')}>
                            <label htmlFor="confirmPassword">Nhập lại mật khẩu: </label>
                            <input
                                id="confirmPassword"
                                type="text"
                                {...register('confirmPassword', {
                                    required: true,
                                })}
                                placeholder="Confirm password..."
                                onInput={(e) => handleFocus(e.target as HTMLInputElement)}
                                onBlur={(e) => handleBlur(e.target)}
                            />
                            {errors.confirmPassword && <p className={cx('error-field')}>This field is required!</p>}
                            {checkPassword && <p className={cx('error-field')}>Mật khẩu không khớp!</p>}
                        </div>
                        <div className={cx('form-submit')}>
                            <button type="submit">ĐĂNG KÝ</button>
                            <p>
                                Bạn đã có tài khoản. <Link to={routesConfig.login}>Đăng nhập</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
