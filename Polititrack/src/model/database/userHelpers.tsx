import AsyncStorage from '@react-native-async-storage/async-storage';

import { UserInfo } from './userInterfaces';
import InternalDatabase from './userData';

/**
 * Updates the internal database stored in userData.tsx with any recent changes
 */
export const updateInternalDatabase = async (): Promise<void> => {
  let allUsersString: string | null = null;
  try {
    allUsersString = await AsyncStorage.getItem('allUsers');
  } catch (e) {
    console.log(e);
  }
  if (allUsersString !== null) {
    let allUsers: UserInfo[] = JSON.parse(allUsersString).users;
    InternalDatabase.users = allUsers;
  }
};

/*
Updates the external database stored in AsyncStorage with any recent changes
*/
export const updateExternalDatabase = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem('allUsers', JSON.stringify(InternalDatabase));
  } catch (e) {
    console.log(e);
  }
};
