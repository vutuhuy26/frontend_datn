import { atom } from 'recoil';
import { TData, TProfileUser } from '../models';

export const filterItem = atom<string>({
    key: 'filter',
    default: '',
});

export const filterItemByPrice = atom<[number, number]>({
    key: 'filterByPrice',
    default: [0, 100],
});

export const isFilter = atom<boolean>({
    key: 'isFilter',
    default: false,
});

export const isMenuMobile = atom<boolean>({
    key: 'isMenuMobile',
    default: false,
});

export const orderItems = atom<TData[]>({
    key: 'orderItems',
    default: [],
});

export const dataProfileUser = atom<TProfileUser>({
    key: 'dataProfileUser',
    default: {
        id: 0,
        userName: 'Vũ Tú Huy',
        avatarPath: 'https://dogstar.vn/wp-content/uploads/2022/05/hinh-nen-meo-3d-1.jpg',
        gender: 'Male',
        address: 'Nhổn - Bắc Từ Liêm - Hà Nội',
        isFriend: false,
    },
});
