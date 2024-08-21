import classNames from 'classnames/bind';
import images from '../../../../assets/images/footer.png';
import Nav from './Nav';
import ActionFooter from './ActionFooter';
import Contact from './Contact';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('footer')}>
            <div className={cx('bg-footer')}>
                <img src={images} alt="images footer" />
                <div className={cx('content')}>
                    <Nav />
                    <ActionFooter />
                    <Contact />
                </div>
            </div>
            <div className={cx('author')}>
                <p>
                    © 2023. Design by Tu Huy <span>❤</span>
                </p>
            </div>
        </footer>
    );
}

export default Footer;
