import React from 'react';
import TestRenderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import { GraphQLError } from 'graphql';

import { wait } from './common';
import { OnPressActions } from '../src/view/components/lists/helpers/types';
import APIMultiResponseList from '../src/view/components/lists/APIMultiResponseList';
import {
  getBillSearchResults,
  BILL_SEARCH_QUERY,
} from '../src/model/api/getBillSearchResults';

/**
 * Tests the API Multi-Response List
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
    query: BILL_SEARCH_QUERY,
    variables: {
      jurisdiction: 'Illinois',
      session: '102nd',
      searchQuery: 'taxes',
    },
  },
  result: {
    data: {
      bills: {
        edges: [
          {
            node: {
              title: 'CANNABIS-PENALTIES<21-POSSESS',
              id: 'ocd-bill/fb3ccb2d-5764-48a5-86b7-7d17d4238023',
            },
          },
          {
            node: {
              title: 'NOT-FOR-PROFIT BUS ENTERPRISE',
              id: 'ocd-bill/cd5bbf34-80b7-4edf-8eaa-9b0666e194ff',
            },
          },
          {
            node: {
              title: 'CORPORATE GIVEAWAYS COMPACT',
              id: 'ocd-bill/8cd91504-9a14-4f0d-bd62-1d36b1f88bc6',
            },
          },
          {
            node: {
              title: 'INCOME TAX-PASS THROUGH',
              id: 'ocd-bill/35957129-7c14-4ebf-b867-bdb2d62f1caa',
            },
          },
        ],
      },
    },
  },
};
describe('Tests the API Multi-Response List', () => {
  beforeEach(() => {
    mainSwipeButtonOnPress.mockClear();
    addSwipeButtonOnPress.mockClear();
    deleteSwipeButtonOnPress.mockClear();
  });
  test('list loading and success screen', async () => {
    const { toJSON } = render(
      <MockedProvider mocks={[listMockSuccess]} addTypename={false}>
        <APIMultiResponseList
          getData={getBillSearchResults}
          requestParams={['Illinois', '102nd', 'taxes']}
          onPressActions={onPressActions}
        />
      </MockedProvider>
    );
    expect(toJSON()).toMatchSnapshot();

    await wait();

    expect(toJSON()).toMatchSnapshot();
  });
  test('test swipe row button clicks', async () => {
    const { getAllByTestId } = render(
      <MockedProvider mocks={[listMockSuccess]} addTypename={false}>
        <APIMultiResponseList
          getData={getBillSearchResults}
          requestParams={['Illinois', '102nd', 'taxes']}
          onPressActions={onPressActions}
        />
      </MockedProvider>
    );
    await wait();
    fireEvent(getAllByTestId('mainSwipeButton')[0], 'onPress');
    expect(mainSwipeButtonOnPress).toHaveBeenCalled();
    fireEvent(getAllByTestId('addSwipeButton')[0], 'onPress');
    expect(addSwipeButtonOnPress).toHaveBeenCalled();
    fireEvent(getAllByTestId('deleteSwipeButton')[0], 'onPress');
    expect(deleteSwipeButtonOnPress).toHaveBeenCalled();
  });
  test('test swipe row button visibility', async () => {
    const { queryByTestId } = render(
      <MockedProvider mocks={[listMockSuccess]} addTypename={false}>
        <APIMultiResponseList
          getData={getBillSearchResults}
          requestParams={['Illinois', '102nd', 'taxes']}
          onPressActions={onPressActionsNotClickable}
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
        query: BILL_SEARCH_QUERY,
        variables: {
          jurisdiction: 'Illinois',
          session: '102nd',
          searchQuery: 'taxes',
        },
      },
      error: new Error('Network error!'),
    };
    const component = TestRenderer.create(
      <MockedProvider mocks={[billDetailsMockNetworkError]} addTypename={false}>
        <APIMultiResponseList
          getData={getBillSearchResults}
          requestParams={['Illinois', '102nd', 'taxes']}
          onPressActions={onPressActions}
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
        query: BILL_SEARCH_QUERY,
        variables: {
          jurisdiction: 'Illinois',
          session: '102nd',
          searchQuery: 'taxes',
        },
      },
      result: {
        errors: [new GraphQLError('GraphQL Error!')],
      },
    };
    const component = TestRenderer.create(
      <MockedProvider mocks={[billDetailsMockGraphQLError]} addTypename={false}>
        <APIMultiResponseList
          getData={getBillSearchResults}
          requestParams={['Illinois', '102nd', 'taxes']}
          onPressActions={onPressActions}
        />
      </MockedProvider>
    );
    await wait();

    const graphqlErrorScreen = component.toJSON();
    expect(graphqlErrorScreen).toMatchSnapshot();
  });
});
