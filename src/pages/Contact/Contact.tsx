import classNames from 'classnames/bind';
import styles from './Contact.module.scss';
import { Title } from '../../components/Title';
import logo from '../../assets/images/sleigh-bell.svg';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useRef } from 'react';

const cx = classNames.bind(styles);

type TForm = {
    name: string;
    email: string;
    phone: string;
    description: string;
};

function Contact() {
    const nameRef = useRef<any>();
    const emailRef = useRef<any>();
    const phoneRef = useRef<any>();
    const descriptionRef = useRef<any>();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TForm>();
    const onSubmit: SubmitHandler<TForm> = (data: TForm) => console.log(data);

    const handleErrorInput = (ele: any) => {
        ele.style.border = '1px solid red';
    };

    const handleClearErrorInput = (ele: any) => {
        ele.style.border = '1px solid #d7d7d7';
    };

    useEffect(() => {
        document.title = 'Liên hệ | Petshop chất lượng số 1 Việt Nam!';
        window.scrollTo({
            behavior: 'smooth',
            top: 0,
        });
    }, []);

    useEffect(() => {
        if (errors.name?.ref) {
            nameRef.current = errors.name.ref;
            handleErrorInput(errors.name.ref);
        } else {
            if (nameRef.current) {
                handleClearErrorInput(nameRef.current);
            }
        }

        if (errors.email?.ref) {
            emailRef.current = errors.email.ref;
            handleErrorInput(errors.email.ref);
        } else {
            if (emailRef.current) {
                handleClearErrorInput(emailRef.current);
            }
        }

        if (errors.phone?.ref) {
            phoneRef.current = errors.phone.ref;
            handleErrorInput(errors.phone.ref);
        } else {
            if (phoneRef.current) {
                handleClearErrorInput(phoneRef.current);
            }
        }

        if (errors.description?.ref) {
            descriptionRef.current = errors.description.ref;
            handleErrorInput(errors.description.ref);
        } else {
            if (descriptionRef.current) {
                handleClearErrorInput(descriptionRef.current);
            }
        }
    }, [errors.name, errors.email, errors.phone, errors.description]);

    return (
        <div className={cx('contact')}>
            <div className={cx('banner')}>
                <div className={cx('contents')}>
                    <div className={cx('contact-info')}>
                        <Title logo={logo} title="LIÊN HỆ VỚI CHÚNG TÔI" />
                        <div className={cx('description')}>
                            <p className={cx('description-p')}>
                                Mona Media là công ty thiết kế website cao cấp có tuổi đời 8+ năm trong ngành.
                            </p>
                            <p className={cx('description-p')}>
                                Ngay từ những ngày đầu hoạt động, Mona Media đã chọn cho mình một phân khúc riêng, khác
                                biệt với hàng ngàn công ty thiết kế website trên thị trường: phân khúc của sự hiệu quả.
                            </p>
                            <p className={cx('description-p')}>
                                Những website/phần mềm từ Mona Media luôn được tư vấn, phát triển, tối ưu nhằm mang lại
                                hiệu quả rõ rệt cho hoạt động kinh doanh của doanh nghiệp.
                            </p>
                        </div>
                        <Title logo={logo} title="" />
                    </div>
                    <div className={cx('contact-form')}>
                        <form onSubmit={handleSubmit(onSubmit)} className={cx('form-container')}>
                            <div className={cx('form-item')}>
                                <label htmlFor="name">Họ Và Tên: </label>
                                <input
                                    id="name"
                                    type="text"
                                    {...register('name', { required: true, minLength: 1 })}
                                    placeholder="Your name..."
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
                                        pattern: /^([\w.*-]+@([\w-]+\.)+[\w-]{2,4})?$/,
                                    })}
                                    placeholder="Email..."
                                />
                                {errors.email && <p className={cx('error-field')}>This field is email!</p>}
                            </div>
                            <div className={cx('form-item')}>
                                <label htmlFor="phone">Số Điện Thoại: </label>
                                <input
                                    id="phone"
                                    type="text"
                                    {...register('phone', {
                                        required: true,
                                        pattern: /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/im,
                                    })}
                                    placeholder="Phone number..."
                                />
                                {errors.phone && <p className={cx('error-field')}>This field is phone number!</p>}
                            </div>
                            <div className={cx('form-item')}>
                                <label htmlFor="description">Lời Nhắn: </label>
                                <textarea
                                    {...register('description', { required: true })}
                                    id="description"
                                    placeholder="Nhập lời nhắn..."
                                ></textarea>
                                {errors.description && <p className={cx('error-field')}>This field is required!</p>}
                            </div>
                            <div className={cx('form-submit')}>
                                <button type="submit">GỬI</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
