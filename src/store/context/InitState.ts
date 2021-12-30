import { emailRegExp, nameRegExp, phoneNumberExp } from "constant";
import { FormStage, Stage, TypeField } from "models/form";
import { FeedBack, Profile } from "models/user";
import { Theme } from "utils/Theme";
import * as Yup from "yup";

export const Forms: FormStage[] = [
  {
    stage: Stage.PROFILE1,
    title: 'Profile',
    descriptions: '',
    rows: [
      {
        controls: [
          {
            fieldName: 'firstName',
            label: 'Họ',
            placeholder: 'Họ',
            type: TypeField.TEXT,
          },
        ],
      },
      {
        controls: [
          {
            fieldName: 'lastName',
            label: 'Tên',
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
            fieldName: 'dob',
            label: 'Ngày sinh',
            type: TypeField.DATEPICKER,
          },
        ],
      },
      {
        controls: [
          {
            fieldName: 'gender',
            label: 'Giới tính',
            type: TypeField.RADIOBUTTON,
          },
        ],
      },
      
    ],
  },
  {
    stage: Stage.PROFILE2,
    title: 'Profile',
    descriptions: '',
    rows: [
      {
        controls: [
          {
            fieldName: "nationality",
            label: "Quốc tịch",
            placeholder: "Ví dụ: Việt Nam",
            type: TypeField.TEXT,
          },
        ],
      },
      {
        controls: [
          {
            fieldName: "phone",
            label: "Số điện thoại",
            placeholder: "Nhập số điện thoại",
            type: TypeField.TEXT,
            keyboardType: 'phone-pad'
          },
        ],
      },
      {
        controls: [
          {
            fieldName: 'identifiedType',
            label: 'Loại giấy tờ của bạn',
            type: TypeField.RADIOBUTTON,
          },
        ],
      },
      {
        controls: [
          {
            fieldName: 'identifiedId',
            label: 'Số Chứng minh nhân dân, Căn cước công dân hoặc Số Hộ chiếu',
            placeholder: 'Ví dụ: 00123456789',
            type: TypeField.TEXT,
          },
        ],
      },
    ],
  },
  {
    stage: Stage.FEEDBACK,
    title: 'Profile',
    descriptions: '',
    rows: [
      {
        controls: [
          {
            fieldName: 'title',
            label: 'Tiêu đề',
            placeholder: 'Tiêu đề',
            type: TypeField.TEXT,
          },
        ],
      },
      {
        controls: [
          {
            fieldName: 'content',
            label: 'Nội dung',
            placeholder: 'Nội dung',
            type: TypeField.TEXT,
          },
        ],
      },
    ],
  },
];


export const validationInfoSchema = Yup.object().shape({
  lastName: Yup.string()
    .required('Nhập tên!')
    .matches(nameRegExp, 'Tên không được chứa ký tự đặc biệt!'),
  firstName: Yup.string()
    .required('Nhập họ!')
    .matches(nameRegExp, 'Họ không được chứa ký tự đặc biệt!'),
  email: Yup.string()
    .required('Nhập email!')
    .matches(emailRegExp, 'Email không đúng định dạng user@gmail.com'),
  dob: Yup.string().nullable()
    .required('Chọn ngày sinh!'),
  gender: Yup.string().nullable()
  .required('Chọn giới tính!'),
});

export const validationInfo2Schema = Yup.object().shape({
  identifiedType: Yup.string().nullable()
    .required('Chọn loại giấy tờ của bạn!'),
  identifiedId: Yup.string().nullable()
    .required('Nhập số CMND hoặc hộ chiếu!')
    .matches(nameRegExp, 'Số CMND hoặc hộ chiếu không được chứa ký tự đặc biệt!'),
  phone: Yup.string().nullable()
    .required('Nhập số điện thoại!')
    .matches(phoneNumberExp, 'Số điện thoại không đúng định dạng!'),
  nationality: Yup.string().nullable()
    .required('Nhập quốc tịch!')
});

export const validationFeedBackSchema = Yup.object().shape({
  title: Yup.string()
    .required('Nhập tiêu đề!'),
  content: Yup.string()
    .required('Nhập nội dung!')
});

export interface ContextState {
  isConnection: boolean;
  version?: string;
  theme?: any;
  locale?: string;
  displayIntro?: boolean;
  displaySplash?: boolean;
  message?: string;
  loaded?: boolean;
  forms?: FormStage[],
  profile?: Profile
  validationInfoSchema?: any
  validationInfo2Schema?: any,
  listDoctor?: Profile[],
  loadmore?: any,
  listQuestion?: any,
  loadmoreQuestion?: any,
  feedback?: FeedBack,
  validationFeedBackSchema?: any,
  isChangeStatus?: any,
  listSchedule?: any
  listHistory?: any,
  detailBook?: any
}

export const InitState: ContextState = {
  isConnection: true,
  theme: Theme.DARK,
  displaySplash: true,
  locale: "VN",
  forms: Forms,
  validationInfoSchema: validationInfoSchema,
  validationInfo2Schema: validationInfo2Schema,
  loadmore: {
    offset: 0,
    isEnd: false
  },
  loadmoreQuestion: {
    offset: 0,
    isEnd: false
  },
  feedback: {
    title: '',
    content: ''
  },
  validationFeedBackSchema: validationFeedBackSchema
};
