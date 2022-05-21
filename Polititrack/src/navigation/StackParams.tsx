/**
 * The stack parameters for the Profile and My Bills stack navigation
 * Most are undefined but I will use them in the future
 */

import { OnboardContent } from '../model/database/userInterfaces';

export type StackParams = {
  Profile: undefined;
  'My Bills': undefined;
  'My Favorite Bill Types': undefined;
  'Bill Search': undefined;
  'Bill Details': { content: OnboardContent };
  'My Jurisdictions': undefined;
  'Add Jurisdictions': undefined;
  'Jurisdiction Details': { content: OnboardContent };
  'My Legislators': undefined;
  'Find My Legislators': undefined;
  'Legislator Details': { content: OnboardContent };
  Settings: undefined;
  'Update Account Information': undefined;
  'Bill Abstract': { content: OnboardContent };
  'Bill Sponsors': { content: OnboardContent };
  'Bill Versions': { content: OnboardContent };
  'Bill Vote History': { content: OnboardContent };
  'Jurisdiction Committees': { content: OnboardContent };
  'Jurisdiction District Maps': { content: OnboardContent };
  'Jurisdiction Members': { content: OnboardContent };
  'Legislator Committees': { content: OnboardContent };
  'Legislator Voting History': { content: OnboardContent };
};
