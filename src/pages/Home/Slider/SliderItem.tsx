import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/Button';
import routesConfig from '../../../config/routes';
import styles from './Sliders.module.scss';
const cx = classNames.bind(styles);

type TProps = {
    url: any;
    title: string;
    heading: string;
    subheading: string;
    description: string;
};

function SliderItem(props: TProps) {
    return (
        <div className={cx('slider')}>
            <div className={cx('slider-img')}>
                <img src={props.url} alt={props.heading} />
                <div className={cx('info')}>
                    <h3 className={cx('title')}>{props.title}</h3>
                    <h1 className={cx('heading')}>{props.heading}</h1>
                    <p className={cx('subheading')}>{props.subheading}</p>
                    <div className={cx('wrap-description')}>
                        <p className={cx('description')}>{props.description}</p>
                    </div>
                    <Link to={routesConfig.shop} className={cx('btn')}>
                        <Button large={'true'}>SHOP NOW</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SliderItem;
