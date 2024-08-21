import classNames from 'classnames/bind';
import styles from './Voucher.module.scss';
import img from '../../../assets/images/freeship.png';

const cx = classNames.bind(styles);

type T_Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
};

function Voucher(props: T_Props) {
    const handleCloseVoucher = () => {
        props.setOpen(false);
    };

    return (
        <div className={cx('voucher')}>
            <div
                style={{
                    visibility: props.open ? 'visible' : 'hidden',
                }}
                id="mask"
                className={cx('mask')}
            ></div>
            <div
                style={{
                    transform: props.open ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0)',
                }}
                id="voucher"
                className={cx('contents')}
            >
                <div className={cx('header')}>
                    <h3>Petshop Vouchers</h3>
                    <div className={cx('search-vouchers')}>
                        <span className={cx('span-d')}>Mã voucher: </span>
                        <span className={cx('span-mobile')}>Mã: </span>
                        <input type="text" placeholder="Aa..." />
                        <button>ÁP DỤNG</button>
                    </div>
                </div>
                <div className={cx('vouchers')}>
                    <div className={cx('voucher-item')}>
                        <div className={cx('wraper-info')}>
                            <div className={cx('preview_img')}>
                                <img src={img} alt="voucher images" />
                            </div>
                            <div className={cx('info-voucher')}>
                                <p>Name voucher</p>
                                <p>Condition voucher</p>
                                <p className={cx('danger')}>50% - Tối đa 30k</p>
                                <p className={cx('deadline')}>Sắp hết hạn: còn 3 ngày</p>
                            </div>
                        </div>
                        <div className={cx('checked-input')}>
                            <input type="radio" />
                        </div>
                    </div>
                    <div className={cx('voucher-item')}>
                        <div className={cx('wraper-info')}>
                            <div className={cx('preview_img')}>
                                <img src={img} alt="voucher images" />
                            </div>
                            <div className={cx('info-voucher')}>
                                <p>Name voucher</p>
                                <p>Condition voucher</p>
                                <p className={cx('danger')}>50% - Tối đa 30k</p>
                                <p className={cx('deadline')}>Sắp hết hạn: còn 3 ngày</p>
                            </div>
                        </div>
                        <div className={cx('checked-input')}>
                            <input type="radio" />
                        </div>
                    </div>
                    <div className={cx('voucher-item')}>
                        <div className={cx('wraper-info')}>
                            <div className={cx('preview_img')}>
                                <img src={img} alt="voucher images" />
                            </div>
                            <div className={cx('info-voucher')}>
                                <p>Name voucher</p>
                                <p>Condition voucher</p>
                                <p className={cx('danger')}>50% - Tối đa 30k</p>
                                <p className={cx('deadline')}>Sắp hết hạn: còn 3 ngày</p>
                            </div>
                        </div>
                        <div className={cx('checked-input')}>
                            <input type="radio" />
                        </div>
                    </div>
                    <div className={cx('voucher-item')}>
                        <div className={cx('wraper-info')}>
                            <div className={cx('preview_img')}>
                                <img src={img} alt="voucher images" />
                            </div>
                            <div className={cx('info-voucher')}>
                                <p>Name voucher</p>
                                <p>Condition voucher</p>
                                <p className={cx('danger')}>50% - Tối đa 30k</p>
                                <p className={cx('deadline')}>Sắp hết hạn: còn 3 ngày</p>
                            </div>
                        </div>
                        <div className={cx('checked-input')}>
                            <input type="radio" />
                        </div>
                    </div>
                    <div className={cx('voucher-item')}>
                        <div className={cx('wraper-info')}>
                            <div className={cx('preview_img')}>
                                <img src={img} alt="voucher images" />
                            </div>
                            <div className={cx('info-voucher')}>
                                <p>Name voucher</p>
                                <p>Condition voucher</p>
                                <p className={cx('danger')}>50% - Tối đa 30k</p>
                                <p className={cx('deadline')}>Sắp hết hạn: còn 3 ngày</p>
                            </div>
                        </div>
                        <div className={cx('checked-input')}>
                            <input type="radio" />
                        </div>
                    </div>
                </div>
                <div className={cx('footer')}>
                    <button onClick={handleCloseVoucher}>TRỞ LẠI</button>
                    <button className={cx('primary')}>OK</button>
                </div>
            </div>
        </div>
    );
}

export default Voucher;
