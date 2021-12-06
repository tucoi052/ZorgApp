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
        const rsp = await client.post(Endpoint.LOGIN, body);
        if (rsp && rsp.status == 201) {
          console.log(rsp.data);

          await setToken(rsp.data.accessToken);
          await setRefreshToken(rsp.data.accessToken);
          dispatch({
            type: ActionType.FIELD_CHANGE,
            fieldName: 'isLoggedIn',
            fieldValue: true,
          });
        }
      } catch (error) {
        showToast('error', 'Sai tên tài khoản hoặc mật khẩu!', 'Vui lòng kiểm tra lại!');
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
        showToast('error', 'Có lỗi xảy ra!', 'Vui lòng thử lại!');
      }
    },
    Register: (register: Register): ThunkAction<KnownAction> =>
    async (dispatch, getState) => {
      try {
          console.log(register);
          
        // let body = {
        //   'email': email,
        //   'password': password
        // }
        // const rsp = await client.post(Endpoint.LOGIN, body);
        // if (rsp && rsp.status == 201) {
        //   console.log(rsp.data);

        //   await setToken(rsp.data.accessToken);
        //   await setRefreshToken(rsp.data.accessToken);
        //   dispatch({
        //     type: ActionType.FIELD_CHANGE,
        //     fieldName: 'isLoggedIn',
        //     fieldValue: true,
        //   });
        // }
      } catch (error) {
        showToast('error', 'Có lỗi xảy ra!', 'Vui lòng thử lại!');
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
