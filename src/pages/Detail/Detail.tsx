import { LayoutDetailProduct } from '../../components/Layout/LayoutDetailProduct';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { T_Detail, T_Product } from '../../models';
import { ApiService } from '../../axios/ApiService';

function Detail() {
    const params = useParams();
    const [data, setData] = useState<T_Product>();
    const apiService = new ApiService();

    useEffect(() => {
        if (params.id) {
            apiService.products
                .getProduct(`${params.id}`)
                .then((res: T_Detail) => {
                    if (res.message === 'success') {
                        setData(res.data);
                    }
                })
                .catch((err) => console.error(err));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    return <LayoutDetailProduct data={data} />;
}

export default Detail;
