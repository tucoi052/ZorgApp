
export const DOMAIN = 'http://103.163.214.75:3000/api'

export const Endpoint = {

    //user
    LOGIN: '/user/auth/login',
    OTP: '/user/auth/otp',
    VERIFY_OTP: '/user/auth/verify-otp',
    REGISTER: '/user/auth/register',
    REFRESH_TOKEN: '/user/auth/refresh-token',
    CHANGE_PASSWORD: '/user/auth/change-password',
    NEW_PASSWORD: '/user/auth/new-password',
    
    DELETE_HELP: '/shop/contacts/delete',
    COD: '/shop/cash-flow',
    COD_HISTORY: '/shop/reconcile-history',
    ORDER_DRAFT: '/draft-order/list',
    CREATE_ORDER_DRAFT: '/draft-order/create',
    UPDATE_ORDER_DRAFT: '/draft-order/update',
    DELETE_ORDER_DRAFT: '/draft-order/delete',
    CREATE_ORDER_DRAFT_TO_ORDER: 'draft-order/create-order',
    SETTING: '/order/setting-by-shop',
    INFO_SHOP: '/shop/get',
    UPDATE_INFO_SHOP: '/shop/update-shop',
    CALCULATOR_FEE: '/order/calculator-fee-by-shop',
    CREATE_ORDER: '/order/store-by-shop',
    GET_NOTIFICATION: '/shop/notification-list',
    READ_NOTIFICATION: '/shop/notification-read',
    LIST_EMPLOYE: '/shop/staffs/list',
    CREATE_EMPLOYE: '/shop/staffs/store',
    DELETE_EMPLOYE: '/shop/staffs/delete',
    UPDATE_EMPLOYE: '/shop/staffs/update',
    SEARCH: 'order/search-by-shop'

}
