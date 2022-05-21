import {
  removeJurisdictionUpdateNotifications,
  removeBillUpdateNotifications,
  addJurisdictionUpdateNotifications,
  addBillUpdateNotifications,
} from '../background/notifications';
import { updateExternalDatabase } from './userHelpers';
import { UserInfo, UserSettings } from './userInterfaces';

/**
 * Handles updating the setting and the external database
 * @param userInfo - the current user's info
 * @param type - the type of setting to change
 * @param newValue - the new value of the setting
 */
export const updateSetting = async (
  userInfo: UserInfo,
  type: keyof UserSettings,
  newValue: boolean
): Promise<void> => {
  userInfo.settings[type] = newValue;
  await updateExternalDatabase();
};

/**
 * Handles toggling a setting
 * @param userInfo - the current user's info
 * @param type - the type of setting to change
 * @param callback - a callback function for updating the value state
 */
export const toggleSetting = async (
  userInfo: UserInfo,
  type: keyof UserSettings,
  callback: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> => {
  if (userInfo.settings[type]) {
    await updateSetting(userInfo, type, false);
    if (type === 'updateJurisdictions') {
      await removeJurisdictionUpdateNotifications();
    } else if (type === 'updateBills') {
      await removeBillUpdateNotifications();
    }
    callback(false);
  } else {
    await updateSetting(userInfo, type, true);
    if (type === 'updateJurisdictions') {
      await addJurisdictionUpdateNotifications();
    } else if (type === 'updateBills') {
      await addBillUpdateNotifications();
    }
    callback(true);
  }
};
