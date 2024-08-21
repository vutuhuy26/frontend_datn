import classNames from 'classnames/bind';
import styles from './ProfileUser.module.scss';
import { useRecoilState } from 'recoil';
import { dataProfileUser } from '../../store';
import { TCheckConversation, TProfileUser, T_FriendGiveInvite } from '../../models';
import { Button } from '../../components/Button';
import { useEffect, useState } from 'react';
import { ApiService } from '../../axios/ApiService';
import { useSessionContext } from '../../context/SessionContext';
import { confirmDialog } from 'primereact/confirmdialog';
import { useConfirmToast } from '../../context/ConfirmAndToastContext';
import { useNavigate } from 'react-router-dom';
import { socketContext } from '../../context/SocketContext';
import { useAppContext } from '../../providers/AppProvider';

const cx = classNames.bind(styles);

function ProfileUser() {
    const [data, setData] = useRecoilState<TProfileUser>(dataProfileUser);
    const message = useConfirmToast();
    const [idsInvited, setIdsInvited] = useState<number[]>([]);
    const [idsGiveInvite, setIdsGiveInvite] = useState<number[]>([]);
    const apiService = new ApiService();
    const navigate = useNavigate();
    const [values] = useSessionContext();
    const { isConnected } = useAppContext();

    useEffect(() => {
        handleGetIdsInvited();
        handleGetIdsGiveInvited();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleGetIdsInvited = () => {
        apiService.friendship
            .getFriendInviteById((values.user?.id as number).toString(), values.user?.token ?? '')
            .then((res: T_FriendGiveInvite) => {
                setIdsInvited(res.data.map((item: any) => item.friendship_customer_id));
            })
            .catch((err) => console.error(err));
    };

    const handleGetIdsGiveInvited = () => {
        apiService.friendship
            .getFriendGiveInviteById((values.user?.id as number).toString(), values.user?.token ?? '')
            .then((res: T_FriendGiveInvite) => {
                if (res.message === 'success') {
                    setIdsGiveInvite(res.data.map((item: any) => item.friendship_customerInvite_id));
                }
            });
    };

    const handleAddNewInviteFriend = () => {
        apiService.friendship
            .addNewInviteFriend(
                {
                    status: 'waiting',
                    customer_invite: values.user?.id ?? 0,
                    customer_id: data.id,
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

    const handleRemoveInvite = () => {
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
                            customer_id: data.id,
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

    const handleAcceptInvite = () => {
        apiService.friendship
            .acceptFriendship(
                {
                    customer_invite: data.id,
                    customer_id: values.user?.id ?? 0,
                    status: 'friended',
                },
                values.user?.token ?? '',
            )
            .then((res: { message: string; statusCode: number }) => {
                if (res.message === 'success') {
                    setData((prev: TProfileUser) => ({
                        ...prev,
                        isFriend: true,
                    }));

                    if (isConnected) {
                        socketContext.emit('accept-friend', {
                            id: data.id,
                            status: 'success',
                        });
                    }
                }
            })
            .catch((err) => console.error(err));
    };

    const handleChat = () => {
        apiService.chats
            .checkCreatedConversation(
                {
                    customer_id: data.id,
                    created_id: values.user?.id ?? 0,
                },
                values.user?.token ?? '',
            )
            .then((res: TCheckConversation) => {
                if (res.message === 'success') {
                    navigate(`/profile/chats/${res.data.conver_id}`);
                } else {
                    apiService.chats
                        .addNewChat(
                            {
                                created_by_customer: values.user?.id ?? 0,
                                customer_id: data.id,
                            },
                            values.user?.token ?? '',
                        )
                        .then((res: { message: string; statusCode: number; data: { id_conver: number } }) => {
                            if (res.message === 'success') {
                                navigate(`/profile/chats/${res.data.id_conver}`);
                            }
                        })
                        .catch((err) => console.error(err));
                }
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className={cx('profile-user')}>
            <div className={cx('profile-user-wrapper')}>
                <div className={cx('wall-image')}></div>
                <div className={cx('infos')}>
                    <div className={cx('wrapper-image')}>
                        <div className={cx('avatar-user')}>
                            <img src={data.avatarPath} alt={data.userName} />
                        </div>
                    </div>
                    <h3>{data.userName}</h3>
                    <div className={cx('actions')}>
                        {data.isFriend ? (
                            <>
                                <Button>Bạn bè</Button>
                                <Button onClick={handleChat}>Nhắn tin</Button>
                            </>
                        ) : idsInvited.includes(data.id) ? (
                            <Button onClick={handleRemoveInvite}>Hủy yêu cầu</Button>
                        ) : idsGiveInvite.includes(data.id) ? (
                            <Button onClick={handleAcceptInvite}>Xác nhận</Button>
                        ) : (
                            <Button onClick={handleAddNewInviteFriend}>Thêm bạn bè</Button>
                        )}
                    </div>
                    <p className={cx('description')}>
                        description user hehehe hehehe hehehe hehehe hehehe hehehe hehehe
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProfileUser;
