import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import BillSearchScreen from '../src/view/screens/bills/BillSearchScreen';
import { wait, useSelectorMock, useDispatchMock, userData } from './common';
import { JURISDICTION_DETAILS_QUERY } from '../src/model/api/getJurisdictionDetails';
import { render } from '@testing-library/react-native';
import gql from 'graphql-tag';

/**
 * Tests the Bill Search Screen
 * This should be expanded for week 4
 */
describe('Bill search tests', () => {
  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });
  test('Viewing the my Bill search page', async () => {
    const jurisdictionDetailsMockSuccess = {
      request: {
        query: gql`
          ${JURISDICTION_DETAILS_QUERY}
        `,
        variables: {
          id: 'ocd-jurisdiction/country:us/state:ak/government',
        },
      },
      result: {
        data: {
          jurisdiction: {
            name: 'Alaska',
            legislativeSessions: {
              edges: [
                {
                  node: {
                    identifier: '31',
                    name: '31st Legislature (2019-2020)',
                    startDate: '2019-01-15',
                    endDate: '2020-05-20',
                  },
                },
                {
                  node: {
                    identifier: '32',
                    name: '32nd Legislature (2021-2022)',
                    startDate: '2021-01-19',
                    endDate: '2021-04-19',
                  },
                },
                {
                  node: {
                    identifier: '27',
                    name: '27th Legislature (2011-2012)',
                    startDate: '',
                    endDate: '',
                  },
                },
                {
                  node: {
                    identifier: '29',
                    name: '29th Legislature (2015-2016)',
                    startDate: '2015-01-19',
                    endDate: '2016-05-18',
                  },
                },
                {
                  node: {
                    identifier: '30',
                    name: '30th Legislature (2017-2018)',
                    startDate: '2017-01-17',
                    endDate: '2018-05-13',
                  },
                },
                {
                  node: {
                    identifier: '28',
                    name: '28th Legislature (2013-2014)',
                    startDate: '2013-01-15',
                    endDate: '2014-04-20',
                  },
                },
              ],
            },
          },
        },
      },
    };
    useSelectorMock.mockReturnValue(userData);
    const { toJSON } = render(
      <MockedProvider
        mocks={[jurisdictionDetailsMockSuccess]}
        addTypename={false}
      >
        <BillSearchScreen />
      </MockedProvider>
    );
    //loading
    expect(toJSON()).toMatchSnapshot();

    await wait();

    //success
    expect(toJSON()).toMatchSnapshot();
  });
});
