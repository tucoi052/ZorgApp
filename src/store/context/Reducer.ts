import { Reducer as ReduxReducer } from "redux";
import { ThunkAction } from "store/configureAction";
import { ActionType } from "./ActionType";
import { ContextState, InitState } from "./InitState";

interface Loading {
  type: string;
  loading?: boolean;
}

interface FieldChangeAction {
  type: string;
  fieldName: any;
  fieldValue: any;
}
export type KnowAction = Loading | FieldChangeAction;

export const ActionCreators = {
  FieldChange:
    (fieldName: string, fieldValue: any): ThunkAction<KnowAction> =>
    (dispatch, getState) => {
      dispatch({
        type: ActionType.FIELD_CHANGE,
        fieldName: fieldName,
        fieldValue: fieldValue,
      });
    },
};

export const Reducer: ReduxReducer<ContextState, KnowAction> = (
  state: ContextState | undefined,
  incomingAction: KnowAction
): ContextState => {
  if (state == undefined) {
    return InitState;
  }
  let action;
  switch (incomingAction.type) {
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
