import InternalDatabase from './userData';
import { UserInfo } from './userInterfaces';
import { updateExternalDatabase } from './userHelpers';

/**
 * Gets the next available user ID
 * @returns - the user ID, either 1 if they are the first user, or 1 + the user ID of the last user
 */
export const getNextId = (): number => {
  if (InternalDatabase.users.length === 0) {
    return 1;
  }
  return InternalDatabase.users[InternalDatabase.users.length - 1].id + 1;
};

/**
 * Adds a user to the internal and external databases
 * @param newUser - the user to add
 */
export const addUser = async (newUser: UserInfo): Promise<void> => {
  InternalDatabase.users.push(newUser);
  await updateExternalDatabase();
};
