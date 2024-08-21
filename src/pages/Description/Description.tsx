import { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Description.module.scss';
import { Title } from '../../components/Title';
import logo from '../../assets/images/sleigh-bell.svg';
import image from '../../assets/images/description_page.jpg';
import dogImage from '../../assets/images/dog_home_logo.png';
import catImage from '../../assets/images/cat_home_logo.png';
import foodImage from '../../assets/images/food_home_logo.png';
import DescriptionItem from './DescriptionItem';

const cx = classNames.bind(styles);

function Description() {
    useEffect(() => {
        document.title = 'Giới thiệu | Petshop chất lượng số 1 Việt Nam!';
        window.scrollTo({
            behavior: 'smooth',
            top: 0,
        });
    }, []);

    return (
        <div className={cx('description')}>
            <Title logo={logo} title="PETS SHOP" />
            <div className={cx('banner')}>
                <img src={image} alt="banner description" />
            </div>
            <div className={cx('contents')}>
                <DescriptionItem
                    logo={dogImage}
                    heading="Pets Shop"
                    description="Bạn là người yêu quý động vật, hãy đến Mona shop nơi cung cấp các loại thú nuôi. Với đa dạng vật nuôi rất mong các bạn ghé thăm và tìm kiếm được con vật bạn yêu thích, rất mong được phục vụ quý khách."
                />
                <DescriptionItem
                    logo={catImage}
                    heading="Pets Shop"
                    description="Dịch vụ chăm sóc thú nuôi với tác phong chuyên nghiệp các bạn hoàn toàn có thể yên tâm khi giao vật nuôi của các bạn cho chúng tôi. Chúng tôi rất mong được phục vụ quý khách."
                />
                <DescriptionItem
                    logo={foodImage}
                    heading="Pets Shop"
                    description="Chuyên cung cấp các loại thức ăn cho vật nuôi đa dang phong phú. Cung cấp phụ kiện, đồ chơi cho từng loài vật nuôi khác nhau."
                />
            </div>
        </div>
    );
}

export default Description;
