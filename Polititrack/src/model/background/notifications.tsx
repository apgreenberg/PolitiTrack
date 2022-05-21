import * as BackgroundFetch from 'expo-background-fetch';
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import { UserInfo } from '../database/userInterfaces';
import {
  CHECK_FOR_JURISDICTION_UPDATES,
  CHECK_FOR_BILL_UPDATES,
} from './tasks';

/**
 * Initializes the notifications by dispatching notifications which align with the user's settings
 * @param currentUser - the current user
 */
export const initializeNotifications = async (
  currentUser: UserInfo
): Promise<void> => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Notifications are turned off for this app.');
    return;
  }
  if (currentUser.settings.updateJurisdictions) {
    await addJurisdictionUpdateNotifications();
  }
  if (currentUser.settings.updateBills) {
    await addBillUpdateNotifications();
  }
};

/**
 * Removes all of the notifications from the background fetcher
 */
export const removeNotifications = async () => {
  await removeJurisdictionUpdateNotifications();
  await removeBillUpdateNotifications();
};

/**
 * Adds the jurisdiction update notifcation to the background fetcher
 */
export async function addJurisdictionUpdateNotifications(): Promise<void> {
  await BackgroundFetch.registerTaskAsync(CHECK_FOR_JURISDICTION_UPDATES, {
    minimumInterval: 43200, // 12 hours
  });
}

/**
 * Adds the bill update notification to the background fetcher
 */
export async function addBillUpdateNotifications(): Promise<void> {
  await BackgroundFetch.registerTaskAsync(CHECK_FOR_BILL_UPDATES, {
    minimumInterval: 43200, // 12 hours
  });
}

/**
 * Removes the jurisdiction update notification from the background fetcher if it was added
 */
export async function removeJurisdictionUpdateNotifications(): Promise<void> {
  const isRegistered = await TaskManager.isTaskRegisteredAsync(
    CHECK_FOR_JURISDICTION_UPDATES
  );
  if (isRegistered) {
    await BackgroundFetch.unregisterTaskAsync(CHECK_FOR_JURISDICTION_UPDATES);
  }
}

/**
 *  * Removes the bill update notification from the background fetcher if it was added
 */
export async function removeBillUpdateNotifications(): Promise<void> {
  const isRegistered = await TaskManager.isTaskRegisteredAsync(
    CHECK_FOR_BILL_UPDATES
  );
  if (isRegistered) {
    await BackgroundFetch.unregisterTaskAsync(CHECK_FOR_BILL_UPDATES);
  }
}
