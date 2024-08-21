export const formatMoney = (amount: any) => {
    if (typeof amount === 'string') {
        return Number(parseFloat(amount)).toLocaleString();
    }

    return Number(amount).toLocaleString();
};

export const getNameFromType = (type: string) => {
    if (type === 'food') return 'ĐỒ ĂN';
    else if (type === 'dog') return 'CHÓ CẢNH';
    else if (type === 'cat') return 'MÈO CẢNH';
    else return 'PHỤ KIỆN';
};

export const getNameFromStatus = (status: string) => {
    if (status === 'processing') return 'Đang xử lý';
    else if (status === 'shipping') return 'Đang giao';
    else if (status === 'finished') return 'Đã giao';
    else if (status === 'refund') return 'Hoàn tiền';
    else return 'Xảy ra lỗi';
};

export const getShuffledArr = (arr: Array<any>) => {
    const newArr = arr.slice();
    for (let i = newArr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }

    return newArr;
};

export const getValueFilterInArray = (arr: Array<any>): [number, number] => {
    const max = Math.max(...arr.map((i) => i.price));
    const min = Math.min(...arr.map((i) => i.price));

    return [min, max];
};

export const base64Encode = (str: string | object) => {
    return btoa(JSON.stringify(str));
};

export const base64Decode = (str: string) => {
    return JSON.parse(atob(str));
};

// function b64EncodeUnicode(str: string) {
//     return btoa(
//         encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
//             return String.fromCharCode(parseInt(p1, 16));
//         }),
//     );
// }

// function b64DecodeUnicode(str: string) {
//     return decodeURIComponent(
//         Array.prototype.map
//             .call(atob(str), function (c) {
//                 return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//             })
//             .join(''),
//     );
// }

export const formatVND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

export const toSeoURL = (url: string): string => {
    return url
        .toString() // Convert to string
        .normalize('NFD') // Change diacritics
        .replace(/[\u0300-\u036f]/g, '') // Remove illegal characters
        .replace(/\s+/g, '-') // Change whitespace to dashes
        .toLowerCase() // Change to lowercase
        .replace(/&/g, '-and-') // Replace ampersand
        .replace(/[^a-z0-9\\-]/g, '') // Remove anything that is not a letter, number or dash
        .replace(/-+/g, '-') // Remove duplicate dashes
        .replace(/^-*/, '') // Remove starting dashes
        .replace(/-*$/, ''); // Remove trailing dashes
};

export const sortObject = (obj: any) => {
    let sorted: any = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
};

export const convertMinutesToHoursAndDays = (minutes: number) => {
    if (minutes < 1) {
        return 'Vừa xong';
    } else {
        if (minutes < 60) {
            return minutes + ' phút trước';
        } else {
            const hours = Math.floor(minutes / 60);
            if (hours < 24) {
                return hours + ' giờ trước';
            } else {
                const days = Math.floor(hours / 24);
                return days + ' ngày trước';
            }
        }
    }
};

export const formatTimeDate = (date: string): string => {
    const dateOld: any = new Date(date);

    console.log('old: ' + dateOld);
    const dateNow: any = new Date();
    console.log('dateNow: ' + dateNow);

    let ms = (dateNow - dateOld) % 86400000;
    let minutes = Math.floor((ms % 3600000) / 60000);

    console.log('minutes: ' + minutes);

    return convertMinutesToHoursAndDays(minutes);
};

export const timeAgo = (timestamp: string) => {
    const seconds = Math.floor(((new Date() as any) - (new Date(timestamp) as any)) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
        return `${interval} năm trước`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        return `${interval} tháng trước`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return `${interval} ngày trước`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return `${interval} giờ trước`;
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        return `${interval} phút trước`;
    }
    return `${Math.floor(seconds)} giây trước`;
};
