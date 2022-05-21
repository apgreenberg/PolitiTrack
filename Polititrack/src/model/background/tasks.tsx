import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';
import { updateExternalDatabase } from '../database/userHelpers';
import { pullCurrentUserInfo } from '../database/handleLogin';
import { UserInfo } from '../database/userInterfaces';

import {
  getJurisdictionDetailsAxios,
  JurisdictionDetails,
} from '../api/getJurisdictionDetails';
import { getBillDetailsAxios, BillDetails } from '../api/getBillDetails';
import { Status } from '../api/helpers';

export const CHECK_FOR_JURISDICTION_UPDATES = 'CHECK_FOR_JURISDICTION_UPDATES';
export const CHECK_FOR_BILL_UPDATES = 'CHECK_FOR_BILL_UPDATES';

/**
 * Checks for updates to the user's saved jurisdictions
 * If one of their jursidictions has just become in session, the user will be notified
 * @param currentUser - the current user
 */
export const checkForJurisdictionUpdates = async (currentUser: UserInfo) => {
  for (let jurisdiction of currentUser.data.jurisdictions) {
    const jurisdictionDetails: JurisdictionDetails = await getJurisdictionDetailsAxios(
      [jurisdiction.id]
    );
    if (jurisdictionDetails.status === Status.Error) {
      console.log(jurisdictionDetails.errorMessage);
      continue;
    }
    if (
      jurisdictionDetails.data.inSession &&
      Date.parse(jurisdictionDetails.data.startDate) > jurisdiction.lastUpdated
    ) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: jurisdiction.name + ' is now in session!',
          body: 'Click for details',
          data: { data: jurisdiction.id },
        },
        trigger: { seconds: 0 },
      });
    }
    jurisdiction.lastUpdated = new Date().getTime();
    await updateExternalDatabase();
  }
};

/**
 * Checks for updates to the user's saved bills
 * If one of their saved bills is updated, they will notified
 * @param currentUser - the current user
 */
export const checkForBillUpdates = async (currentUser: UserInfo) => {
  for (let bill of currentUser.data.bills) {
    const billDetails: BillDetails = await getBillDetailsAxios([bill.id]);
    if (billDetails.status === Status.Error) {
      console.log(billDetails.errorMessage);
      continue;
    }
    if (Date.parse(billDetails.data.updatedAt) > bill.lastUpdated) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Bill updated!',
          body: billDetails.data.title,
          data: { data: bill.id },
        },
        trigger: { seconds: 0 },
      });
    }
    bill.lastUpdated = new Date().getTime();
    await updateExternalDatabase();
  }
};

/**
 * Initializes/defines the tasks so that they can be added/removed from the background fetcher as needed
 */
export function initializeTasks(): void {
  TaskManager.defineTask(CHECK_FOR_JURISDICTION_UPDATES, async () => {
    const currentUser: UserInfo | null = await pullCurrentUserInfo();
    if (currentUser) {
      await checkForJurisdictionUpdates(currentUser);
      return BackgroundFetch.Result.NewData;
    }
    return BackgroundFetch.Result.NoData;
  });

  TaskManager.defineTask(CHECK_FOR_BILL_UPDATES, async () => {
    const currentUser: UserInfo | null = await pullCurrentUserInfo();
    if (currentUser) {
      await checkForBillUpdates(currentUser);
      return BackgroundFetch.Result.NewData;
    }
    return BackgroundFetch.Result.NoData;
  });
}
