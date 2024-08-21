import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCreative } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import classNames from 'classnames/bind';
import SliderItem from './SliderItem';
import img_1 from '../../../assets/images/img-1-desktop-slider.jpg';
import img_2 from '../../../assets/images/img-2-desktop-slider.jpg';
import img_3 from '../../../assets/images/img-3-desktop-slider.jpg';
import styles from './Sliders.module.scss';

const cx = classNames.bind(styles);

function Sliders() {
    return (
        <div className={cx('sliders')}>
            <Swiper
                slidesPerView={1}
                spaceBetween={0}
                effect={'creative'}
                creativeEffect={{
                    prev: {
                        shadow: true,
                        translate: [0, 0, -400],
                    },
                    next: {
                        translate: ['100%', 0, 0],
                    },
                }}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                speed={500}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                    waitForTransition: true,
                }}
                modules={[Autoplay, Pagination, EffectCreative]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <SliderItem
                        url={img_3}
                        title="MY LIFE"
                        heading="LOVE DOGS"
                        subheading="BOSS LEAVES A LOT OF FOOTPRINTS"
                        description="A man has 3 loyal friends in his life: a good wife, a dog raised since he was a baby and some money of his own"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <SliderItem
                        url={img_1}
                        title="EMPEROR STORY"
                        heading="LOVE CATS"
                        subheading="FROM 2002 TO 2015 AND NOW"
                        description="The world would be filled with love if everyone had the ability to love unconditionally like dogs. Do you like cats?"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <SliderItem
                        url={img_2}
                        title="FRIENDLY"
                        heading="MY LOVE"
                        subheading="ARE YOU WILLING TO LOVE ME"
                        description="The dog by your side is the only thing on earth that loves you more than its own life. Do you like them?"
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default Sliders;
