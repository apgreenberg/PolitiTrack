import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import ProfileScreen from '../src/view/screens/ProfileScreen';
import { render, fireEvent } from '@testing-library/react-native';

import { useSelectorMock, userData } from './common';

import * as actions from '../src/redux/actions';
const signOutMock = jest.spyOn(actions, 'signOut');

/**
 * Tests the Landing screen operates correctly if the user is signed in/signed out
 */
describe('Profile tests', () => {
  test('Viewing the profile page', () => {
    useSelectorMock.mockReturnValue(userData);
    const { toJSON } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <ProfileScreen />
      </MockedProvider>
    );
    expect(toJSON()).toMatchSnapshot();
  });
  test('Test pressing the sign out button', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <ProfileScreen />
      </MockedProvider>
    );
    fireEvent(getByTestId('signOutButton'), 'onPress');
    expect(signOutMock).toHaveBeenCalled();
  });
});
