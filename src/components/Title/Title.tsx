import styles from './Title.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type TProps = {
    title: string;
    logo: any;
};

function Title(props: TProps) {
    return (
        <div className={cx('title-cpn')}>
            <h3 className={cx('heading')}>{props.title}</h3>
            <div className={cx('logo')}>
                <img src={props.logo} alt="logo" />
            </div>
        </div>
    );
}

export default Title;
