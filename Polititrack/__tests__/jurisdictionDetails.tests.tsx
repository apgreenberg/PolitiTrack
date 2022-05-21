import React from 'react';
import TestRenderer from 'react-test-renderer';
import { MockedProvider, mockSingleLink } from '@apollo/client/testing';
import { GraphQLError } from 'graphql';

import { wait, jurisdictionProps } from './common';
import JurisdictionDetailsScreen from '../src/view/screens/jurisdictions/JurisdictionDetailsScreen';
import { JURISDICTION_DETAILS_QUERY } from '../src/model/api/getJurisdictionDetails';
import gql from 'graphql-tag';

/**
 * Tests the Jurisdiction Details Screen
 */
describe('Jurisdiction Detail tests', () => {
  test('jurisdiction loading and success screen', async () => {
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

    const component = TestRenderer.create(
      <MockedProvider
        mocks={[jurisdictionDetailsMockSuccess]}
        addTypename={false}
      >
        <JurisdictionDetailsScreen {...jurisdictionProps} />
      </MockedProvider>
    );
    const loadingScreen = component.toJSON();
    expect(loadingScreen).toMatchSnapshot();

    await wait();

    const successScreen = component.toJSON();
    expect(successScreen).toMatchSnapshot();
  });
  test('Jurisdiction details network error screen', async () => {
    const jurisdictionDetailsMockNetworkError = {
      request: {
        query: gql`
          ${JURISDICTION_DETAILS_QUERY}
        `,
        variables: {
          id: 'ocd-jurisdiction/country:us/state:ak/government',
        },
      },
      error: new Error('Network error!'),
    };
    const component = TestRenderer.create(
      <MockedProvider
        mocks={[jurisdictionDetailsMockNetworkError]}
        addTypename={false}
      >
        <JurisdictionDetailsScreen {...jurisdictionProps} />
      </MockedProvider>
    );
    await wait();

    const networkErrorScreen = component.toJSON();
    expect(networkErrorScreen).toMatchSnapshot();
  });
  test('Legislature details graphql error screen', async () => {
    const jurisdictionDetailsMockGraphQLError = {
      request: {
        query: gql`
          ${JURISDICTION_DETAILS_QUERY}
        `,
        variables: {
          id: 'ocd-jurisdiction/country:us/state:ak/government',
        },
      },
      result: {
        errors: [new GraphQLError('GraphQL Error!')],
      },
    };
    const component = TestRenderer.create(
      <MockedProvider
        mocks={[jurisdictionDetailsMockGraphQLError]}
        addTypename={false}
      >
        <JurisdictionDetailsScreen {...jurisdictionProps} />
      </MockedProvider>
    );
    await wait();

    const graphqlErrorScreen = component.toJSON();
    expect(graphqlErrorScreen).toMatchSnapshot();
  });
});
