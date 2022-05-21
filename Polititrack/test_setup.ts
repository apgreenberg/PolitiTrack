import 'react-native-gesture-handler/jestSetup';
import '@testing-library/jest-native';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

export const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
    useIsFocused: () => true,
  };
});

export const mockOpenBrowserAsync = jest.fn();
jest.mock('expo-web-browser', () => {
  return {
    openBrowserAsync: () => mockOpenBrowserAsync,
  };
});

jest.mock('@react-native-async-storage/async-storage', () => {
  const asyncMock = require('@react-native-async-storage/async-storage/jest/async-storage-mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op

  return asyncMock;
});

export const mockSelector = jest.fn();
mockSelector.mockReturnValue({
  state: {
    loggedIn: true,
    currentUser: {
      data: {
        billTypes: [
          {
            id: 'taxes',
            name: 'taxes',
            lastUpdated: new Date().getTime(),
          },
        ],
        bills: [
          {
            id: 'ocd-bill/70e9fe2b-e35f-4f1c-8a06-504612ff3467',
            name: 'Modifies provisions relating to benevolent tax credits',
            lastUpdated: new Date().getTime(),
          },
          {
            id: 'ocd-bill/df011824-02c4-47b3-9672-45a43cd2ba76',
            name: 'Changes provisions related to funding for charter schools',
            lastUpdated: new Date().getTime(),
          },
          {
            id: 'ocd-bill/7b25f40a-0dd0-4cb8-af09-1afcced56760',
            name:
              'Allows Southeast Missouri State University to develop a statewide mission',
            lastUpdated: new Date().getTime(),
          },
          {
            id: 'ocd-bill/2bd26615-0165-4f07-a53e-b9739f53dae6',
            name:
              'Authorizes an income tax deduction for the provision of child foster care services',
            lastUpdated: new Date().getTime(),
          },
        ],
        jurisdictions: [
          {
            id: 'ocd-jurisdiction/country:us/state:de/government',
            name: 'Delaware',
            lastUpdated: new Date().getTime(),
          },
          {
            id: 'ocd-jurisdiction/country:us/state:ks/government',
            name: 'Kansas',
            lastUpdated: new Date().getTime(),
          },
          {
            id: 'ocd-jurisdiction/country:us/state:mo/government',
            name: 'Missouri',
            lastUpdated: new Date().getTime(),
          },
        ],
        legislators: [
          {
            id: 'ocd-person/86147150-e615-43a2-a748-e95d06627ad3',
            name: 'Scott M. Bennett',
            lastUpdated: new Date().getTime(),
          },
          {
            id: 'ocd-person/bc409660-f360-4624-914f-ba785bbf9b7b',
            name: 'Carol Ammons',
            lastUpdated: new Date().getTime(),
          },
        ],
      },
      email: 'ari.greenberg99@gmail.com',
      id: 1,
      name: 'default name',
      password: '*FoR*high*515',
      token: 'abc',
      settings: {
        updateBills: true,
        updateJurisdictions: true,
      },
    },
  },
});
export const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: () => mockSelector,
  useDispatch: () => mockDispatch,
}));

export const mockRegisterTaskAsync = jest.fn();
export const mockUnregisterTaskAsync = jest.fn();
jest.mock('expo-background-fetch', () => {
  return {
    registerTaskAsync: () => mockRegisterTaskAsync,
    unegisterTaskAsync: () => mockUnregisterTaskAsync,
  };
});

export const mockDefineTask = jest.fn();
export const mockIsTaskRegisteredAsync = jest.fn();
jest.mock('expo-task-manager', () => {
  return {
    defineTask: () => mockDefineTask,
    isTaskRegisteredAsync: () => mockUnregisterTaskAsync,
  };
});
export const mockSetNotificationHandler = jest.fn();
export const mockGetPermissionsAsync = jest.fn();
export const mockRequestPermissionsAsync = jest.fn();
export const mockScheduleNotificationAsync = jest.fn();
jest.mock('expo-notifications', () => {
  return {
    setNotificationHandler: () => mockSetNotificationHandler,
    getPermissionsAsync: () => mockGetPermissionsAsync,
    requestPermissionsAsync: () => mockRequestPermissionsAsync,
    scheduleNotificationAsync: () => mockScheduleNotificationAsync,
  };
});
