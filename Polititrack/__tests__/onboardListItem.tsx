import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';

import { OnPressActions } from '../src/view/components/lists/helpers/types';
import OnboardDataList from '../src/view/components/lists/OnboardDataList';
import { OnboardContent } from '../src/model/database/userInterfaces';

/**
 * Tests the Onboard Content List
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
const data: OnboardContent[] = [
  {
    id: 'id1',
    name: 'name1',
    lastUpdated: new Date().getTime(),
  },
  {
    id: 'id2',
    name: 'name2',
    lastUpdated: new Date().getTime(),
  },
  {
    id: 'id2',
    name: 'name2',
    lastUpdated: new Date().getTime(),
  },
  {
    id: 'id2',
    name: 'name2',
    lastUpdated: new Date().getTime(),
  },
];
describe('Tests the Onboard Content list', () => {
  beforeEach(() => {
    mainSwipeButtonOnPress.mockClear();
    addSwipeButtonOnPress.mockClear();
    deleteSwipeButtonOnPress.mockClear();
  });
  test('list renders correctly', async () => {
    const { toJSON } = render(
      <OnboardDataList data={data} onPressActions={onPressActions} />
    );
    expect(toJSON()).toMatchSnapshot();
  });
  test('test swipe row button clicks', async () => {
    const { getAllByTestId } = render(
      <OnboardDataList data={data} onPressActions={onPressActions} />
    );
    fireEvent(getAllByTestId('mainSwipeButton')[0], 'onPress');
    expect(mainSwipeButtonOnPress).toHaveBeenCalled();
    fireEvent(getAllByTestId('addSwipeButton')[0], 'onPress');
    expect(addSwipeButtonOnPress).toHaveBeenCalled();
    fireEvent(getAllByTestId('deleteSwipeButton')[0], 'onPress');
    expect(deleteSwipeButtonOnPress).toHaveBeenCalled();
  });
  test('test swipe row button visibility', async () => {
    const { queryByTestId } = render(
      <OnboardDataList
        data={data}
        onPressActions={onPressActionsNotClickable}
      />
    );
    expect(queryByTestId('addSwipeButton')).toBeNull();
    expect(queryByTestId('deleteSwipeButton')).toBeNull();
  });
});
