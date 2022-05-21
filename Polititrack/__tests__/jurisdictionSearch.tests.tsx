import React from 'react';
import TestRenderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import JurisdictionSearchScreen from '../src/view/screens/jurisdictions/JurisdictionSearchScreen';
import { useSelectorMock, userData } from './common';

/**
 * Tests the Jurisdiction Search Screen
 */
describe('Jurisdiction search tests', () => {
  test('Viewing the jurisdiction selection page', async () => {
    useSelectorMock.mockReturnValue(userData);
    const component = TestRenderer.create(
      <MockedProvider mocks={[]} addTypename={false}>
        <JurisdictionSearchScreen />
      </MockedProvider>
    );
    const myJurisdictionsScreen = component.toJSON();
    expect(myJurisdictionsScreen).toMatchSnapshot();
  });
});
