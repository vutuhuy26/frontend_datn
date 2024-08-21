import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { SideBar } from '../components/SideBar';
import styles from './LayoutSideBar.module.scss';
import classNames from 'classnames/bind';
import { ScrollTop } from '../components/ScrollTop';

type TProps = {
    children: React.ReactElement;
};

const cx = classNames.bind(styles);

function LayoutSideBar(props: TProps) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('rest')}>
                <div className={cx('content')}>
                    <SideBar />
                    {props.children}
                </div>
                <Footer />
            </div>
            <ScrollTop />
        </div>
    );
}

export default LayoutSideBar;
