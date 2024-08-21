import classNames from 'classnames/bind';
import styles from './ProfileFriends.module.scss';
import { Button } from '../../components/Button';
import { useSessionContext } from '../../context/SessionContext';
import routesConfig from '../../config/routes';
import { ApiService } from '../../axios/ApiService';
import { useConfirmToast } from '../../context/ConfirmAndToastContext';
import { useEffect, useState } from 'react';
import { confirmDialog } from 'primereact/confirmdialog';
import { Link } from 'react-router-dom';
import { toSeoURL } from '../../Helper';
import { useSetRecoilState } from 'recoil';
import { dataProfileUser } from '../../store';
import { FriendGiveInvite, Friended, TFriended, T_FriendGiveInvite } from '../../models';
import { useAppContext } from '../../providers/AppProvider';
import { socketContext } from '../../context/SocketContext';

const cx = classNames.bind(styles);

type _T_Props = {
    id_friend: number;
    avatar_friend: string;
    name_friend: string;
    cm_friend?: string;
    status: string;
};

function FriendItem(props: _T_Props) {
    const [values] = useSessionContext();
    const message = useConfirmToast();
    const apiService = new ApiService();
    const [idsInvited, setIdsInvited] = useState<number[]>([]);
    const [idsFriended, setIdsFriended] = useState<number[]>([]);
    const [idsGiveInvite, setIdsGiveInvite] = useState<number[]>([]);
    const setDataProfileUser = useSetRecoilState(dataProfileUser);
    const { isConnected } = useAppContext();

    useEffect(() => {
        if (isConnected) {
            socketContext.on('accept-friend-give', () => {
                handleGetIdsGiveInvited();
                handleGetIdsFriended();
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        handleGetIdsInvited();
        handleGetIdsFriended();
        handleGetIdsGiveInvited();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleGetIdsInvited = () => {
        apiService.friendship
            .getFriendInviteById((values.user?.id as number).toString(), values.user?.token ?? '')
            .then((res: T_FriendGiveInvite) => {
                setIdsInvited(res.data.map((item: FriendGiveInvite) => item.friendship_customer_id));
            })
            .catch((err) => console.error(err));
    };

    const handleGetIdsGiveInvited = () => {
        apiService.friendship
            .getFriendGiveInviteById((values.user?.id as number).toString(), values.user?.token ?? '')
            .then((res: T_FriendGiveInvite) => {
                if (res.message === 'success') {
                    setIdsGiveInvite(res.data.map((item: FriendGiveInvite) => item.friendship_customerInvite_id));
                }
            });
    };

    const handleGetIdsFriended = () => {
        apiService.friendship
            .getFriendedById((values.user?.id as number).toString(), values.user?.token ?? '')
            .then((res: TFriended) => {
                setIdsFriended(res.data.map((item: Friended) => item.customer_id));
            })
            .catch((err) => console.error(err));
    };

    const handleAddNewInviteFriend = (id: number) => {
        apiService.friendship
            .addNewInviteFriend(
                {
                    status: 'waiting',
                    customer_invite: values.user?.id ?? 0,
                    customer_id: id,
                },
                values.user?.token ?? '',
            )
            .then((res: { message: string; statusCode: number }) => {
                if (res.message === 'success') {
                    handleGetIdsInvited();

                    message?.toast?.current?.show({
                        severity: 'success',
                        summary: 'Thành công',
                        detail: 'Gửi yêu cầu thành công!',
                        life: 2000,
                    });
                } else {
                    message?.toast?.current?.show({
                        severity: 'error',
                        summary: 'Thất bại',
                        detail: 'Có lỗi, vui lòng thử lại!',
                        life: 2500,
                    });
                }
            })
            .catch((err) => console.error(err));
    };

    const handleRemoveInvite = (id: number) => {
        confirmDialog({
            message: 'Bạn có chắc chắn muốn hủy yêu cầu không?',
            position: 'top',
            header: 'Hủy yêu cầu',
            acceptLabel: 'Đồng ý',
            rejectLabel: 'Hủy bỏ',
            icon: 'pi pi-exclamation-triangle',
            accept() {
                apiService.friendship
                    .deleteFriendshipById(
                        {
                            customer_invite: values.user?.id ?? 0,
                            customer_id: id,
                        },
                        values.user?.token ?? '',
                    )
                    .then((res: { message: string; statusCode: number }) => {
                        if (res.message === 'success') {
                            handleGetIdsInvited();
                            message?.toast?.current?.show({
                                severity: 'success',
                                summary: 'Thành công',
                                detail: 'Hủy yêu cầu thành công!',
                                life: 2000,
                            });
                        } else {
                            message?.toast?.current?.show({
                                severity: 'error',
                                summary: 'Thất bại',
                                detail: 'Có lỗi, vui lòng thử lại!',
                                life: 2500,
                            });
                        }
                    })
                    .catch((err) => console.error(err));
            },
        });
    };

    const handleUpdateDataProfileUser = () => {
        setDataProfileUser({
            id: props.id_friend,
            isFriend: props.status === 'friended' || idsFriended.includes(props.id_friend),
            userName: props.name_friend,
            avatarPath: props.avatar_friend,
        });
    };

    const handleAcceptInvite = () => {
        apiService.friendship
            .acceptFriendship(
                {
                    customer_invite: props.id_friend,
                    customer_id: values.user?.id ?? 0,
                    status: 'friended',
                },
                values.user?.token ?? '',
            )
            .then((res: { message: string; statusCode: number }) => {
                if (res.message === 'success') {
                    if (isConnected) {
                        socketContext.emit('accept-friend', {
                            id: props.id_friend,
                            status: 'success',
                        });
                    }
                }
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className={cx('friend-item')}>
            {values.user?.id === props.id_friend ? (
                <Link to={routesConfig.profile}>
                    <div className={cx('f-avatar')}>
                        <img src={props.avatar_friend} alt={props.name_friend} />
                    </div>
                </Link>
            ) : (
                <Link onClick={handleUpdateDataProfileUser} to={`/profile/user/@${toSeoURL(props.name_friend)}`}>
                    <div className={cx('f-avatar')}>
                        <img src={props.avatar_friend} alt={props.name_friend} />
                    </div>
                </Link>
            )}
            <div className={cx('f-info')}>
                {values.user?.id === props.id_friend ? (
                    <Link to={routesConfig.profile}>
                        <div>
                            <h5>{props.name_friend}</h5>
                            <p>{props.cm_friend} bạn chung</p>
                        </div>
                    </Link>
                ) : (
                    <Link onClick={handleUpdateDataProfileUser} to={`/profile/user/@${toSeoURL(props.name_friend)}`}>
                        <div>
                            <h5>{props.name_friend}</h5>
                            <p>{props.cm_friend} bạn chung</p>
                        </div>
                    </Link>
                )}

                {values.user?.id === props.id_friend ? (
                    <Button small="true" to={routesConfig.profile}>
                        Trang cá nhân
                    </Button>
                ) : props.status === 'friended' || idsFriended.includes(props.id_friend) ? (
                    <Button small="true">Bạn bè</Button>
                ) : idsInvited.includes(props.id_friend) ? (
                    <Button onClick={() => handleRemoveInvite(props.id_friend)} small="true">
                        Hủy yêu cầu
                    </Button>
                ) : idsGiveInvite.includes(props.id_friend) ? (
                    <Button onClick={handleAcceptInvite} small="true">
                        Xác nhận
                    </Button>
                ) : (
                    <Button onClick={() => handleAddNewInviteFriend(props.id_friend)} small="true">
                        Thêm bạn bè
                    </Button>
                )}
            </div>
        </div>
    );
}

export default FriendItem;
