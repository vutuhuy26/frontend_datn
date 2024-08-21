import { useEffect } from 'react';
import classNames from 'classnames/bind';
import { Flash } from './Flash';
import styles from './Home.module.scss';
import Sliders from './Slider/Sliders';
import { DogItem } from './DogItem';
import banner from '../../assets/images/banner_dog.jpg';
import cat1 from '../../assets/images/banner_cat_1.jpg';
import cat2 from '../../assets/images/banner_cat_2.jpg';
import { CatItem } from './CatItem';
import { FoodItem } from './FoodItem';
import { UseFul } from './UseFul';

const cx = classNames.bind(styles);

function Home() {
    useEffect(() => {
        document.title = 'Trang chủ | Petshop chất lượng số 1 Việt Nam!';
        window.scrollTo({
            behavior: 'smooth',
            top: 0,
        });
    }, []);

    return (
        <div className={cx('home')}>
            <div className={cx('sliders')}>
                <Sliders />
            </div>
            <Flash />
            <DogItem />
            <div className={cx('banner')}>
                <img src={banner} alt="banner dog" />
            </div>
            <CatItem />
            <div className={cx('banner-cat')}>
                <div className={cx('banner-cat-1')}>
                    <img src={cat2} alt="cats-banner" />
                </div>
                <div className={cx('banner-cat-1')}>
                    <img src={cat1} alt="cats-banner" />
                </div>
            </div>
            <FoodItem />
            <UseFul />
        </div>
    );
}

export default Home;
