export type TPostLogin = {
    username: string;
    password: string;
};

export type TPostRegister = {
    name: string;
    email: string;
    confirm_password: string;
    password: string;
};

export type TPostAddToCart = {
    product_id: number;
    customer_id: number;
    quantity: number;
};

export type TPostOrders = {
    customer_id?: number;
    product_id: number;
    quantity: number;
    price: number;
    status?: string;
};

export type TPostCreateAddress = {
    full_name: string;
    customer_id: number;
    phone_number: string;
    main_address: string;
    detail_address: string;
    type: string;
};

export type TPostUpdateAddress = {
    full_name: string;
    id: number;
    phone_number: string;
    main_address: string;
    detail_address: string;
    type: string;
};

export type TPostUpdateCustomer = {
    address?: string;
    phone_number?: string;
    gender?: string;
    birth_date?: string;
    avatar_path?: string;
};

export type TPostUpdatePassword = {
    oldPassword: string;
    password: string;
};

export type TPostAddNewInviteFr = {
    customer_invite: number;
    customer_id: number;
    status?: string;
};

export type TPostAddNewChat = {
    created_by_customer: number;
    customer_id: number;
};

export type TPostNewMessage = {
    conversation_id: number;
    sender_id: number;
    receiver_id: number;
    content: string;
};

export type TPostCheckConversation = {
    customer_id: number;
    created_id: number;
};

export type TData = {
    id: number;
    id_product: number;
    name: string;
    color: string;
    price: number;
    lastPrice: number;
    quantity: number;
    previewUrl: string;
    checked: boolean;
};

export type TProfileUser = {
    id: number;
    userName?: string;
    gender?: string;
    avatarPath?: string;
    address?: string;
    isFriend: boolean;
};

export type T_Product = {
    id: number;
    name: string;
    description: string;
    sub_description: string;
    type: string;
    price: number;
    quantity: number;
    color?: string;
    rate: number;
    preview_url: string;
};

// categories page
export type T_Cart = {
    carts_id: number;
    carts_product_id: number;
    carts_customer_id: number;
    carts_quantity: number;
    customer_address: string;
    customer_avatar_path: string;
    customer_birth_date: string;
    customer_gender: string;
    customer_name: string;
    customer_phone_number: string;
    product_color: string;
    product_description: string;
    product_name: string;
    product_preview_url: string;
    product_price: number;
    product_rate: number;
    product_type: string;
    carts_created_at: string;
};

export type T_Categorys = {
    message: string;
    statusCode: number;
    data: T_Cart[];
};

// type detail page
export type T_Detail = {
    message: string;
    statusCode: number;
    data: T_Product;
};

// suggest page
export type T_Suggest = {
    message: string;
    statusCode: number;
    data: T_Product[];
};

// friend
export type FriendGiveInvite = {
    friendship_id: number;
    customer_name: string;
    customer_avatar_path: string;
    friendship_customerInvite_id: number;
    friendship_customer_id: number;
};

export type Friended = {
    friendship_id: number;
    friendship_customerInvite_id: number;
    friendship_customer_id: number;
    customer_id: number;
    friendship_status: string;
    customer_name: string;
    customer_address: string;
    customer_phone_number: string;
    customer_gender: string;
    customer_birth_date: string;
    customer_avatar_path: string;
};

export type TFriended = {
    message: string;
    statusCode: number;
    data: Friended[];
};

export type T_FriendGiveInvite = {
    message: string;
    statusCode: number;
    data: FriendGiveInvite[];
};

export type CheckConversation = {
    conver_conversation_type: string;
    conver_id: number;
    conver_createdByCustomer_id: number;
    customer_id: number;
    createdByCustomer_id: number;
};

export type TCheckConversation = {
    message: string;
    statusCode: number;
    data: CheckConversation;
};

// conversation
export type Conversation = {
    conver_id: number;
    cus_avatar_path: string;
    cus_name: string;
    cus_id: number;
    sender_id: number;
    messages_content: string;
};

export type T_Conversation = {
    message: string;
    statusCode: number;
    data: Conversation[];
};

// messages
export type Message = {
    message_id: number;
    message_sender_id: number;
    cus_avatar_path: string;
    message_content: string;
};

export type T_Message = {
    message: string;
    statusCode: number;
    data: Message[];
};

// Profile address
export type Address = {
    id: number;
    full_name: string;
    customer_id: number;
    phone_number: string;
    main_address: string;
    detail_address: string;
    type: string;
};

export type T_ProfileAddress = {
    message: string;
    statusCode: number;
    data: Address[];
};

export type T_Customer = {
    id: number;
    name: string;
    email: string;
    address: string;
    phone_number: string;
    gender: string;
    birth_date: string;
    avatar_path: string;
};

export type T_Customers = {
    message: string;
    statusCode: number;
    data: T_Customer[];
};

// customer update
export type T_CustomerUpdate = {
    message: string;
    statusCode: number;
    data: T_Customer;
};

// type login page
export type Customer = {
    id: number;
    name: string;
    email: string;
    gender: string;
    avatar: string;
    address: string;
    phone_number: string;
    birth_day: string;
    access_token: string;
};
export type T_Auth = {
    message: string;
    statusCode: number;
    data: Customer;
};

// type search page
export type T_Search = {
    message: string;
    statusCode: number;
    data: T_Product[];
};

// type shop page
export type T_Shop = {
    message: string;
    statusCode: number;
    data: T_Product[];
};

// type add to cart
export type T_AddCart = {
    message: string;
    statusCode: number;
    data: {
        customer_id: number;
        product_id: number;
        quantity: number;
    };
};

// type orders
export type Orders = {
    orders_id: number;
    orders_product_id: number;
    orders_customer_id: number;
    orders_quantity: number;
    orders_status: string;
    orders_price: number;
    customer_address: string;
    customer_avatar_path: string;
    customer_birth_date: string;
    customer_gender: string;
    customer_name: string;
    customer_phone_number: string;
    product_color: string;
    product_description: string;
    product_name: string;
    product_preview_url: string;
    product_price: number;
    product_rate: number;
    product_type: string;
    orders_created_at: string;
};
export type T_Orders = {
    message: string;
    statusCode: number;
    data: Orders[];
};

// type add order
export type T_AddOrder = {
    message: string;
    statusCode: number;
    data: {
        id: number;
        customer_id: number;
        product_id: number;
        quantity: number;
        price: number;
        status: string;
    }[];
};

// type blogs
export type Blog = {
    id: number;
    title: string;
    preview_url: string;
    description: string;
    created_at: string;
};

export type T_Blog = {
    message: string;
    statusCode: number;
    data: Blog;
};

export type T_Blogs = {
    message: string;
    statusCode: number;
    data: Blog[];
};

// payment
export type T_Payments = {
    message: string;
    statusCode: number;
    data: {
        id: number;
        state: string;
    }[];
};

export type T_Payment = {
    message: string;
    statusCode: number;
    data: {
        id: number;
        state: string;
    };
};

// testttttt

// testt
