import React from 'react';
import TestRenderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import { GraphQLError } from 'graphql';

import { wait, billProps } from './common';
import BillDetailsScreen from '../src/view/screens/bills/BillDetailsScreen';
import { BILL_DETAILS_QUERY } from '../src/model/api/getBillDetails';
import gql from 'graphql-tag';

/**
 * Tests the Bill Details Screen
 */
describe('Bill Detail tests', () => {
  test('bill loading and success screen', async () => {
    const billDetailsMockSuccess = {
      request: {
        query: gql`
          ${BILL_DETAILS_QUERY}
        `,
        variables: {
          id: 'ocd-bill/2bd26615-0165-4f07-a53e-b9739f53dae6',
        },
      },
      result: {
        data: {
          bill: {
            title:
              'Authorizes an income tax deduction for the provision of child foster care services',
            openstatesUrl: 'https://openstates.org/mo/bills/2021/HB429',
            updatedAt: '2021-04-17 07:56:42.948232+00:00',
            fromOrganization: {
              name: 'House',
            },
          },
        },
      },
    };
    const component = TestRenderer.create(
      <MockedProvider mocks={[billDetailsMockSuccess]} addTypename={false}>
        <BillDetailsScreen {...billProps} />
      </MockedProvider>
    );
    const loadingScreen = component.toJSON();
    expect(loadingScreen).toMatchSnapshot();

    await wait();

    const successScreen = component.toJSON();
    expect(successScreen).toMatchSnapshot();
  });
  test('Bill details network error screen', async () => {
    const billDetailsMockNetworkError = {
      request: {
        query: gql`
          ${BILL_DETAILS_QUERY}
        `,
        variables: {
          id: 'ocd-bill/2bd26615-0165-4f07-a53e-b9739f53dae6',
        },
      },
      error: new Error('Network error!'),
    };
    const component = TestRenderer.create(
      <MockedProvider mocks={[billDetailsMockNetworkError]} addTypename={false}>
        <BillDetailsScreen {...billProps} />
      </MockedProvider>
    );
    await wait();

    const networkErrorScreen = component.toJSON();
    expect(networkErrorScreen).toMatchSnapshot();
  });
  test('Legislature details graphql error screen', async () => {
    const billDetailsMockGraphQLError = {
      request: {
        query: gql`
          ${BILL_DETAILS_QUERY}
        `,
        variables: {
          id: 'ocd-bill/2bd26615-0165-4f07-a53e-b9739f53dae6',
        },
      },
      result: {
        errors: [new GraphQLError('GraphQL Error!')],
      },
    };
    const component = TestRenderer.create(
      <MockedProvider mocks={[billDetailsMockGraphQLError]} addTypename={false}>
        <BillDetailsScreen {...billProps} />
      </MockedProvider>
    );
    await wait();

    const graphqlErrorScreen = component.toJSON();
    expect(graphqlErrorScreen).toMatchSnapshot();
  });
});
