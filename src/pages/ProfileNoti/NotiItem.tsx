import classNames from 'classnames/bind';
import styles from './ProfileNoti.module.scss';
import { BsDot } from 'react-icons/bs';
import { timeAgo } from '../../Helper';
import { useState } from 'react';
import { Dialog } from 'primereact/dialog';

const cx = classNames.bind(styles);

type _T_Props = {
    id: number;
    content: string;
    avatar_path: string;
    created_at: string;
    seen: boolean;
    handler: Function;
};

function NotiItem(props: _T_Props) {
    const [content, setContent] = useState<string>('');

    return (
        <>
            <Dialog
                position="top"
                header="Thông báo"
                visible={!!content}
                style={{ width: '50vw', top: 48 }}
                closable
                // icons={<IoClose size={'2.5rem'} />}
                onHide={() => setContent('')}
            >
                <p style={{ fontSize: 16 }}>{content}</p>
            </Dialog>
            <div
                onClick={() => {
                    props.handler(props.id);
                    setContent(props.content);
                }}
                className={cx('noti-item')}
            >
                <div className={cx('avatar')}>
                    <img src={props.avatar_path} alt="avatar-user" />
                </div>
                <div className={cx('info-noti')}>
                    <div className={cx('check-noti')}>
                        <p className={cx('detail-text')}>{props.content}</p>
                        <p className={cx('time-post')}>{timeAgo(props.created_at)}</p>
                    </div>
                    {!props.seen && (
                        <div className={cx('seened')}>
                            <BsDot size={'5rem'} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default NotiItem;
