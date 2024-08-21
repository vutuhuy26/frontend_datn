import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import classNames from 'classnames/bind';
import styles from './Similar.module.scss';
import { CardItem } from '../../../CardItem';
import img_1 from '../../../../assets/images/dog_item_1.jpg';
import img_2 from '../../../../assets/images/dog_item_2.jpg';
import img_3 from '../../../../assets/images/dog_item_3.jpg';
import img_4 from '../../../../assets/images/dog_item_4.jpg';

const cx = classNames.bind(styles);

function Similar() {
    return (
        <div className={cx('similar')}>
            <Swiper
                slidesPerView={2}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                }}
                spaceBetween={20}
                speed={500}
                className="mySwiper"
            >
                <SwiperSlide>
                    <CardItem
                        to="/product/dog/36"
                        title="CHÓ CẢNH"
                        name="Chó American Eskimo"
                        src={img_1}
                        price={14000000}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <CardItem
                        to="/product/dog/36"
                        title="CHÓ CẢNH"
                        name="Chó American Eskimo"
                        src={img_2}
                        price={14000000}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <CardItem
                        to="/product/dog/36"
                        title="CHÓ CẢNH"
                        name="Chó American Eskimo"
                        src={img_3}
                        price={14000000}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <CardItem
                        to="/product/dog/36"
                        title="CHÓ CẢNH"
                        name="Chó American Eskimo"
                        src={img_4}
                        price={14000000}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <CardItem
                        to="/product/dog/36"
                        title="CHÓ CẢNH"
                        name="Chó American Eskimo"
                        src={img_1}
                        price={14000000}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <CardItem
                        to="/product/dog/36"
                        title="CHÓ CẢNH"
                        name="Chó American Eskimo"
                        src={img_2}
                        price={14000000}
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default Similar;
