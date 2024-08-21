import classNames from 'classnames/bind';
import styles from './LayoutDetailProduct.module.scss';
import { SuggestProducts } from '../components/SuggestProducts';
import { NavBarNewsPage } from '../components/NavBarNewsPage';
import { TabView, TabPanel } from 'primereact/tabview';
import { Rating } from 'primereact/rating';
import { Galleria } from 'primereact/galleria';
import { useEffect, useState } from 'react';
import { Similar } from '../components/Similar';
import { formatVND, getNameFromType } from '../../../Helper';
import { Loading } from '../../Loading';
import { useSessionContext } from '../../../context/SessionContext';
import { useConfirmToast } from '../../../context/ConfirmAndToastContext';
import { T_AddCart, T_Product } from '../../../models';
import { ApiService } from '../../../axios/ApiService';
import { useAppContext } from '../../../providers/AppProvider';
import { socketContext } from '../../../context/SocketContext';

const cx = classNames.bind(styles);

type TProps = {
    data: T_Product | undefined;
};

function LayoutDetailProduct(props: TProps) {
    const [quantity, setQuantity] = useState<number>(1);
    const [infoUser] = useSessionContext();
    const message = useConfirmToast();
    const apiService = new ApiService();
    const { isConnected } = useAppContext();

    const data = [
        {
            id: 1,
            url: props.data?.preview_url,
            thumb: props.data?.preview_url,
            alt: 'description',
        },
        {
            id: 2,
            url: props.data?.preview_url,
            thumb: props.data?.preview_url,
            alt: 'description',
        },
        {
            id: 3,
            url: props.data?.preview_url,
            thumb: props.data?.preview_url,
            alt: 'description',
        },
    ];

    useEffect(() => {
        document.title = 'Trang chủ | Petshop chất lượng số 1 Việt Nam!';
        window.scrollTo({
            behavior: 'smooth',
            top: 0,
        });
    }, [props.data]);

    const handleAddToCart = () => {
        if (infoUser.isAuth) {
            apiService.carts
                .addToCart(
                    {
                        product_id: props.data?.id ?? 0,
                        customer_id: infoUser.user?.id ?? 0,
                        quantity: quantity,
                    },
                    infoUser.user?.token ?? '',
                )
                .then((res: T_AddCart) => {
                    if (res.message === 'success') {
                        if (isConnected) {
                            socketContext.emit('add-to-cart', {
                                id: res.data.product_id,
                                status: 'success',
                            });
                        }

                        message?.toast?.current?.show({
                            severity: 'success',
                            summary: 'Thành công',
                            detail: 'Thêm thành công',
                            life: 1500,
                        });
                    } else {
                        message?.toast?.current?.show({
                            severity: 'error',
                            summary: 'Có lỗi',
                            detail: 'Sản phẩm này đã tồn tại trong giỏ hàng!',
                            life: 1500,
                        });
                    }
                })
                .catch((err) => console.error(err));
        } else {
            message?.toast?.current?.show({
                severity: 'error',
                summary: 'Có lỗi',
                detail: 'Bạn chưa đăng nhập, vui lòng đăng nhập để mua hàng!',
                life: 1500,
            });
        }
    };

    const itemTemplate = (item: any) => {
        return item && <img src={item.url} alt={item.alt} style={{ width: '100%' }} />;
    };

    const thumbnailTemplate = (item: any) => {
        return <img src={item.thumb} alt={item.alt} style={{ width: 64, height: 64 }} />;
    };

    return (
        <div className={cx('layout-detail-product')}>
            {props.data ? (
                <div className={cx('contents')}>
                    <div className={cx('nav-bar')}>
                        <SuggestProducts />
                        <NavBarNewsPage />
                    </div>
                    <div className={cx('detail')}>
                        <div className={cx('detail-wrapper')}>
                            <div className={cx('slider')}>
                                <Galleria
                                    value={data}
                                    item={itemTemplate}
                                    draggable={false}
                                    showThumbnailNavigators={false}
                                    thumbnail={thumbnailTemplate}
                                    style={{ width: '100%' }}
                                />
                            </div>
                            <div className={cx('info')}>
                                <div className={cx('info-header')}>
                                    <h5 className={cx('title')}>
                                        <span>TRANG CHỦ /</span> {getNameFromType(props.data.type)}
                                    </h5>
                                    <h3 className={cx('name-pro')}>{props.data.name}</h3>
                                </div>
                                <span className={cx('line')} />
                                <div className={cx('info-content')}>
                                    <p className={cx('price')}>{formatVND.format(props.data.price)}</p>
                                    <p className={cx('description')}>{props.data.description}</p>
                                </div>
                                <div className={cx('info-actions')}>
                                    <div className={cx('count')}>
                                        <p
                                            onClick={() => {
                                                setQuantity((prev) => {
                                                    const quantity = prev - 1;
                                                    if (quantity <= 0) {
                                                        return 1;
                                                    } else {
                                                        return quantity;
                                                    }
                                                });
                                            }}
                                            className={cx('p_1')}
                                        >
                                            -
                                        </p>
                                        <p className={cx('p_2')}>{quantity}</p>
                                        <p
                                            onClick={() => {
                                                setQuantity((prev) => prev + 1);
                                            }}
                                            className={cx('p_3')}
                                        >
                                            +
                                        </p>
                                    </div>
                                    <div className={cx('add-to-cart')}>
                                        <button onClick={handleAddToCart}>THÊM VÀO GIỎ</button>
                                    </div>
                                </div>
                                <div className={cx('line-hint')}></div>
                                <p className={cx('note')}>Danh mục: {getNameFromType(props.data.type)}</p>
                            </div>
                        </div>

                        <div className={cx('spacer-w')} />
                        <div className={cx('tab-view')}>
                            <TabView>
                                <TabPanel header="MÔ TẢ">
                                    <div
                                        className={cx('wrapper-tab-sub-description')}
                                        dangerouslySetInnerHTML={{
                                            __html: props.data.sub_description,
                                        }}
                                    ></div>
                                </TabPanel>
                                <TabPanel header="ĐÁNH GIÁ">
                                    <div className={cx('header-rate')}>
                                        <h3 className={cx('tab-view-rate-heading')}>Đánh giá</h3>
                                        <p className={cx('sub-heading-rate')}>Chưa có đánh giá nào!</p>
                                    </div>
                                    <div className={cx('container-form-rate')}>
                                        <h2 className={cx('form-heading-rate')}>
                                            Hãy là người đầu tiên nhận xét “{props.data.name}”{' '}
                                        </h2>
                                        <form action="">
                                            <div style={{ paddingTop: '12px' }}>
                                                <p style={{ fontSize: '15px', marginBottom: '4px' }}>
                                                    Đánh giá của bạn
                                                </p>
                                                <Rating cancel={false} />
                                            </div>
                                            <div style={{ paddingTop: '12px' }}>
                                                <p style={{ fontSize: '15px', marginBottom: '4px' }}>
                                                    Nhận xét của bạn:{' '}
                                                </p>
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
                                </TabPanel>
                                <TabPanel header="CHÍNH SÁCH BẢO HÀNH">
                                    <p className={cx('description-tab-view')}>
                                        Chính sách bảo hành của riêng mỗi hãng:
                                    </p>
                                    <p className={cx('description-tab-view')}>
                                        CASIO: Bảo hành chính hãng máy 1 năm, pin 1,5 năm
                                    </p>
                                    <p className={cx('description-tab-view')}>
                                        CITIZEN: Bảo hành chính hãng toàn cầu máy 1 năm, pin 1 năm
                                    </p>
                                    <p className={cx('description-tab-view')}>
                                        SEIKO: Bảo hành chính hãng toàn cầu máy 1 năm, pin 1 năm
                                    </p>
                                    <p className={cx('description-tab-view')}>
                                        ORIENT: Bảo hành chính hãng toàn cầu máy 1 năm, pin 1 năm
                                    </p>
                                    <p className={cx('description-tab-view')}>
                                        OP: Bảo hành chính hãng máy 2 năm, pin 1 năm
                                    </p>
                                    <p className={cx('description-tab-view')}>
                                        RHYTHM: Bảo hành chính hãng máy 1 năm, pin 1 năm
                                    </p>
                                    <p className={cx('description-tab-view')}>
                                        OGIVAL: Bảo hành chính hãng máy 2 năm, pin 1 năm
                                    </p>
                                    <p className={cx('description-tab-view')}>
                                        ELLE: Bảo hành chính hãng máy 2 năm, pin 2 năm
                                    </p>
                                    <p className={cx('description-tab-view')}>
                                        TISSOT: Bảo hành chính hãng máy 2 năm, pin 1 năm
                                    </p>
                                </TabPanel>
                            </TabView>
                        </div>
                        <div style={{ padding: '0 16px' }}>
                            <h6 className={cx('heading-menu-similar')}>SẢN PHẨM TƯƠNG TỰ</h6>
                            <Similar />
                        </div>
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
}

export default LayoutDetailProduct;
