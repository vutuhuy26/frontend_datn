import classNames from 'classnames/bind';
import styles from './ProfileVouchers.module.scss';
import { LayoutProfile } from '../../components/Layout/LayoutProfile';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { useSetRecoilState } from 'recoil';
import { isMenuMobile } from '../../store';

const cx = classNames.bind(styles);

function ProfileVouchers() {
    const [searchText, setSearchText] = useState<string>('');
    const setState = useSetRecoilState(isMenuMobile);

    return (
        <LayoutProfile>
            <div className={cx('profile-voucher')}>
                <div className={cx('all-vouchers')}>
                    <div className={cx('header')}>
                        <p className={cx('heading')}>
                            <span onClick={() => setState(true)} className={cx('back-btn-profile')}>
                                <HiMenu />
                            </span>
                            <span>Kho Vouchers</span>
                        </p>
                    </div>
                    <div className={cx('contents')}>
                        <div className={cx('searching')}>
                            <span>Mã Voucher</span>
                            <div className={cx('input-wrapper')}>
                                <input
                                    value={searchText}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
                                    type="text"
                                    placeholder="Nhập mã voucher tại đây"
                                />
                                <AiFillCloseCircle
                                    onClick={() => setSearchText('')}
                                    style={{
                                        margin: '0 8px',
                                        color: '#333',
                                        cursor: 'pointer',
                                        visibility: !!searchText ? 'visible' : 'hidden',
                                    }}
                                />
                            </div>
                            <button
                                style={{
                                    opacity: !!searchText ? 1 : 0.3,
                                }}
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutProfile>
    );
}

export default ProfileVouchers;
