import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ProfileBanks.module.scss';
import { LayoutProfile } from '../../components/Layout/LayoutProfile';
import { IoAdd } from 'react-icons/io5';
import FormAdCredit from './FormAddCredit';
import FormAdBank from './FormAddBank';
import { HiMenu } from 'react-icons/hi';
import { useSetRecoilState } from 'recoil';
import { isMenuMobile } from '../../store';

const cx = classNames.bind(styles);

function ProfileBanks() {
    const [isVisibleCredit, setIsVisibleCredit] = useState(false);
    const [isVisibleBank, setIsVisibleBank] = useState(false);
    const setState = useSetRecoilState(isMenuMobile);

    return (
        <LayoutProfile>
            <div className={cx('profile-bank')}>
                <div className={cx('credit_bebit-card')}>
                    <FormAdCredit visible={isVisibleCredit} setIsVisible={setIsVisibleCredit} />
                    <FormAdBank visible={isVisibleBank} setIsVisible={setIsVisibleBank} />
                    <div className={cx('header')}>
                        <p className={cx('heading')}>
                            <span onClick={() => setState(true)} className={cx('back-btn-profile')}>
                                <HiMenu />
                            </span>
                            <span>Thẻ Tín Dụng/Ghi Nợ</span>
                        </p>
                        <p onClick={() => setIsVisibleCredit(true)} className={cx('btn-credit')}>
                            <IoAdd />
                            Thêm Thẻ Mới
                        </p>
                        <p onClick={() => setIsVisibleCredit(true)} className={cx('btn-credit-mobile')}>
                            <IoAdd />
                            Thêm
                        </p>
                    </div>
                    <div className={cx('contents')}>
                        <p className={cx('detail-no-credit')}>Bạn chưa liên kết thẻ.</p>
                    </div>
                </div>
                <div className={cx('my-bank')}>
                    <div className={cx('header')}>
                        <p className={cx('heading')}>Tài Khoản Ngân Hàng Của Tôi</p>
                        <p onClick={() => setIsVisibleBank(true)} className={cx('btn-credit')}>
                            <IoAdd />
                            Thêm Tài Khoản Ngân Hàng
                        </p>
                        <p onClick={() => setIsVisibleBank(true)} className={cx('btn-credit-mobile')}>
                            <IoAdd />
                            Thêm
                        </p>
                    </div>
                    <div className={cx('contents')}>
                        <p className={cx('detail-no-credit')}>Bạn chưa có tài khoản ngân hàng.</p>
                    </div>
                </div>
            </div>
        </LayoutProfile>
    );
}

export default ProfileBanks;
