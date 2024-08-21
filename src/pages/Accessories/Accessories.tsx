import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Accessories.module.scss';
import { LayoutProducts } from '../../components/Layout/LayoutProducts';
import { CardItemZoomIn } from '../../components/CardItemZoomIn';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { filterItem, filterItemByPrice, isFilter } from '../../store';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { _T_DataItemHome, useDataInHome } from '../../hooks';
import { getValueFilterInArray } from '../../Helper';
import { Loading } from '../../components/Loading';

const cx = classNames.bind(styles);

function Accessories() {
    const [value, setValue] = useState<[number, number]>([0, 100]);
    const setFilterItem = useSetRecoilState(filterItem);
    const [first, setFisrt] = useState<number>(1);
    const valuess = useRecoilValue(filterItemByPrice);
    const isSubmitFilter = useRecoilValue(isFilter);
    const [dataRender, setDataRender] = useState<_T_DataItemHome[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const data: _T_DataItemHome[] = useDataInHome('products/products/home?type=accessory');

    useEffect(() => {
        document.title = 'Phụ kiện | Petshop chất lượng số 1 Việt Nam!';
        window.scrollTo({
            behavior: 'smooth',
            top: 0,
        });
        setFilterItem('');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setDataRender(data.filter((item: _T_DataItemHome) => item.price >= valuess[0] && item.price <= valuess[1]));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitFilter]);

    useEffect(() => {
        if (data.length > 0) {
            setValue(getValueFilterInArray(data));
            setDataRender(data);
            setIsLoading(false);
        }
    }, [data]);

    const onPageChange = (page: PaginatorPageChangeEvent) => {
        setFisrt(page.first);
        setCurrentPage(++page.page);
    };

    return (
        <div>
            <LayoutProducts title="PHỤ KIỆN" value={value}>
                <>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {!isLoading ? (
                            dataRender.slice((currentPage - 1) * 6, currentPage * 6).map((item: _T_DataItemHome) => (
                                <div key={item.id} className={cx('accessories-item')}>
                                    <CardItemZoomIn
                                        name={item.name}
                                        to={`/product/accessory/${item.id}`}
                                        price={item.price}
                                        title="PHỤ KIỆN"
                                        src={item.previewUrl}
                                    />
                                </div>
                            ))
                        ) : (
                            <Loading />
                        )}
                    </div>

                    {!isLoading && (
                        <div className={cx('paginator-accessory')}>
                            <Paginator
                                first={first}
                                rows={6}
                                totalRecords={dataRender.length}
                                onPageChange={onPageChange}
                            />
                        </div>
                    )}
                </>
            </LayoutProducts>
        </div>
    );
}

export default Accessories;
