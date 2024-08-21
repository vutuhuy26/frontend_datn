import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ProfileNoti.module.scss';
import { LayoutProfile } from '../../components/Layout/LayoutProfile';
import NotiItem from './NotiItem';
import { HiMenu } from 'react-icons/hi';
import { useSetRecoilState } from 'recoil';
import { isMenuMobile } from '../../store';
import { useSessionContext } from '../../context/SessionContext';
import { ApiService } from '../../axios/ApiService';

const cx = classNames.bind(styles);

function ProfileNoti() {
    const [active, setActive] = useState<number>(1);
    const setState = useSetRecoilState(isMenuMobile);
    const [values] = useSessionContext();
    const [data, setData] = useState<any[]>([]);
    const [dataRender, setDataRender] = useState<any[]>([]);
    const apiService = new ApiService();

    useEffect(() => {
        apiService.notifications
            .getNotificationsById((values.user?.id as number).toString(), values.user?.token ?? '')
            .then((res: any) => {
                if (res.message === 'success') {
                    setData(res.data);
                }
            })

            .catch((err) => console.error(err));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setDataRender(data);
    }, [data]);

    useEffect(() => {
        if (active === 2) {
            setDataRender(data.filter((item) => !item.seen));
        } else {
            setDataRender(data);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active]);

    const handleSeen = (id: number) => {
        apiService.notifications
            .updateSeen(id.toString(), values.user?.token ?? '')
            .then((res: any) => {
                if (res.message === 'success') {
                    setData((item) => {
                        const data = [...item];
                        const itemId = data.findIndex((item) => item.id === id);
                        if (itemId !== -1) {
                            data[itemId] = {
                                ...data[itemId],
                                seen: true,
                            };

                            return data;
                        } else {
                            return data;
                        }
                    });
                }
            })
            .catch((err) => console.error(err));
    };

    return (
        <LayoutProfile>
            <div className={cx('profile-noti')}>
                <div className={cx('my-noti')}>
                    <div className={cx('header')}>
                        <p className={cx('heading')}>
                            <span onClick={() => setState(true)} className={cx('back-btn-profile')}>
                                <HiMenu />
                            </span>
                            <span>Thông Báo Của Bạn</span>
                        </p>
                    </div>
                    <div className={cx('contents')}>
                        <div className={cx('options')}>
                            <button
                                onClick={() => setActive(1)}
                                style={{
                                    color: active === 1 ? '#247ef3' : '',
                                    backgroundColor: active === 1 ? '#e7f3ff' : '',
                                }}
                            >
                                Tất cả
                            </button>
                            <button
                                onClick={() => setActive(2)}
                                style={{
                                    color: active === 2 ? '#247ef3' : '',
                                    backgroundColor: active === 2 ? '#e7f3ff' : '',
                                }}
                            >
                                Chưa đọc
                            </button>
                        </div>
                        <div className={cx('noti-container')}>
                            <div className={cx('noti-new')}>
                                <h3>Mới</h3>
                                <div className={cx('wrapper-noti-item')}>
                                    {dataRender.length > 0 &&
                                        dataRender
                                            .reverse()
                                            .map((item) => (
                                                <NotiItem
                                                    id={item.id}
                                                    seen={item.seen}
                                                    avatar_path={item.avatar_path}
                                                    content={item.content}
                                                    created_at={item.created_at}
                                                    key={item.id}
                                                    handler={handleSeen}
                                                />
                                            ))}
                                </div>
                            </div>
                            {/* <div className={cx('noti-new')}>
                                <h3>Trước đó</h3>
                                <div>
                                    {[1, 2, 3].map((item) => (
                                        <NotiItem key={item} />
                                    ))}
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </LayoutProfile>
    );
}

export default ProfileNoti;
