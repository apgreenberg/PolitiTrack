import React from 'react';
import TestRenderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import { GraphQLError } from 'graphql';
import { gql } from '@apollo/client';

import { wait } from './common';
import { OnPressActions } from '../src/view/components/lists/helpers/types';
import APISingleResponseListItem from '../src/view/components/lists/APISingleResponseListItem';
import {
  getJurisdictionDetails,
  JURISDICTION_DETAILS_QUERY,
} from '../src/model/api/getJurisdictionDetails';

/**
 * Tests the API Single Response List
 */
const mainSwipeButtonOnPress = jest.fn();
const addSwipeButtonOnPress = jest.fn();
const deleteSwipeButtonOnPress = jest.fn();
const onPressActions: OnPressActions = {
  clickable: true,
  onPress: mainSwipeButtonOnPress,
  addable: true,
  addOnPress: addSwipeButtonOnPress,
  deletable: true,
  deleteOnPress: deleteSwipeButtonOnPress,
};
const onPressActionsNotClickable: OnPressActions = {
  clickable: false,
  onPress: mainSwipeButtonOnPress,
  addable: false,
  addOnPress: addSwipeButtonOnPress,
  deletable: false,
  deleteOnPress: deleteSwipeButtonOnPress,
};
const listMockSuccess = {
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
describe('Tests the API Single Response List', () => {
  beforeEach(() => {
    mainSwipeButtonOnPress.mockClear();
    addSwipeButtonOnPress.mockClear();
    deleteSwipeButtonOnPress.mockClear();
  });
  test('list loading and success screen', async () => {
    const { toJSON } = render(
      <MockedProvider mocks={[listMockSuccess]} addTypename={false}>
        <APISingleResponseListItem
          getData={getJurisdictionDetails}
          requestParams={['ocd-jurisdiction/country:us/state:ak/government']}
          onPressActions={onPressActions}
          displayText=""
        />
      </MockedProvider>
    );
    expect(toJSON()).toMatchSnapshot();

    await wait();

    expect(toJSON()).toMatchSnapshot();
  });
  test('test swipe row button clicks', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[listMockSuccess]} addTypename={false}>
        <APISingleResponseListItem
          getData={getJurisdictionDetails}
          requestParams={['ocd-jurisdiction/country:us/state:ak/government']}
          onPressActions={onPressActions}
          displayText=""
        />
      </MockedProvider>
    );
    await wait();
    fireEvent(getByTestId('mainSwipeButton'), 'onPress');
    expect(mainSwipeButtonOnPress).toHaveBeenCalled();
    fireEvent(getByTestId('addSwipeButton'), 'onPress');
    expect(addSwipeButtonOnPress).toHaveBeenCalled();
    fireEvent(getByTestId('deleteSwipeButton'), 'onPress');
    expect(deleteSwipeButtonOnPress).toHaveBeenCalled();
  });
  test('test swipe row button visibility', async () => {
    const { queryByTestId } = render(
      <MockedProvider mocks={[listMockSuccess]} addTypename={false}>
        <APISingleResponseListItem
          getData={getJurisdictionDetails}
          requestParams={['ocd-jurisdiction/country:us/state:ak/government']}
          onPressActions={onPressActionsNotClickable}
          displayText=""
        />
      </MockedProvider>
    );
    await wait();
    expect(queryByTestId('addSwipeButton')).toBeNull();
    expect(queryByTestId('deleteSwipeButton')).toBeNull();
  });
  test('list network error screen', async () => {
    const billDetailsMockNetworkError = {
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
      <MockedProvider mocks={[billDetailsMockNetworkError]} addTypename={false}>
        <APISingleResponseListItem
          getData={getJurisdictionDetails}
          requestParams={['ocd-jurisdiction/country:us/state:ak/government']}
          onPressActions={onPressActions}
          displayText=""
        />
      </MockedProvider>
    );
    await wait();

    const networkErrorScreen = component.toJSON();
    expect(networkErrorScreen).toMatchSnapshot();
  });
  test('list graphql error screen', async () => {
    const billDetailsMockGraphQLError = {
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
      <MockedProvider mocks={[billDetailsMockGraphQLError]} addTypename={false}>
        <APISingleResponseListItem
          getData={getJurisdictionDetails}
          requestParams={['ocd-jurisdiction/country:us/state:ak/government']}
          onPressActions={onPressActions}
          displayText=""
        />
      </MockedProvider>
    );
    await wait();

    const graphqlErrorScreen = component.toJSON();
    expect(graphqlErrorScreen).toMatchSnapshot();
  });
});
