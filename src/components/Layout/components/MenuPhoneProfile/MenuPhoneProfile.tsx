import classNames from 'classnames/bind';
import styles from './MenuPhoneProfile.module.scss';
import { AiOutlineUser } from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';
import routesConfig from '../../../../config/routes';
import { CiViewList } from 'react-icons/ci';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { MdOutlineDiscount } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { useRecoilState } from 'recoil';
import { isMenuMobile } from '../../../../store';
import { FaUserFriends } from 'react-icons/fa';
import { TbMessageCircle2 } from 'react-icons/tb';

const cx = classNames.bind(styles);

function MenuPhoneProfile() {
    const [state, setState] = useRecoilState(isMenuMobile);

    return (
        <div
            style={{
                position: 'fixed',
                top: 72,
                left: 0,
                bottom: 0,
                backgroundColor: '#f2f3f5',
                zIndex: 99999,
                transition: 'all 0.25s ease',
                transform: state ? 'translateX(0)' : 'translateX(-238px)',
            }}
        >
            <div className={cx('navbar-phone-profile')}>
                <div>
                    <span
                        onClick={() => setState(false)}
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            position: 'relative',
                            top: 8,
                            cursor: 'pointer',
                        }}
                    >
                        <IoClose size={'2rem'} />
                    </span>
                </div>
                <div className={cx('options')}>
                    <div className={cx('private-info')}>
                        <Link
                            onClick={() => setState(false)}
                            to={routesConfig.profile}
                            className={cx('title-info-private')}
                        >
                            <AiOutlineUser size={'2rem'} style={{ color: '#3067be' }} />
                            <span>Tài khoản của tôi</span>
                        </Link>
                        <NavLink
                            onClick={() => setState(false)}
                            className={(nav) => cx('child-not-icon', { active: nav.isActive })}
                            to={routesConfig.profile}
                        >
                            Hồ Sơ
                        </NavLink>
                        <NavLink
                            onClick={() => setState(false)}
                            className={(nav) => cx('child-not-icon', { active: nav.isActive })}
                            to={routesConfig.profile_bank}
                        >
                            Ngân Hàng
                        </NavLink>
                        <NavLink
                            onClick={() => setState(false)}
                            className={(nav) => cx('child-not-icon', { active: nav.isActive })}
                            to={routesConfig.profile_address}
                        >
                            Địa Chỉ
                        </NavLink>
                        <NavLink
                            onClick={() => setState(false)}
                            className={(nav) => cx('child-not-icon', { active: nav.isActive })}
                            to={routesConfig.profile_change_password}
                        >
                            Đổi Mật Khẩu
                        </NavLink>
                    </div>
                    <div className={cx('more-actions')}>
                        <NavLink
                            onClick={() => setState(false)}
                            to={routesConfig.profile_friends}
                            className={(nav) => cx('title-info-private', { active: nav.isActive })}
                        >
                            <FaUserFriends size={'2rem'} style={{ color: 'dodgerblue' }} />
                            <span>Bạn bè</span>
                        </NavLink>
                        <NavLink
                            onClick={() => setState(false)}
                            to={routesConfig.profile_chats}
                            className={(nav) => cx('title-info-private', { active: nav.isActive })}
                        >
                            <TbMessageCircle2 size={'2rem'} style={{ color: 'dodgerblue' }} />
                            <span>Tin nhắn</span>
                        </NavLink>
                        <NavLink
                            onClick={() => setState(false)}
                            to={routesConfig.profile_buy}
                            className={(nav) => cx('title-info-private', { active: nav.isActive })}
                        >
                            <CiViewList size={'2rem'} style={{ color: '#3067be' }} />
                            <span>Đơn Mua</span>
                        </NavLink>
                        <NavLink
                            onClick={() => setState(false)}
                            to={routesConfig.profile_noti}
                            className={(nav) => cx('title-info-private', { active: nav.isActive })}
                        >
                            <IoMdNotificationsOutline style={{ color: '#f46b4e' }} size={'2rem'} />
                            <span>Thông Báo</span>
                        </NavLink>
                        <NavLink
                            onClick={() => setState(false)}
                            to={routesConfig.profile_voucher}
                            className={(nav) => cx('title-info-private', { active: nav.isActive })}
                        >
                            <MdOutlineDiscount size={'2rem'} style={{ color: 'orange' }} />
                            <span>Petshop Vouchers</span>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuPhoneProfile;
