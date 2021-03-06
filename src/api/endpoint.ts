
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
    
    PROFILE: '/user/profile',
    GET_DOCTOR: '/user/doctor/{departmentId}',
    GET_QUESTION: '/user/question',
    FEEDBACK: '/user/feedback',
    BOOK_DOCTOR: '/user/schedule/meeting',
    SCHEDULE: '/user/schedule',
    HISTORY: '/user/schedule/history',

    //admin
    LOGIN_ADMIN: '/cms/auth/login',
    REGISTER_DOCTOR: '/cms/auth/register-doctor/',
    GET_USER: '/cms/user',
    DOCTOR_ADMIN: '/cms/doctor',
    ADD_ACCOUNT: '/cms/auth/register-doctor/',
    FEEDBACK_ADMN: '/cms/feedback'
}
