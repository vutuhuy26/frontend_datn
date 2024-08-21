import classNames from 'classnames/bind';
import styles from './Address.module.scss';
import { IoMdClose } from 'react-icons/io';
import { Address } from '../../../../models';

const cx = classNames.bind(styles);

type T_Props = {
    open: boolean;
    setOpen: (value: boolean) => void;
    choose: Address | undefined;
    setChoose: (value: Address) => void;
    data: Address[];
};

function AddressScreen(props: T_Props) {
    // useEffect(() => {
    //     addresses.forEach((item) => console.log(item));
    // }, [addresses]);

    const handleCloseAddress = () => {
        props.setOpen(false);
    };

    return (
        <>
            <div
                style={{
                    visibility: props.open ? 'visible' : 'hidden',
                }}
                onClick={handleCloseAddress}
                className={cx('address')}
            ></div>
            <div
                style={{
                    transform: props.open ? 'translate(-50%, -50%)' : 'translate(-50%, -200%)',
                }}
                className={cx('address-container')}
            >
                <div className={cx('add-header')}>
                    <div style={{ flex: 1 }}></div>
                    <h3>Chọn địa chỉ</h3>
                    <span onClick={handleCloseAddress}>
                        <IoMdClose size={'2.5rem'} />
                    </span>
                </div>
                <div className={cx('add-contents')}>
                    {props.data.map((item: Address) => (
                        <div
                            key={item.id}
                            onClick={() => props.setChoose(item)}
                            className={cx('add-item', { active: props.choose?.id === item.id })}
                        >
                            <p>
                                {item.full_name} | {item.phone_number}
                            </p>
                            <p>
                                {item.detail_address}, {item.main_address}
                            </p>
                        </div>
                    ))}
                </div>
                <div className={cx('add-footer')}>
                    <button onClick={handleCloseAddress}>Ok</button>
                </div>
            </div>
        </>
    );
}

export default AddressScreen;
