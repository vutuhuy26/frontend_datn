import { useState, ChangeEvent, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ProfileFriends.module.scss';
import { LayoutProfile } from '../../components/Layout/LayoutProfile';
import { AiOutlineSearch } from 'react-icons/ai';
import FriendItem from './FriendItem';
import { ApiService } from '../../axios/ApiService';
import { useDebounce } from '../../hooks';
import { useSessionContext } from '../../context/SessionContext';
import { App } from '../../const/App';
import { FaUserPlus } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { FriendRequest } from './FriendRequest';
import { Loading } from '../../components/Loading';
import { Friended, TFriended, T_Customer, T_Customers, T_FriendGiveInvite } from '../../models';
import { HiMenu } from 'react-icons/hi';
import { useSetRecoilState } from 'recoil';
import { isMenuMobile } from '../../store';
import { useAppContext } from '../../providers/AppProvider';
import { socketContext } from '../../context/SocketContext';

const cx = classNames.bind(styles);

function ProfileFriends() {
    const apiService = new ApiService();
    const [values] = useSessionContext();
    const setState = useSetRecoilState(isMenuMobile);
    const [value, setValue] = useState<string>('');
    const [isModal, setIsModal] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false);
    const [countRequestFriend, setCountRequestFriend] = useState<number>(0);
    const debounced = useDebounce(value, App.DELAY_SEARCH);
    const [dataCustomers, setDataCustomers] = useState<T_Customer[]>([]);
    const [friends, setFriends] = useState<Friended[]>([]);
    const [isOpenFriendRequest, setIsOpenFriendRequest] = useState<boolean>(false);
    const { isConnected } = useAppContext();

    useEffect(() => {
        if (isConnected) {
            socketContext.on('accept-friend-give', () => {
                handleGetCountRequestFriend();
                handleGetFriends();
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (debounced.trim().length > 0) {
            setIsModal(true);
            setIsLoadingSearch(true);

            apiService.customer
                .searchCustomers(
                    {
                        search: debounced.trim(),
                    },
                    values.user?.token ?? '',
                )
                .then((res: T_Customers) => {
                    if (res.message === 'success') {
                        setDataCustomers(res.data);
                        setIsLoadingSearch(false);
                    }
                })
                .catch((err) => console.error(err));
        } else {
            setIsModal(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounced]);

    useEffect(() => {
        handleGetFriends();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        handleGetCountRequestFriend();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleGetFriends = () => {
        apiService.friendship
            .getFriendedById((values.user?.id as number).toString(), values.user?.token ?? '')
            .then((res: TFriended) => {
                if (res.message === 'success') {
                    setFriends(res.data);
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                console.error(err);
                setIsLoading(false);
            });
    };

    const handleGetCountRequestFriend = () => {
        apiService.friendship
            .getFriendGiveInviteById((values.user?.id as number).toString(), values.user?.token ?? '')
            .then((res: T_FriendGiveInvite) => {
                if (res.message === 'success') {
                    setCountRequestFriend(res.data.length);
                }
            })
            .catch((err) => console.error(err));
    };

    const handleOpenFriendRequest = () => {
        setIsOpenFriendRequest(true);
    };

    return (
        <LayoutProfile>
            <div className={cx('profile-friend')}>
                <div className={cx('friends-header')}>
                    <FriendRequest isOpen={isOpenFriendRequest} setIsOpen={setIsOpenFriendRequest} />
                    <div className={cx('f-empty')}>
                        <span onClick={() => setState(true)} className={cx('back-btn-profile')}>
                            <HiMenu />
                        </span>
                    </div>
                    <h1>Tất cả bạn bè</h1>
                    <div onClick={handleOpenFriendRequest} className={cx('icon-request')}>
                        <span>
                            <FaUserPlus size={'2rem'} />
                        </span>
                        <div className={cx('title-friend-request')}>
                            <p>Lời mời kết bạn</p>
                            <h6 className={cx('count-request')}>{countRequestFriend}</h6>
                        </div>
                    </div>
                </div>
                <div className={cx('search-friends')}>
                    <input
                        type="text"
                        placeholder="Tìm kiếm bạn bè..."
                        value={value}
                        onFocus={() => {
                            if (debounced.trim().length > 0) {
                                setIsModal(true);
                            }
                        }}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                    />
                    <span className={cx('icon-search')}>
                        <AiOutlineSearch size={'2rem'} />
                    </span>
                    {isModal && (
                        <div className={cx('search-modal')}>
                            <div className={cx('header-modal')}>
                                <h3>
                                    Kết quả tìm kiếm cho <strong>{value}</strong>
                                </h3>
                                <span onClick={() => setIsModal(false)}>
                                    <IoMdClose size={'2rem'} />
                                </span>
                            </div>
                            <div className={cx('modal-items')}>
                                {dataCustomers.length > 0 ? (
                                    dataCustomers.map((item: T_Customer) => (
                                        <FriendItem
                                            key={item.id}
                                            avatar_friend={item.avatar_path}
                                            name_friend={item.name}
                                            id_friend={item.id}
                                            cm_friend="5"
                                            status=""
                                        />
                                    ))
                                ) : isLoadingSearch ? (
                                    <Loading />
                                ) : (
                                    <p className={cx('no-search')}>Không có kết quả tìm kiếm !</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <div className={cx('list-friends')}>
                    {friends.length > 0 ? (
                        friends
                            .filter((item: Friended) => item.customer_id !== values.user?.id)
                            .map((item: Friended) => (
                                <FriendItem
                                    key={item.customer_id}
                                    avatar_friend={item.customer_avatar_path}
                                    name_friend={item.customer_name}
                                    cm_friend="5"
                                    id_friend={item.customer_id}
                                    status={item.friendship_status ?? 'waiting'}
                                />
                            ))
                    ) : (
                        <div className={cx('no-friends')}>
                            {isLoading ? (
                                <Loading />
                            ) : (
                                <p>Bạn chưa có bạn bè, hãy thử tìm kiếm bạn bè của bạn và kết bạn với họ!</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </LayoutProfile>
    );
}

export default ProfileFriends;
