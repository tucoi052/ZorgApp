import * as Yup from 'yup';
import {DialogMessage} from 'models/message';

import {emailRegExp, passRegExp, nameRegExp} from 'constant';
import {FormStage, Stage, TypeField} from 'models/form';
import {LoginUser, Register} from 'models/auth';

export const Forms: FormStage[] = [
  {
    stage: Stage.LOGIN,
    title: 'Login',
    descriptions: '',
    rows: [
      {
        controls: [
          {
            fieldName: 'email',
            label: 'Email',
            placeholder: 'Email',
            keyboardType: 'email-address',
            type: TypeField.TEXT,
          },
        ],
      },
      {
        controls: [
          {
            fieldName: 'password',
            label: 'Password',
            placeholder: 'Mật khẩu',
            type: TypeField.PASSWORD,
          },
        ],
      },
    ],
  },
  {
    stage: Stage.SIGNUP,
    title: 'Register',
    descriptions: '',
    rows: [
      {
        controls: [
          {
            fieldName: 'firstName',
            label: 'FirstName',
            placeholder: 'Họ',
            type: TypeField.TEXT,
          },
        ],
      },
      {
        controls: [
          {
            fieldName: 'lastName',
            label: 'LastName',
            placeholder: 'Tên',
            type: TypeField.TEXT,
          },
        ],
      },
      {
        controls: [
          {
            fieldName: 'email',
            label: 'Email',
            placeholder: 'Email',
            type: TypeField.TEXT,
            keyboardType: 'email-address'
          },
        ],
      },
      {
        controls: [
          {
            fieldName: 'password',
            label: 'Password',
            placeholder: 'Mật khẩu',
            type: TypeField.PASSWORD,
          },
        ],
      },
      {
        controls: [
          {
            fieldName: "repeatPassword",
            label: "Re-password",
            placeholder: "Xác nhận mật khẩu",
            type: TypeField.PASSWORD,
          },
        ],
      },
    ],
  },
  {
    stage: Stage.NEWPASSWORD,
    title: 'NewPassword',
    descriptions: '',
    rows: [
      {
        controls: [
          {
            fieldName: 'password',
            label: 'Password',
            placeholder: 'Mật khẩu',
            type: TypeField.PASSWORD,
          },
        ],
      },
      {
        controls: [
          {
            fieldName: "repeatPassword",
            label: "Re-password",
            placeholder: "Xác nhận mật khẩu",
            type: TypeField.PASSWORD,
          },
        ],
      },
    ],
  },
];

export const validationSignUpSchema = Yup.object().shape({
  lastName: Yup.string()
    .required('Nhập tên!')
    .matches(nameRegExp, 'Tên không được chứa ký tự đặc biệt!'),
  firstName: Yup.string()
    .required('Nhập họ!')
    .matches(nameRegExp, 'Họ không được chứa ký tự đặc biệt!'),
  email: Yup.string()
    .required('Nhập email!')
    .matches(emailRegExp, 'Email không đúng định dạng user@gmail.com'),

  password: Yup.string()
    // .matches(
    //   passRegExp,
    //   'Your password MUST have at least one UPPERCASE character and one Special (Non-Alphanumeric) character (eg. ! @ # $ % ^ & * ) ',
    // )
    .matches(/^.{8,20}$/,
      'Mật khẩu phải từ 8 đến 20 ký tự!')
    .required('Nhập mật khẩu!'),
  repeatPassword: Yup.string()
  .required('Nhập xác nhận mật khẩu!')
  .oneOf(
    [Yup.ref('password'), null],
    'Xác nhận mật khẩu không đúng!',
  ),
});

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Nhập email!')
    .matches(emailRegExp, 'Email không đúng định dạng user@gmail.com'),
  password: Yup.string().required('Nhập password!'),
});

export const validationForgotSchema = Yup.object().shape({
  email: Yup.string()
    .required('Nhập email!')
    .matches(emailRegExp, 'Email không đúng định dạng user@gmail.com'),
});

export const validationNewPasswordSchema = Yup.object().shape({
  password: Yup.string().nullable()
    .matches(/^.{8,20}$/,
      'Mật khẩu phải từ 8 đến 20 ký tự!')
    .required('Nhập mật khẩu!'),
  repeatPassword: Yup.string().nullable()
  .required('Nhập xác nhận mật khẩu!')
  .oneOf(
    [Yup.ref('password'), null],
    'Xác nhận mật khẩu không đúng!',
  ),
});

export interface AuthenticateState {
  stage: Stage;
  forms: FormStage[];
  user?: LoginUser;
  isLoggedIn?: boolean;
  validationSchema?: any;
  validationSignUpSchema?: any;
  validationForgotSchema?: any;
  validationNewPasswordSchema: any;
  commited: boolean;
  message?: DialogMessage;
  register?: Register;
  email?: string;
  forgotPassword?: any
  newPassword?: any
}
export const InitState: AuthenticateState = {
  stage: Stage.LOGIN,
  forms: Forms,
  user: {
    email: '',
    password: '',
  },
  register: {
    lastName: '',
    firstName: '',
    email: '',
    password: '',
    repeatPassword: '',
  },
  forgotPassword: {
    email: '',
    type: 2
  },
  newPassword: {
    password: '',
    repeatPassword: ''
  },
  validationSchema: validationSchema,
  validationSignUpSchema: validationSignUpSchema,
  validationForgotSchema: validationForgotSchema,
  validationNewPasswordSchema: validationNewPasswordSchema,
  commited: false,
  isLoggedIn: false,
};
