import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import img from '../../assets/images/beyeu.jpg';
import { LayoutProfile } from '../../components/Layout/LayoutProfile';
import { IoSend } from 'react-icons/io5';
import { MdOutlineKeyboardArrowLeft, MdOutlineSearch } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiService } from '../../axios/ApiService';
import { useSessionContext } from '../../context/SessionContext';
import { Loading } from '../../components/Loading';
import { useDebounce } from '../../hooks';
import { App } from '../../const/App';
import { Conversation, Message, T_Conversation, T_Message } from '../../models';
import { HiMenu } from 'react-icons/hi';
import { useSetRecoilState } from 'recoil';
import { isMenuMobile } from '../../store';
import ProfileChatMobile from './ProfileChatMobile';
import { useAppContext } from '../../providers/AppProvider';
import { socketContext } from '../../context/SocketContext';

const cx = classNames.bind(styles);

function Profile() {
    const params = useParams();
    const navigate = useNavigate();
    const apiService = new ApiService();
    const [values] = useSessionContext();
    const setState = useSetRecoilState(isMenuMobile);
    const [inputValue, setInputValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isChatMobile, setIsChatMobile] = useState<boolean>(false);
    const [init, setInit] = useState<boolean>(false);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [infoUser, setInfoUser] = useState<{ id?: number; name?: string; avatar?: string }>({});
    const [stateParam, setStateParam] = useState<string>('');
    const paramSubmit = useDebounce(stateParam, App.DELAY_SEARCH);
    const [testData, setTestData] = useState<Message[]>([]);
    const { isConnected } = useAppContext();

    useEffect(() => {
        setStateParam(params.id ?? '');
    }, [params]);

    useEffect(() => {
        if (init && isConnected) {
            socketContext.on(
                `chat-message-user-give`,
                (data: {
                    id: number;
                    conversation_: number;
                    content: string;
                    sender_: number;
                    receiver_: number;
                    cus_avatar_path: string;
                }) => {
                    setTestData((prev: Message[]) => [
                        ...prev,
                        {
                            message_id: data.id,
                            message_sender_id: data.sender_,
                            cus_avatar_path: data.cus_avatar_path,
                            message_content: data.content,
                        },
                    ]);

                    setConversations((prev: Conversation[]) => {
                        const user = prev.find((item: Conversation) => item.conver_id === +data.conversation_);
                        if (user) {
                            return [
                                {
                                    ...user,
                                    messages_content: data.content,
                                },
                                ...prev.filter((item: Conversation) => item.conver_id !== +data.conversation_),
                            ];
                        }

                        return prev;
                    });
                },
            );
        }

        setInit(true);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [init]);

    useEffect(() => {
        apiService.chats
            .getCustomerConversationByCreatedId((values.user?.id as number).toString(), values.user?.token ?? '')
            .then((res: T_Conversation) => {
                if (res.message === 'success') {
                    apiService.chats
                        .getJoinedConversationsById((values.user?.id as number).toString(), values.user?.token ?? '')
                        .then((response: T_Conversation) => {
                            if (response.message === 'success') {
                                setConversations([...response.data, ...res.data]);
                                setIsLoading(false);
                            }
                        })
                        .catch((err) => console.error(err));
                }
            })
            .catch((err) => {
                console.error(err);
                setIsLoading(false);
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (paramSubmit.trim().length > 0) {
            const user = conversations.find((conver) => conver.conver_id === +paramSubmit);

            if (user) {
                setInfoUser({
                    id: user.cus_id,
                    name: user.cus_name,
                    avatar: user.cus_avatar_path,
                });
            }

            // handle get message from id conversation

            apiService.chats
                .getMessagesByConversationId(paramSubmit.trim(), values.user?.token ?? '')
                .then((res: T_Message) => {
                    if (res.message === 'success') {
                        setTestData(res.data);
                        inputRef.current?.focus();
                    }
                })
                .catch((err) => console.error(err));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paramSubmit]);

    useEffect(() => {
        testData.length > 0 && scrollToBottom();
    }, [testData]);

    const handleSubmit = () => {
        if (inputValue.trim().length > 0) {
            const dataSent = {
                conversation_id: +paramSubmit,
                sender_id: values.user?.id ?? 0,
                receiver_id: infoUser.id ?? 0,
                content: inputValue.trim(),
            };

            apiService.chats
                .addNewMessageByConversationId(dataSent, values.user?.token ?? '')
                .then(
                    (res: {
                        message: string;
                        statusCode: number;
                        data: {
                            id: number;
                            conversation_: number;
                            content: string;
                            sender_: number;
                            receiver_: number;
                        };
                    }) => {
                        if (res.message === 'success') {
                            if (isConnected) {
                                socketContext.emit(`chat-message-user`, {
                                    ...res.data,
                                    cus_avatar_path: values.user?.avatar,
                                });
                            }

                            setInputValue('');
                        }
                    },
                )
                .catch((err) => console.error(err));
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };

    const handleSubmitMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <LayoutProfile>
            <ProfileChatMobile
                infoUser={infoUser}
                testData={testData}
                paramSubmit={paramSubmit}
                isChatMobile={isChatMobile}
                setIsChatMobile={setIsChatMobile}
            />
            <div className={cx('profile-chats')}>
                <div className={cx('bar-chats')}>
                    <div className={cx('container-bar')}>
                        <div className={cx('bar-chat-mobile-container')}>
                            <span onClick={() => setState(true)} className={cx('back-btn-profile')}>
                                <HiMenu />
                            </span>
                            <h5>Đoạn chat</h5>
                        </div>
                        <div className={cx('search-user')}>
                            <MdOutlineSearch size={'2rem'} />
                            <input type="text" placeholder="Tìm kiếm trong đoạn chat" />
                        </div>
                        <div className={cx('list-user')}>
                            {conversations.length > 0 ? (
                                conversations.map((item: Conversation) => (
                                    <div
                                        key={item.conver_id}
                                        className={cx('item-chat')}
                                        onClick={() => {
                                            navigate(`/profile/chats/${item.conver_id}`);
                                            setIsChatMobile(true);
                                        }}
                                    >
                                        <div className={cx('item-avatar')}>
                                            <img src={item.cus_avatar_path ?? img} alt={`avatar_${item.cus_name}`} />
                                        </div>
                                        <div className={cx('item-info')}>
                                            <h6>{item.cus_name}</h6>
                                            <p className={cx('last-message')}>
                                                {item.sender_id === values.user?.id ? 'Bạn: ' : ''}
                                                {item.messages_content}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : isLoading ? (
                                <Loading />
                            ) : (
                                <p style={{ fontSize: 12, textAlign: 'center' }}>Bạn chưa có cuộc trò chuyện nào!</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className={cx('chats-messages')}>
                    {!!infoUser.name && (
                        <>
                            <div className={cx('head-chat')}>
                                <span className={cx('back-mobile')}>
                                    <MdOutlineKeyboardArrowLeft />
                                </span>
                                <div className={cx('image-user')}>
                                    <img src={infoUser.avatar} alt="name user" />
                                </div>
                                <h5>{infoUser.name}</h5>
                            </div>
                            <div className={cx('contents-message')}>
                                {testData.map(
                                    (item) =>
                                        item.message_content.trim().length > 0 && (
                                            <div
                                                key={item.message_id}
                                                className={cx('message-item', {
                                                    me_message: item.message_sender_id === values.user?.id,
                                                })}
                                            >
                                                <div className={cx('message-item-avatar')}>
                                                    <img src={item.cus_avatar_path} alt="avaatar user" />
                                                </div>
                                                <p
                                                    className={cx('content-message-item', {
                                                        content_me_message: item.message_sender_id === values.user?.id,
                                                    })}
                                                >
                                                    {item.message_content}
                                                </p>
                                            </div>
                                        ),
                                )}
                                {testData.length > 0 && <div ref={messagesEndRef} />}
                            </div>
                            <div className={cx('foot-chat')}>
                                <div className={cx('input')}>
                                    <input
                                        ref={inputRef}
                                        value={inputValue}
                                        onKeyUp={handleSubmitMessage}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        type="text"
                                        placeholder="Aa..."
                                    />
                                </div>
                                <div onClick={handleSubmit} className={cx('btn-submit')}>
                                    <IoSend />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </LayoutProfile>
    );
}

export default Profile;
