import AsyncStorage from '@react-native-async-storage/async-storage';

import InternalDatabase from './userData';
import { updateExternalDatabase } from './userHelpers';
import { UserInfo } from './userInterfaces';

/**
 * Attempts to find a user in the internal database
 * @param email - the email of the user to find
 * @param password - the password of the user to find
 * @returns - the user if they are found, null otherwise
 */
export const findUser = (email: string, password: string): UserInfo | null => {
  const allUsers = InternalDatabase.users;
  for (let user of allUsers) {
    if (user.email === email && user.password === password) {
      return user;
    }
  }
  return null;
};

/**
 * Attempts to sign in the current user by updating the
 * 'currentUserInfo' record in AsyncStorage to the user's info
 * @param foundUserInfo - the info of the user to sign in
 */
export const attemptSignIn = async (foundUserInfo: UserInfo): Promise<void> => {
  try {
    await AsyncStorage.setItem(
      'currentUserInfo',
      JSON.stringify(foundUserInfo)
    );
  } catch (e) {
    console.log(e);
  }
};

/**
 * Attempts to sign out the current user by updating the
 * 'currentUserInfo' record in AsyncStorage to null
 */
export const attemptSignOut = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('currentUserInfo');
  } catch (e) {
    console.log(e);
  }
};

/**
 * Attempts to delete a user's account
 * @param id - the id of the user's account to delete
 */
export const attemptDeleteAccount = async (id: number): Promise<void> => {
  for (let i: number = 0; i < InternalDatabase.users.length; i++) {
    if (InternalDatabase.users[i].id === id) {
      InternalDatabase.users.splice(i, 1);
    }
  }
  await updateExternalDatabase();
};

/*
Pulls the user info of the last signed in user from async storage, so user remains signed in
when reopening the app
*/
export const pullCurrentUserInfo = async (): Promise<UserInfo | null> => {
  let userInfo: UserInfo | null = null;
  let userInfoString: string | null = null;
  try {
    userInfoString = await AsyncStorage.getItem('currentUserInfo');
  } catch (e) {
    console.log(e);
  }
  if (userInfoString !== null) {
    userInfo = JSON.parse(userInfoString);
  }
  return userInfo;
};
