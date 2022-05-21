import { updateExternalDatabase } from './userHelpers';
import { UserInfo } from './userInterfaces';

export const updateProfile = (
  userInfo: UserInfo,
  type: keyof UserInfo,
  newValue: string
): void => {
  if (type === 'name' || type === 'email' || type === 'password') {
    userInfo[type] = newValue;
  }
  updateExternalDatabase();
};
