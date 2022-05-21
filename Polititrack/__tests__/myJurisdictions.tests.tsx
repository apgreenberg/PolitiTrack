import React from 'react';
import TestRenderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import MyJurisdictionsScreen from '../src/view/screens/jurisdictions/MyJurisdictionsScreen';
import { useSelectorMock, useDispatchMock, userData } from './common';

/**
 * Tests the My Jurisdictions Screen
 */
describe('My jurisdictions tests', () => {
  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });
  test('Viewing the my jurisdictions page', async () => {
    useSelectorMock.mockReturnValue(userData);
    const component = TestRenderer.create(
      <MockedProvider mocks={[]} addTypename={false}>
        <MyJurisdictionsScreen />
      </MockedProvider>
    );
    const myJurisdictionsScreen = component.toJSON();
    expect(myJurisdictionsScreen).toMatchSnapshot();
    expect(useSelectorMock).toHaveBeenCalled();
  });
});
