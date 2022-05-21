import React from 'react';
import TestRenderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import MyLegislatorsScreen from '../src/view/screens/legislators/MyLegislatorsScreen';
import { useSelectorMock, useDispatchMock, userData } from './common';

/**
 * Tests the My Legislators Screen
 */
describe('My legislators tests', () => {
  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });
  test('Viewing the my legislators page', async () => {
    useSelectorMock.mockReturnValue(userData);
    const component = TestRenderer.create(
      <MockedProvider mocks={[]} addTypename={false}>
        <MyLegislatorsScreen />
      </MockedProvider>
    );
    const myLegislatorsScreen = component.toJSON();
    expect(myLegislatorsScreen).toMatchSnapshot();
    expect(useSelectorMock).toHaveBeenCalled();
  });
});
