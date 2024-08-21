import { NavLink } from 'react-router-dom';
import styles from '../Header.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type ItemProps = {
    name: string;
    to: string;
};

function Item(props: ItemProps) {
    return (
        <NavLink className={(nav) => cx('item-link', { active: nav.isActive })} to={props.to}>
            {props.name}
        </NavLink>
    );
}

export default Item;
