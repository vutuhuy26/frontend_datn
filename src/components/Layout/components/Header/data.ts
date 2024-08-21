import routesConfig from '../../../../config/routes';
type TData = {
    id: number;
    name: string;
    path: string;
};

const data: TData[] = [
    {
        id: 1,
        name: 'Giới thiệu',
        path: routesConfig.description,
    },
    {
        id: 2,
        name: 'Chó cảnh',
        path: routesConfig.dog,
    },
    {
        id: 3,
        name: 'Mèo cảnh',
        path: routesConfig.cat,
    },
    {
        id: 4,
        name: 'Đồ ăn',
        path: routesConfig.food,
    },
    {
        id: 5,
        name: 'Phụ kiện',
        path: routesConfig.accessories,
    },
    {
        id: 6,
        name: 'Tin tức',
        path: routesConfig.news,
    },
    {
        id: 7,
        name: 'Liên hệ',
        path: routesConfig.contact,
    },
];

export { data };
