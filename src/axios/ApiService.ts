// UPDATE TYPESCRIPT LATER

import {
    TPostAddNewChat,
    TPostAddNewInviteFr,
    TPostAddToCart,
    TPostCheckConversation,
    TPostCreateAddress,
    TPostLogin,
    TPostNewMessage,
    TPostOrders,
    TPostRegister,
    TPostUpdateAddress,
    TPostUpdateCustomer,
    TPostUpdatePassword,
} from '../models';
import { AxiosClientApi } from './AxiosInstance';

export class ApiService {
    get auth() {
        const route = {
            register: 'register',
            login: 'login',
        };

        return {
            register: (data: TPostRegister): Promise<any> => AxiosClientApi.post(route.register, data),
            login: (data: TPostLogin): Promise<any> => AxiosClientApi.post(route.login, data),
        };
    }

    get products() {
        const route = {
            getProducts: 'products/all',
            getProduct: (id: string) => `products/product/${id}`,
            searchProducts: 'products/search',
            randomProducts: 'products/random',
        };

        return {
            getProducts: (query?: any): Promise<any> => AxiosClientApi.get(route.getProducts, query),
            getProduct: (id: string, query?: any): Promise<any> => AxiosClientApi.get(route.getProduct(id), query),
            searchProducts: (query?: any): Promise<any> => AxiosClientApi.get(route.searchProducts, query),
            randomProducts: (): Promise<any> => AxiosClientApi.get(route.randomProducts),

            route: route,
        };
    }

    get carts() {
        const route = {
            getCartsByUserId: (userId: string) => `carts/cart-by-customer/${userId}`,
            addToCart: 'carts/add-to-cart',
            deleteToCart: (id: string) => `carts/delete-cart/${id}`,
        };

        return {
            getCartsByUserId: (userId: string, token: string) =>
                AxiosClientApi.get(route.getCartsByUserId(userId), null, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }),
            addToCart: (data: TPostAddToCart, token: string) =>
                AxiosClientApi.post(route.addToCart, data, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }),

            deleteToCart: (id: string, token: string) =>
                AxiosClientApi.delete(route.deleteToCart(id), {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }),

            route,
        };
    }

    get orders() {
        const route = {
            addOrder: 'orders/create',
            getOrderById: (userId: string) => `orders/get-order-id/${userId}`,
        };

        return {
            addOrder: (data: TPostOrders[], token: string) =>
                AxiosClientApi.post(route.addOrder, data, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }),
            getOrderById: (userId: string, token: string) =>
                AxiosClientApi.get(route.getOrderById(userId), null, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }),
            route,
        };
    }

    get payments() {
        const route = {
            createVNPAY: 'payment/create',
            addPayment: 'payment/order/create',
            getPaymentById: (id: string) => `payment/order/${id}`,
            updatePaymentById: (id: string) => `payment/order/update/${id}`,
        };

        return {
            createVNPAY: (data: any, token: string) =>
                AxiosClientApi.post(route.createVNPAY, data, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }),
            addPayment: (data: any[], token: string) =>
                AxiosClientApi.post(route.addPayment, data, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }),
            getPaymentById: (id: string, token: string) =>
                AxiosClientApi.get(route.getPaymentById(id), null, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }),
            updatePaymentById: (id: string, data: any, token: string) =>
                AxiosClientApi.put(route.updatePaymentById(id), data, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }),
        };
    }

    get blogs() {
        const route = {
            getBlogById: (blogId: string) => `blogs/blog/${blogId}`,
        };

        return {
            getBlogById: (blogId: string) => AxiosClientApi.get(route.getBlogById(blogId)),
            route,
        };
    }

    get address() {
        const route = {
            getAddresses: 'address/all',
            getAddressesById: (cusId: string) => `address/address/${cusId}`,
            createAddress: 'address/create',
            updateAddress: (id: string) => `address/address/update/${id}`,
            deleteAddress: (id: string) => `address/address/delete/${id}`,
        };

        return {
            getAddresses: (token: string): Promise<any> =>
                AxiosClientApi.get(route.getAddresses, null, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }),
            getAddressesById: (cusId: string, token: string): Promise<any> =>
                AxiosClientApi.get(route.getAddressesById(cusId), null, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }),
            createAddress: (data: TPostCreateAddress, token: string) =>
                AxiosClientApi.post(route.createAddress, data, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }),
            updateAddressById: (id: string, data: TPostUpdateAddress, token: string) =>
                AxiosClientApi.put(route.updateAddress(id), data, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }),
            deleteAddressById: (id: string, token: string) =>
                AxiosClientApi.delete(route.deleteAddress(id), {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }),
            route,
        };
    }

    get customer() {
        const route = {
            getCustomerById: (cusId: string) => `customers/customer/${cusId}`,
            updateCustomerById: (cusId: string) => `customers/update/${cusId}`,
            updatePassword: (cusId: string) => `customers/update/password/${cusId}`,
            updateAddress: (cusId: string) => `customers/update/address/${cusId}`,
            updateAvatar: (cusId: string) => `customers/test/upload/${cusId}`,
            searchCustomers: 'customers/search',
        };

        return {
            getCustomerById: (cusId: string, token: string): Promise<any> =>
                AxiosClientApi.get(route.getCustomerById(cusId), null, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }),
            updateCustomerById: (cusId: string, data: TPostUpdateCustomer, token: string): Promise<any> =>
                AxiosClientApi.put(route.updateCustomerById(cusId), data, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }),
            updatePassword: (cusId: string, data: TPostUpdatePassword, token: string): Promise<any> =>
                AxiosClientApi.put(route.updatePassword(cusId), data, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }),
            updateAddress: (cusId: string, data: { address: string }, token: string): Promise<any> =>
                AxiosClientApi.put(route.updateAddress(cusId), data, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }),
            updateAvatar: (cusId: string, data: any, token: string): Promise<any> =>
                AxiosClientApi.post(route.updateAvatar(cusId), data, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                        'Content-Type': 'multipart/form-data',
                    },
                }),
            searchCustomers: (query: any, token: string) =>
                AxiosClientApi.get(route.searchCustomers, query, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }),
        };
    }
    get friendship() {
        const route = {
            addNewInviteFriend: 'friendship/friendship/create',
            acceptFriendship: 'friendship/friendship/update/status',
            getFriendedById: (frId: string) => `friendship/friendship/friended/${frId}`,
            getFriendInviteById: (frId: string) => `friendship/friendship/invite/${frId}`,
            getFriendGiveInviteById: (frId: string) => `friendship/friendship/give-invite/${frId}`,
            deleteFriendshipById: 'friendship/friendship/delete',
        };

        return {
            addNewInviteFriend: (data: TPostAddNewInviteFr, token: string): Promise<any> =>
                AxiosClientApi.post(route.addNewInviteFriend, data, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }),
            acceptFriendship: (data: TPostAddNewInviteFr, token: string): Promise<any> =>
                AxiosClientApi.post(route.acceptFriendship, data, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }),
            getFriendedById: (frId: string, token: string): Promise<any> =>
                AxiosClientApi.get(route.getFriendedById(frId), null, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }),
            getFriendInviteById: (frId: string, token: string) =>
                AxiosClientApi.get(route.getFriendInviteById(frId), null, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }),

            getFriendGiveInviteById: (frId: string, token: string) =>
                AxiosClientApi.get(route.getFriendGiveInviteById(frId), null, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }),
            deleteFriendshipById: (data: TPostAddNewInviteFr, token: string) =>
                AxiosClientApi.put(route.deleteFriendshipById, data, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }),
        };
    }

    get chats() {
        const route = {
            addNewChat: 'chats/conversations/create',
            addNewMessageByConversationId: '/chats/messages/create',
            checkCreatedConversation: 'chats/conversations/check',
            getCustomerConversationByCreatedId: (id: string) => `chats/conversations/info/${id}`,
            getMessagesByConversationId: (id: string) => `chats/messages/all/${id}`,
            getJoinedConversationsById: (id: string) => `chats/user-conversations/joined/${id}`,
        };

        return {
            addNewChat: (data: TPostAddNewChat, token: string) =>
                AxiosClientApi.post(route.addNewChat, data, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }),

            addNewMessageByConversationId: (data: TPostNewMessage, token: string) =>
                AxiosClientApi.post(route.addNewMessageByConversationId, data, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }),

            checkCreatedConversation: (data: TPostCheckConversation, token: string) =>
                AxiosClientApi.post(route.checkCreatedConversation, data, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }),
            getCustomerConversationByCreatedId: (id: string, token: string) =>
                AxiosClientApi.get(route.getCustomerConversationByCreatedId(id), null, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }),
            getMessagesByConversationId: (id: string, token: string) =>
                AxiosClientApi.get(route.getMessagesByConversationId(id), null, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }),

            getJoinedConversationsById: (id: string, token: string) =>
                AxiosClientApi.get(route.getJoinedConversationsById(id), null, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }),
        };
    }

    get notifications() {
        const route = {
            getNotifications: 'notifications/all',
            getNotificationsById: (id: string) => `notifications/notifications/${id}`,
            createNotification: 'notifications/create',
            updateSeen: (id: string) => `notifications/seen/${id}`,
        };

        return {
            getNotifications: (token: string) =>
                AxiosClientApi.get(route.getNotifications, null, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }),
            getNotificationsById: (id: string, token: string) =>
                AxiosClientApi.get(route.getNotificationsById(id), null, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }),
            createNotification: (data: any, token: string) =>
                AxiosClientApi.post(route.createNotification, data, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }),
            updateSeen: (id: string, token: string) =>
                AxiosClientApi.get(route.updateSeen(id), null, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }),
        };
    }
}
