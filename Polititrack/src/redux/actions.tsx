import { ThunkActionType } from './types';
import { ActionCreator, Dispatch } from 'redux';
import {
  attemptSignIn,
  attemptSignOut,
  attemptDeleteAccount,
  findUser,
  pullCurrentUserInfo,
} from '../model/database/handleLogin';
import { getNextId, addUser } from '../model/database/handleSignUp';
import { updateInternalDatabase } from '../model/database/userHelpers';
import { UserInfo } from '../model/database/userInterfaces';
import {
  initializeNotifications,
  removeNotifications,
} from '../model/background/notifications';

/**
 * Checks if the user exists and if so signs them in
 * @param email - the user's email
 * @param password - the user's password
 * @returns - An action to modify the logged in state
 */
export const signIn: ActionCreator<ThunkActionType> = (
  email: string,
  password: string
) => {
  return async (dispatch: Dispatch) => {
    const foundUserInfo: UserInfo | null = findUser(email, password);
    if (foundUserInfo !== null) {
      await attemptSignIn(foundUserInfo);
      await initializeNotifications(foundUserInfo);
      dispatch({ type: 'LOGIN', payload: foundUserInfo });
    } else {
      alert('User does not exist!');
    }
  };
};

/**
 * Signs out the current user
 * @returns - an action to modify the logged in state
 */
export const signOut: ActionCreator<ThunkActionType> = () => {
  return async (dispatch: Dispatch) => {
    await attemptSignOut();
    await removeNotifications();
    dispatch({ type: 'LOGOUT' });
  };
};

/**
 * Signs up a new user and logs them in
 * @param email - the new user's email
 * @param password - the new user's password
 * @returns - an action to modify the logged in state
 */
export const signUp: ActionCreator<ThunkActionType> = (
  email: string,
  password: string
) => {
  return async (dispatch: Dispatch) => {
    const id: number = getNextId();
    const newUser: UserInfo = {
      id: id,
      token: 'abc',
      email: email,
      password: password,
      name: 'default name',
      data: { jurisdictions: [], bills: [], billTypes: [], legislators: [] },
      settings: { updateJurisdictions: false, updateBills: false },
    };
    await addUser(newUser);
    await attemptSignIn(newUser);
    await initializeNotifications(newUser);
    dispatch({ type: 'LOGIN', payload: newUser });
  };
};

/**
 * Retrieves the past user from AsyncStorage if there is one
 * @returns - an action to modify the logged in state
 */
export const retrievePastUser: ActionCreator<ThunkActionType> = () => {
  return async (dispatch: Dispatch) => {
    await updateInternalDatabase();
    const userInfo: UserInfo | null = await pullCurrentUserInfo();
    if (userInfo !== null) {
      await initializeNotifications(userInfo);
      dispatch({ type: 'LOGIN', payload: userInfo });
    }
  };
};

/**
 * Logs out and deletes the user with the associated id
 * @param id - the user to delete
 * @returns - an action to modify the logged in state
 */
export const deleteAccount: ActionCreator<ThunkActionType> = (id: number) => {
  return async (dispatch: Dispatch) => {
    await attemptSignOut();
    await removeNotifications();
    await attemptDeleteAccount(id);
    dispatch({ type: 'LOGOUT' });
  };
};
