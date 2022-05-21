import { updateExternalDatabase } from './userHelpers';
import { OnboardContent, UserContent, UserInfo } from './userInterfaces';

/*
In the future, this will be generalized to work for bills and legislators as well
*/
/**
 * Adds the requested content to the user
 * @param userInfo - the user to add the content to
 *  * @param type - bills, billTypes, legislatures, or legislators
 * @param toAdd - the content to add
 */
export const addContentToDatabase = async (
  userInfo: UserInfo,
  type: keyof UserContent,
  toAdd: OnboardContent
): Promise<void> => {
  if (!alreadyContains(userInfo, type, toAdd)) {
    userInfo.data[type].push(toAdd);
    alert('Successfully added ' + toAdd.name);
  } else {
    alert('You have already added ' + toAdd.name);
  }
  await updateExternalDatabase();
};

/**
 * Removes the requested content from the user
 * @param userInfo  - the user to remove the content from
 * @param type - bills, billTypes, legislatures, or legislators
 * @param toRemoveId - the id of the content in the users list of content
 */
export const removeContentFromDatabase = async (
  userInfo: UserInfo,
  type: keyof UserContent,
  toRemoveId: string
): Promise<void> => {
  for (let i = 0; i < userInfo.data[type].length; i++) {
    if (userInfo.data[type][i].id === toRemoveId) {
      userInfo.data[type].splice(i, 1);
      break;
    }
  }
  await updateExternalDatabase();
};

/**
 * Helper function - checks if a certain content element already exists in the user's data
 * @param userInfo - the current user's info
 * @param type - the type of content to check
 * @param toAdd - the item the user is attempting to add
 * @returns - true if toAdd is already in the user's data, false otherwise
 */
export const alreadyContains = (
  userInfo: UserInfo,
  type: keyof UserContent,
  toAdd: OnboardContent
): boolean => {
  for (let content of userInfo.data[type]) {
    if (content.id === toAdd.id) {
      return true;
    }
  }
  return false;
};

/**
 * Updates the "lastUpdated" field in the content item
 * @param content - the content item to update
 */
export const updateLastUpdated = async (content: OnboardContent) => {
  content.lastUpdated = new Date().getTime();
  await updateExternalDatabase();
};
