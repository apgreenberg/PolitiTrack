import React from 'react';
import TestRenderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import { GraphQLError } from 'graphql';

import { wait, legislatorProps } from './common';
import LegislatorDetailsScreen from '../src/view/screens/legislators/LegislatorDetailsScreen';
import { LEGISLATOR_DETAILS_QUERY } from '../src/model/api/getLegislatorDetails';

/**
 * Tests the Legislator Details Screen
 */
describe('Legislator Detail tests', () => {
  test('legislator loading and success screen', async () => {
    const legislatorDetailsMockSuccess = {
      request: {
        query: LEGISLATOR_DETAILS_QUERY,
        variables: {
          id: 'ocd-person/bc409660-f360-4624-914f-ba785bbf9b7b',
        },
      },
      result: {
        data: {
          person: {
            email: 'Assistance@StateRepCarolAmmons.com',
            image:
              'http://ilga.gov/images/members/{BD4B7A5C-6D24-4E82-9C18-D5A0F3C42F6C}.jpg',
            primaryParty: 'Democratic',
          },
        },
      },
    };
    const component = TestRenderer.create(
      <MockedProvider
        mocks={[legislatorDetailsMockSuccess]}
        addTypename={false}
      >
        <LegislatorDetailsScreen {...legislatorProps} />
      </MockedProvider>
    );
    const loadingScreen = component.toJSON();
    expect(loadingScreen).toMatchSnapshot();

    await wait();

    const successScreen = component.toJSON();
    expect(successScreen).toMatchSnapshot();
  });
  test('Legislator details network error screen', async () => {
    const legislatorDetailsMockNetworkError = {
      request: {
        query: LEGISLATOR_DETAILS_QUERY,
        variables: {
          id: 'ocd-person/bc409660-f360-4624-914f-ba785bbf9b7b',
        },
      },
      error: new Error('Network error!'),
    };
    const component = TestRenderer.create(
      <MockedProvider
        mocks={[legislatorDetailsMockNetworkError]}
        addTypename={false}
      >
        <LegislatorDetailsScreen {...legislatorProps} />
      </MockedProvider>
    );
    await wait();

    const networkErrorScreen = component.toJSON();
    expect(networkErrorScreen).toMatchSnapshot();
  });
  test('Legislature details graphql error screen', async () => {
    const legislatorDetailsMockGraphQLError = {
      request: {
        query: LEGISLATOR_DETAILS_QUERY,
        variables: {
          id: 'ocd-person/bc409660-f360-4624-914f-ba785bbf9b7b',
        },
      },
      result: {
        errors: [new GraphQLError('GraphQL Error!')],
      },
    };
    const component = TestRenderer.create(
      <MockedProvider
        mocks={[legislatorDetailsMockGraphQLError]}
        addTypename={false}
      >
        <LegislatorDetailsScreen {...legislatorProps} />
      </MockedProvider>
    );
    await wait();

    const graphqlErrorScreen = component.toJSON();
    expect(graphqlErrorScreen).toMatchSnapshot();
  });
});
