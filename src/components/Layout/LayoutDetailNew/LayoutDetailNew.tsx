import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './LayoutDetailNew.module.scss';
import Search from '../../../pages/News/Search';
import { NavBarNewsPage } from '../components/NavBarNewsPage';
import { FaFacebookF, FaGooglePlusG, FaLinkedin, FaPinterestP, FaTwitter } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ApiService } from '../../../axios/ApiService';
import { Blog, T_Blog } from '../../../models';
import routesConfig from '../../../config/routes';
import { Loading } from '../../Loading';

const cx = classNames.bind(styles);

function LayoutDetailNew() {
    const navigate = useNavigate();
    const params = useParams<{ id: string }>();
    const apiService = new ApiService();
    const [data, setData] = useState<Blog>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        document.title = 'Trang chủ | Petshop chất lượng số 1 Việt Nam!';
        window.scrollTo({
            behavior: 'smooth',
            top: 0,
        });
    }, []);

    useEffect(() => {
        if (params.id) {
            apiService.blogs
                .getBlogById(params.id)
                .then((res: T_Blog) => {
                    if (res.message === 'success') {
                        setData(res.data);
                        setIsLoading(false);
                    } else {
                        navigate(routesConfig.notFound);
                    }
                })
                .catch((err) => console.error(err));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id]);

    return (
        <div className={cx('layout-detail-new')}>
            <div
                className={cx('bg-new')}
                style={{
                    height: '350px',
                    backgroundImage: `url(${data?.preview_url})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    position: 'relative',
                }}
            >
                <div className={cx('bg-info')}>
                    <h3 className={cx('title')}>TIN TỨC</h3>
                    <h1 className={cx('heading')}>{data?.title}</h1>
                    <div className={cx('line')}></div>
                </div>
            </div>
            <div className={cx('contents')}>
                <div className={cx('wrapper')}>
                    <div className={cx('bar')}>
                        <Search />
                        <NavBarNewsPage />
                    </div>
                    <div className={cx('new-detail')}>
                        <div className={cx('wrapper-detail')}>
                            {!isLoading ? (
                                <div
                                    className={cx('descriptions')}
                                    dangerouslySetInnerHTML={{
                                        __html: data?.description ?? '',
                                    }}
                                ></div>
                            ) : (
                                <Loading />
                            )}
                            <div className={cx('social')}>
                                <Link to="/" style={{ backgroundColor: '#0e8ef1' }} className={cx('social-item')}>
                                    <FaFacebookF size={'1.6rem'} />
                                    <span>Facebook</span>
                                </Link>
                                <Link style={{ backgroundColor: '#65ccef' }} to="/" className={cx('social-item')}>
                                    <FaTwitter size={'1.6rem'} />
                                    <span>Twitter</span>
                                </Link>
                                <Link style={{ backgroundColor: '#fbbc05' }} to="/" className={cx('social-item')}>
                                    <FaGooglePlusG size={'1.6rem'} />
                                    <span>Google+</span>
                                </Link>
                                <Link style={{ backgroundColor: '#e60023' }} to="/" className={cx('social-item')}>
                                    <FaPinterestP size={'1.6rem'} />
                                    <span>Pinterest</span>
                                </Link>
                                <Link style={{ backgroundColor: '#0a66c2' }} to="/" className={cx('social-item')}>
                                    <FaLinkedin size={'1.6rem'} />
                                    <span>LinkedIn</span>
                                </Link>
                            </div>
                            <div className={cx('comments')}>
                                <div className={cx('header-rate')}>
                                    <h3 className={cx('tab-view-rate-heading')}>Bình luận</h3>
                                    <p className={cx('sub-heading-rate')}>Chưa có bình luận nào!</p>
                                </div>
                                <div className={cx('container-form-rate')}>
                                    <h2 className={cx('form-heading-rate')}>
                                        Hãy để lại bình luận của bạn về bài viết này nhé!
                                    </h2>
                                    <form action="">
                                        <div style={{ paddingTop: '12px' }}>
                                            <p style={{ fontSize: '15px', marginBottom: '4px' }}>Nhận xét của bạn: </p>
                                            <textarea
                                                name="des"
                                                id="des"
                                                style={{
                                                    width: '100%',
                                                    height: 96,
                                                    border: '1px solid #d7d7d7',
                                                    outline: 'none',
                                                    padding: '8px 8px 8px 12px',
                                                    borderRadius: '4px',
                                                }}
                                            ></textarea>
                                        </div>
                                        <div className={cx('form-item')}>
                                            <label htmlFor="name">Tên của bạn: </label>
                                            <input id="name" type="text" placeholder="Your name..." />
                                        </div>
                                        <div className={cx('form-item')}>
                                            <label htmlFor="email">Email: </label>
                                            <input id="email" type="text" placeholder="Email..." />
                                        </div>
                                        <button className={cx('submit-rate')} type="submit">
                                            GỬI ĐI
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LayoutDetailNew;
