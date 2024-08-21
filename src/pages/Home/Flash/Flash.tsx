import styles from './Flash.module.scss';
import classNames from 'classnames/bind';
import FlashItem from './FlashItem';
import { RxRocket } from 'react-icons/rx';
import { TbPigMoney } from 'react-icons/tb';
import { MdPayment } from 'react-icons/md';
import { ImGift } from 'react-icons/im';

const cx = classNames.bind(styles);

function Flash() {
    return (
        <div className={cx('flash')}>
            <FlashItem icon={<RxRocket />} title="FREE SHIPPING" description="All Order Over $150" line={true} />
            <FlashItem icon={<TbPigMoney />} title="20% DISCOUNT" description="For First Order" line={true} />
            <FlashItem icon={<MdPayment />} title="SECURE PAYMENT" description="Confirmed" line={true} />
            <FlashItem icon={<ImGift />} title="AWESOME GIFT" description="Every Month" />
        </div>
    );
}

export default Flash;
