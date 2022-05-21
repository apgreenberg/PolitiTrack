import React from 'react';
import TestRenderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import SettingsScreen from '../src/view/screens/SettingsScreen';
import { useSelectorMock, userData } from './common';

import * as handleSettings from '../src/model/database/handleSettings';
let mockToggleSetting = jest
  .spyOn(handleSettings, 'toggleSetting')
  .mockImplementation(() => Promise.resolve());

/**
 * Tests the settings page
 */
describe('Tests the settings screen and toggling the notifications', () => {
  useSelectorMock.mockReturnValue(userData);
  beforeEach(() => {
    mockToggleSetting.mockClear();
  });
  test('Viewing the settings page', () => {
    const { toJSON } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <SettingsScreen />
      </MockedProvider>
    );
    expect(toJSON()).toMatchSnapshot();
  });
  test('Toggle the bill notifications', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <SettingsScreen />
      </MockedProvider>
    );
    fireEvent(getByTestId('jurisdictionSetting'), 'onValueChange');
    expect(mockToggleSetting).toHaveBeenCalled();
  });
  test('Toggle the jurisdiction notifications', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <SettingsScreen />
      </MockedProvider>
    );
    fireEvent(getByTestId('billSetting'), 'onValueChange');
    expect(mockToggleSetting).toHaveBeenCalled();
  });
});
