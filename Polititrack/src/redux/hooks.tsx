import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { UserInfo } from '../model/database/userInterfaces';
import type { StateWrapper, AppDispatch } from './types';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<StateWrapper> = useSelector;
export const selectLoginState = (state: StateWrapper): boolean =>
  state.loggedIn;
export const selectCurrentUser = (state: StateWrapper): UserInfo =>
  state.currentUser;
