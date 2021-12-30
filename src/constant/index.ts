export const nameRegExp = /\S/;
export const nameLimitExp = /^.{2,50}$/;
export const firstNameExp =
  /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/;
export const phoneNumberExp = /^[0-9]{5,12}$/;
export const emailRegExp = /\S+@\S+\.\S+/;
export const passRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const RouteName = {
  HOME: 'HOME',
  SELECT_DOCTOR: 'SELECT_DOCTOR',
  BOOK_DOCTOR: 'BOOK_DOCTOR',
  DETAIL_BOOK: 'DETAIL_BOOK',
  SETTING: 'SETTING',
  PROFILE: 'PROFILE',
  QUESTION: 'QUESTION',
  FEEDBACK: 'FEEDBACK',
  NOTIFICATION: 'NOTIFICATION',
  SIGN_IN: 'SIGN_IN',
  SIGN_UP: 'SIGN_UP',
  WELCOME: 'WELCOME',
  FORGOTPASSWORD: 'FORGOTPASSWORD',

  HOMETAB: 'Trang chủ',
  SCHEDULETAB: 'Lịch',
  SETTINGTAB: 'Cài đặt',
  HISTORYTAB: 'Lịch sử',
};

export type RouteNameParam = {
  HOME: undefined,
  SETTING: undefined,
  NOTIFICATION: undefined,
  SIGN_IN: undefined,
  SIGN_UP: undefined,
  WELCOME: undefined,

  HOMETAB: undefined,
  SETTINGTAB: undefined,
  NOTITAB: undefined,
};

export const NavigatorName = {
  MainNavigator: 'MainNavigator',
  AuthenNavigator: 'AuthenNavigator',
  BottomTabNavigator: 'BottomTabNavigator',
  DrawNavigator: 'DrawNavigator',
  SplashNavigator: 'SplashNavigator',
}