import { string } from "yup/lib/locale"

export interface Profile {
    createdDate: any;
    updatedDate: any;
    lastLoginDate: any;
    isOnline: any;
    lastOnlineDate: any;
    id: any;
    passwordHash: any;
    firstName: String,
    lastName: String,
    dob: Date,
    email: String,
    nationality: String,
    identifiedType: String,
    identifiedId: String,
    phone: Number,
    userType?: Number,
    gender: Number,
    status?: Number,
}

export interface FeedBack {
    title: string;
    content: string;
}