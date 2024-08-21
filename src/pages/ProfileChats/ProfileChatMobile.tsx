import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { IoSend } from 'react-icons/io5';
import { Message } from '../../models';
import { useEffect, useRef, useState } from 'react';
import { useSessionContext } from '../../context/SessionContext';
import { ApiService } from '../../axios/ApiService';
import { useAppContext } from '../../providers/AppProvider';
import { socketContext } from '../../context/SocketContext';

const cx = classNames.bind(styles);

type T_Props = {
    infoUser: {
        id?: number;
        name?: string;
        avatar?: string;
    };
    testData: Message[];
    paramSubmit: string;
    isChatMobile: boolean;
    setIsChatMobile: (value: boolean) => void;
};

function ProfileChatMobile(props: T_Props) {
    const [values] = useSessionContext();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const apiService = new ApiService();
    const { isConnected } = useAppContext();

    useEffect(() => {
        props.testData.length > 0 && scrollToBottom();
        inputRef.current?.focus();
    }, [props.testData]);

    const handleSubmit = () => {
        if (inputValue.trim().length > 0) {
            const dataSent = {
                conversation_id: +props.paramSubmit,
                sender_id: values.user?.id ?? 0,
                receiver_id: props.infoUser.id ?? 0,
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
                .catch((err: any) => console.error(err));
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
        <>
            {!!props.infoUser.name && (
                <>
                    <div
                        className={cx('chat-mobile-container')}
                        style={{
                            transform: props.isChatMobile ? 'translateX(0)' : 'translateX(100vw)',
                        }}
                    >
                        <div className={cx('head-chat')}>
                            <span onClick={() => props.setIsChatMobile(false)} className={cx('back-mobile')}>
                                <MdOutlineKeyboardArrowLeft />
                            </span>
                            <div className={cx('image-user')}>
                                <img src={props.infoUser.avatar} alt="name user" />
                            </div>
                            <h5>{props.infoUser.name}</h5>
                        </div>
                        <div className={cx('contents-message')}>
                            {props.testData.map(
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
                            {props.testData.length > 0 && <div ref={messagesEndRef} />}
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
                    </div>
                </>
            )}
        </>
    );
}

export default ProfileChatMobile;
