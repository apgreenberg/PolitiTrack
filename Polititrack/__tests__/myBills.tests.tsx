import React from 'react';
import TestRenderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import MyBillsScreen from '../src/view/screens/bills/MyBillsScreen';
import { useSelectorMock, useDispatchMock, userData } from './common';

/**
 * Tests the My Bills Screen
 */
describe('My bills tests', () => {
  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });
  test('Viewing the my bills page', async () => {
    useSelectorMock.mockReturnValue(userData);
    const component = TestRenderer.create(
      <MockedProvider mocks={[]} addTypename={false}>
        <MyBillsScreen />
      </MockedProvider>
    );
    const myBillsScreen = component.toJSON();
    expect(myBillsScreen).toMatchSnapshot();
    expect(useSelectorMock).toHaveBeenCalled();
  });
});
