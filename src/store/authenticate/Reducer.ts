import { DialogMessage } from "models/message";
import { Reducer as ReduxReducer } from "redux";
import { ThunkAction } from "store/configureAction";
import { ActionType } from "./ActionType";
import { AuthenticateState, InitState } from "./InitState";
import { LoginUser, Register } from "models/auth";
import store from "store/configureStore";
import { clearToken, client, setRefreshToken, setToken } from "api/client";
import { Endpoint } from "api/endpoint";
import Toast from "react-native-toast-message";
import { showToast } from "components";
import { showLoading } from "components/loading/LoadingModal";
import AsyncStorage from "@react-native-community/async-storage";

interface LoadedAction {
  type: string;
}

interface FieldChangeAction {
  type: string;
  fieldName: string;
  fieldValue?: any;
}

type KnownAction = FieldChangeAction | LoadedAction;

export const ActionCreators = {
  Loading: (): ThunkAction<KnownAction> => (dispatch, getState) => {
    dispatch({
      type: ActionType.LOADING,
    });
  },
  FieldChange:
    (fieldName: string, fieldValue: any): ThunkAction<KnownAction> =>
      (dispatch, getState) => {
        dispatch({
          type: ActionType.FIELD_CHANGE,
          fieldName: fieldName,
          fieldValue: fieldValue,
        });
      },
  Login: (email: string, password: string): ThunkAction<KnownAction> =>
    async (dispatch, getState) => {
      try {
        let body = {
          'email': email,
          'password': password
        }
        const rsp = await client.post(Endpoint.LOGIN, body, true);
        if (rsp && rsp.status == 201) {
          console.log(rsp.data);
          dispatch({
            type: ActionType.FIELD_CHANGE,
            fieldName: 'userType',
            fieldValue: rsp.data.user.userType,
          });
          await setToken(rsp.data.accessToken);
          await setRefreshToken(rsp.data.accessToken);
          await AsyncStorage.setItem('userType', rsp.data.user.userType.toString());
          dispatch({
            type: ActionType.FIELD_CHANGE,
            fieldName: 'isLoggedIn',
            fieldValue: true,
          });
        }
      } catch (error) {
        console.log(error);

        showToast('error', 'Sai t??n t??i kho???n ho???c m???t kh???u!', 'Vui l??ng ki???m tra l???i!');
      }
    },
  LoginAdmin: (email: string, password: string): ThunkAction<KnownAction> =>
    async (dispatch, getState) => {
      try {
        let body = {
          'email': email,
          'password': password
        }
        const rsp = await client.post(Endpoint.LOGIN_ADMIN, body, true);
        if (rsp && rsp.status == 201) {
          console.log(rsp.data);
          dispatch({
            type: ActionType.FIELD_CHANGE,
            fieldName: 'userType',
            fieldValue: rsp.data.user.userType,
          });
          await setToken(rsp.data.accessToken);
          await setRefreshToken(rsp.data.accessToken);
          await AsyncStorage.setItem('userType', rsp.data.user.userType.toString());
          dispatch({
            type: ActionType.FIELD_CHANGE,
            fieldName: 'isLoggedIn',
            fieldValue: true,
          });
        }
      } catch (error) {
        console.log(error);

        showToast('error', 'Sai t??n t??i kho???n ho???c m???t kh???u!', 'Vui l??ng ki???m tra l???i!');
      }
    },
  Logout: (): ThunkAction<KnownAction> =>
    async (dispatch, getState) => {
      try {
        await clearToken();
        dispatch({
          type: ActionType.FIELD_CHANGE,
          fieldName: 'isLoggedIn',
          fieldValue: false,
        });
      } catch (error) {
        showToast('error', 'C?? l???i x???y ra!', 'Vui l??ng th??? l???i!');
      }
    },
  Register: (register: Register): ThunkAction<KnownAction> =>
    async (dispatch, getState) => {
      try {
        delete register.repeatPassword;
        const rsp = await client.post(Endpoint.REGISTER, register, true);
        if (rsp && rsp.status == 201) {
          console.log(rsp.data);
          dispatch({
            type: ActionType.FIELD_CHANGE,
            fieldName: 'userType',
            fieldValue: rsp.data.user.userType,
          });
          await setToken(rsp.data.accessToken);
          await setRefreshToken(rsp.data.accessToken);
          await AsyncStorage.setItem('userType', rsp.data.user.userType.toString());
          dispatch({
            type: ActionType.FIELD_CHANGE,
            fieldName: 'isLoggedIn',
            fieldValue: true,
          });
        }
      } catch (error) {
        showToast('error', error.response.data.message === 'EmailExisted' ? 'Email ???? t???n t???i!' : 'C?? l???i x???y ra!', 'Vui l??ng th??? l???i!');
      }
    },
  ForgotPassword: (forgotPassword: any): ThunkAction<KnownAction> =>
    async (dispatch, getState) => {
      try {
        console.log(forgotPassword);

        const rsp = await client.post(Endpoint.OTP, forgotPassword, {}, true);
        if (rsp && rsp.status == 201) {
          console.log(rsp.data);
          dispatch({
            type: ActionType.FIELD_CHANGE,
            fieldName: 'forgotPassword',
            fieldValue: { ...forgotPassword, otpDone: '1' },
          });
        }
      } catch (error) {
        showToast('error', error.response.data.message === 'EmailExisted' ? 'Email ???? t???n t???i!' : 'C?? l???i x???y ra!', 'Vui l??ng th??? l???i!');
      }
    },
  VerifyOtp: (forgotPassword: any): ThunkAction<KnownAction> =>
    async (dispatch, getState) => {
      try {
        const rsp = await client.post(Endpoint.VERIFY_OTP, forgotPassword, {}, true);
        if (rsp && rsp.status == 201) {
          dispatch({
            type: ActionType.FIELD_CHANGE,
            fieldName: 'forgotPassword',
            fieldValue: { ...forgotPassword, otpDone: '2' },
          });
        }
      } catch (error) {
        showToast('error', 'M?? x??c th???c kh??ng ????ng!', 'Vui l??ng th??? l???i!');
      }
    },
  NewPassword: (forgotPassword: any): ThunkAction<KnownAction> =>
    async (dispatch, getState) => {
      try {
        console.log(forgotPassword,'forgotPassword');
        
        const rsp = await client.post(Endpoint.NEW_PASSWORD, forgotPassword, {}, true);
        if (rsp && rsp.status == 201) {
          showToast('info', 'Thay ?????i m???t kh???u th??nh c??ng!');
          dispatch({
            type: ActionType.FIELD_CHANGE,
            fieldName: 'forgotPassword',
            fieldValue: { ...forgotPassword, otpDone: '3', otp: undefined },
          });
        }
      } catch (error) {
        showToast('error', 'M?? x??c th???c kh??ng ????ng!', 'Vui l??ng th??? l???i!');
      }
    },
};

export const Reducer: ReduxReducer<AuthenticateState, KnownAction> = (
  state: AuthenticateState | undefined,
  incomingAction: KnownAction
): AuthenticateState => {
  if (state == undefined) {
    return InitState;
  }

  let action;
  switch (incomingAction.type) {
    case ActionType.LOADING:
      return {
        ...state,
        message: {
          ...state.message,
          display: false,
        },
        commited: false,
      };
    case ActionType.FIELD_CHANGE:
      action = incomingAction as FieldChangeAction;

      return {
        ...state,
        [action.fieldName]: action.fieldValue,
      };

    default:
      return state;
  }
};
