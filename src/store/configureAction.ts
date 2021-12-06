import { AuthenticateState } from './authenticate/InitState';
import { ContextState } from './context/InitState';
export interface ApplicationState {
    ContextState: ContextState
    AuthenticateState: AuthenticateState,
}
export interface IAction {
    type: string;
}
export interface ThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}