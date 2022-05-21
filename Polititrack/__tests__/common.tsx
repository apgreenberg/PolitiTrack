/**
 * Just a lot of stuff to assist in running the tests
 */
import TestRenderer from 'react-test-renderer';
import { UserInfo } from '../src/model/database/userInterfaces';
const { act } = TestRenderer;
export async function wait(ms = 0) {
  await act(() => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  });
}

const createJurisdictionTestProps = (props: Object) => ({
  route: {
    params: {
      content: {
        id: 'ocd-jurisdiction/country:us/state:ak/government',
        name: 'Alaska',
      },
    },
  },
  navigation: {
    navigate: jest.fn(),
    setOptions: jest.fn(),
  },
  ...props,
});

export const jurisdictionProps: any = createJurisdictionTestProps({});

const createLegislatorTestProps = (props: Object) => ({
  route: {
    params: {
      content: {
        id: 'ocd-person/bc409660-f360-4624-914f-ba785bbf9b7b',
        name: 'Carol Ammons',
      },
    },
  },
  navigation: {
    navigate: jest.fn(),
    setOptions: jest.fn(),
  },
  ...props,
});

export const legislatorProps: any = createLegislatorTestProps({});

const createBillTestProps = (props: Object) => ({
  route: {
    params: {
      content: {
        id: 'ocd-bill/2bd26615-0165-4f07-a53e-b9739f53dae6',
        name:
          'Authorizes an income tax deduction for the provision of child foster care services',
      },
    },
  },
  navigation: {
    navigate: jest.fn(),
    setOptions: jest.fn(),
  },
  ...props,
});

export const billProps: any = createBillTestProps({});

/**
 * Handle redux
 */
import * as reduxHooks from '../src/redux/hooks';
export const useSelectorMock = jest.spyOn(reduxHooks, 'useAppSelector');
export const useDispatchMock = jest.spyOn(reduxHooks, 'useAppDispatch');
export const loggedInData = {
  loggedIn: true,
};
export const loggedOutData = {
  loggedIn: false,
};
export const userData: UserInfo = {
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
  settings: { updateBills: true, updateJurisdictions: true },
};
