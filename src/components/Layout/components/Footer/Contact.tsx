import classNames from 'classnames/bind';
import { MdLocationPin, MdMail } from 'react-icons/md';
import { AiFillFacebook, AiFillGithub } from 'react-icons/ai';
import { RiPhoneFill } from 'react-icons/ri';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Contact() {
    return (
        <div>
            <h2 className={cx('heading-nav')}>thông tin liên hệ</h2>
            <div className={cx('wrap-item')}>
                <div className={cx('item-contact')}>
                    <span>
                        <MdLocationPin color="orange" size="2.2rem" />
                    </span>
                    <a href="#abc">72 Đường thiếu em, Quận ế, Hà Nội</a>
                </div>
                <div className={cx('item-contact')}>
                    <span>
                        <RiPhoneFill color="orange" size="2.2rem" />
                    </span>
                    <a href="tel:0999999999">0999999999</a>
                </div>
                <div className={cx('item-contact')}>
                    <span>
                        <MdMail color="orange" size="2.2rem" />
                    </span>
                    <a href="mailto:vutuhuy260@gmail.com">vutuhuy260@gmail.com</a>
                </div>
                <div className={cx('item-contact')}>
                    <span>
                        <AiFillFacebook color="orange" size="2.2rem" />
                    </span>
                    <a href="https://facebook.com">Facebook</a>
                </div>
                <div className={cx('item-contact')}>
                    <span>
                        <AiFillGithub color="orange" size="2.2rem" />
                    </span>
                    <a href="https://github.com">Github</a>
                </div>
            </div>
        </div>
    );
}

export default Contact;
