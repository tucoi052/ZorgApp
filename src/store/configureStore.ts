import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { ApplicationState } from "./configureAction";
import {
  Reducer as AuthReducer,
  InitState as AuthenticateState,
} from "./authenticate";
import {
  Reducer as ContextReducer,
  InitState as ContextState,
} from "./context";

const AllReducers = {
  ContextState: ContextReducer,
  AuthenticateState: AuthReducer,
};
const AppState: ApplicationState = {
  ContextState: ContextState,
  AuthenticateState: AuthenticateState,
};
const rootReducers = combineReducers({ ...AllReducers });
const middlewares = applyMiddleware(thunk);
const store = createStore(rootReducers, AppState, middlewares);

export default store;
