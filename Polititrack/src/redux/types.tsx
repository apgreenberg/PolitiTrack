import { UserInfo } from '../model/database/userInterfaces';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { store } from './store';

//Action types
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export interface LoginAction {
  type: typeof LOGIN;
  payload: UserInfo;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export type Actions = LoginAction | LogoutAction;

//State interface typing
export interface StateWrapper {
  loggedIn: boolean;
  currentUser: UserInfo;
}

//Dispatch types
export type ThunkActionType<ReturnType = void> = ThunkAction<
  ReturnType,
  StateWrapper,
  unknown,
  Actions
>;

export type ThunkDispatchType = ThunkDispatch<StateWrapper, undefined, Actions>;

export type AppDispatch = typeof store.dispatch;
