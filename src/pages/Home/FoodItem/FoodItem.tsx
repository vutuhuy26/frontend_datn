import { Title } from '../../../components/Title';
import styles from './FoodItem.module.scss';
import classNames from 'classnames/bind';
import logo from '../../../assets/images/food_home_logo.png';
import { Button } from '../../../components/Button';
import { CardItemFlip } from '../../../components/CardItemFlip';
import routesConfig from '../../../config/routes';
import { _T_DataItemHome, useDataInHome } from '../../../hooks';

const cx = classNames.bind(styles);

function FoodItem() {
    const data = useDataInHome('products/products/home?limit=8&type=food');

    return (
        <div className={cx('wraper-fooditem')}>
            <Title logo={logo} title="Đồ Ăn" />
            <div className={cx('list-cards')}>
                {data.map((item: _T_DataItemHome) => (
                    <CardItemFlip
                        key={item.id}
                        to={`product/food/${item.id}`}
                        title="ĐỒ ĂN"
                        name={item.name}
                        src={item.previewUrl}
                        price={item.price}
                    />
                ))}
            </div>
            <div className={cx('btn-more')}>
                <Button to={routesConfig.food} medium={'true'}>
                    XEM THÊM
                </Button>
            </div>
        </div>
    );
}

export default FoodItem;
