export interface AllUserData {
  users: UserInfo[];
}
export interface UserInfo {
  id: number;
  token: string;
  email: string;
  password: string;
  name: string;
  data: UserContent;
  settings: UserSettings;
}
export interface UserContent {
  jurisdictions: OnboardContent[];
  bills: OnboardContent[];
  billTypes: OnboardContent[];
  legislators: OnboardContent[];
}
export interface UserSettings {
  updateJurisdictions: boolean;
  updateBills: boolean;
}
export interface UserUpdates {
  jurisdictions: Date;
  bills: Date;
}
export interface OnboardContent {
  id: string;
  name: string;
  lastUpdated: number;
}
export const blankUserInfo: UserInfo = {
  id: 0,
  token: '',
  email: '',
  password: '',
  name: '',
  data: { jurisdictions: [], bills: [], billTypes: [], legislators: [] },
  settings: { updateJurisdictions: false, updateBills: false },
};
