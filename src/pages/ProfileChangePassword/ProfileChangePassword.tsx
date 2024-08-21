import classNames from 'classnames/bind';
import styles from './ProfileChangePassword.module.scss';
import { LayoutProfile } from '../../components/Layout/LayoutProfile';
import FormChangePass from './FormChangePass';
import { HiMenu } from 'react-icons/hi';
import { isMenuMobile } from '../../store';
import { useSetRecoilState } from 'recoil';

const cx = classNames.bind(styles);

function ProfileChangePassword() {
    const setState = useSetRecoilState(isMenuMobile);

    return (
        <LayoutProfile>
            <div className={cx('profile-changepass')}>
                <div className={cx('my-pass')}>
                    <div className={cx('header')}>
                        <p className={cx('heading')}>
                            <span onClick={() => setState(true)} className={cx('back-btn-profile')}>
                                <HiMenu />
                            </span>
                            <span>Thay Đổi Mật Khẩu</span>
                        </p>
                    </div>
                    <div className={cx('contents')}>
                        <FormChangePass />
                    </div>
                </div>
            </div>
        </LayoutProfile>
    );
}

export default ProfileChangePassword;
