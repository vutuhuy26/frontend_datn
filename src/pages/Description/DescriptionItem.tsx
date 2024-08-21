import classNames from 'classnames/bind';
import styles from './Description.module.scss';
import { Button } from '../../components/Button';
const cx = classNames.bind(styles);

type TProps = {
    logo: any;
    heading: string;
    description: string;
};

function DescriptionItem(props: TProps) {
    return (
        <div className={cx('description-item')}>
            <div className={cx('logo')}>
                <img src={props.logo} alt="logo" />
            </div>
            <h3 className={cx('heading-description-item')}>{props.heading}</h3>
            <p className={cx('description-p')}>{props.description}</p>
            <div className={cx('btn')}>
                <Button small={'true'}>CLICK ME</Button>
            </div>
        </div>
    );
}

export default DescriptionItem;
