import Item from './Item';
import classNames from 'classnames/bind';
import styles from '../Header.module.scss';
import { data } from '../data';

type TData = {
    id: number;
    name: string;
    path: string;
};

const cx = classNames.bind(styles);

function Nav() {
    return (
        <div className={cx('header-nav')}>
            {data.map((item: TData) => (
                <Item key={item.id} name={item.name} to={item.path} />
            ))}
        </div>
    );
}

export default Nav;
