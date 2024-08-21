import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

type TProps = {
    children: string;
    href?: string;
    disabled?: boolean;
    to?: string;
    medium?: any;
    small?: any;
    large?: any;
    className?: string;
    primary?: boolean;
    onClick?: (event: MouseEvent) => void;
};

function Button(props: TProps) {
    const { small, medium, large, disabled } = props;

    let Component: any = 'button';

    if (props.disabled) {
        // delete props.disabled;
        // handle off event
    }

    if (props.href) {
        Component = 'a';
    } else if (props.to) {
        Component = Link;
    }

    const classes = cx('wrapper', {
        small,
        medium,
        large,
        disabled,
    });

    return (
        <Component className={classes} {...props}>
            {props.children}
        </Component>
    );
}

export default Button;
