import { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import logo from '../../../../assets/images/dark.png';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function ActionFooter() {
    const [value, setValue] = useState<string>('');
    const [isErr, setIsErr] = useState<boolean>(false);
    const ref = useRef<HTMLInputElement>(null);

    const handleSubmit = () => {
        if (value.trim().length > 0) {
            alert('Cảm ơn bạn để lại góp ý cho chúng tôi! Chúc bạn một ngày tốt lành <3');
        } else {
            handleError();
        }
    };

    const handleError = () => {
        setIsErr(true);
        if (ref.current) {
            ref.current.style.border = '1px solid red';
        }
    };

    const handleClearError = () => {
        setIsErr(false);
        if (ref.current) {
            ref.current.style.border = '1px solid #30b5b2';
        }
    };

    return (
        <div className={cx('wrapper-footer')}>
            <div className={cx('logo-footer')}>
                <img src={logo} alt="logo-footer" />
            </div>
            <p className={cx('description-footer')}>
                Mục tiêu của chúng tôi là mang lại những chú thú cưng đẹp và chất lượng nhất trên thị trường!
            </p>
            <div>
                <h5 className={cx('heading-feedback')}>Góp ý với chúng tôi</h5>
                <div>
                    <input
                        ref={ref}
                        type="text"
                        placeholder="Nội dung góp ý..."
                        className={cx('input-feedback')}
                        value={value}
                        onInput={handleClearError}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                    />
                    <button onClick={handleSubmit} className={cx('btn-submit')}>
                        Gửi
                    </button>
                    {isErr && (
                        <p style={{ color: 'red', fontSize: '12px', textAlign: 'left', marginLeft: '18px' }}>
                            Vui lòng nhập trường này!
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ActionFooter;
