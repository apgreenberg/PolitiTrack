import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import UpdateAccountInfocreen from '../src/view/screens/UpdateAccountInfoScreen';
import { useSelectorMock, userData } from './common';
import { toBeDisabled } from '@testing-library/jest-native';
expect.extend({ toBeDisabled });

/**
 * Tests the update account info page
 */
describe('Tests the updatr account page', () => {
  useSelectorMock.mockReturnValue(userData);
  test('Viewing the update account info page', () => {
    const { toJSON } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <UpdateAccountInfocreen />
      </MockedProvider>
    );
    expect(toJSON()).toMatchSnapshot();
  });
  test('Test that submit is disabled when name/email input is empty', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <UpdateAccountInfocreen />
      </MockedProvider>
    );
    expect(getByTestId('nameSaveButton')).toBeDisabled();
  });
  test('Test that submit is enabled when name/email is not empty', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <UpdateAccountInfocreen />
      </MockedProvider>
    );
    fireEvent.changeText(getByTestId('nameInput'), 'Ari');
    expect(getByTestId('nameSaveButton')).not.toBeDisabled();
  });
  test('Test that submit is disabled when passwords is empty', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <UpdateAccountInfocreen />
      </MockedProvider>
    );
    expect(getByTestId('passwordSaveButton')).toBeDisabled();
  });
  test('Test that submit is disabled when passwords do not match', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <UpdateAccountInfocreen />
      </MockedProvider>
    );
    fireEvent.changeText(getByTestId('passwordInput1'), '123');
    fireEvent.changeText(getByTestId('passwordInput2'), '456');
    expect(getByTestId('passwordSaveButton')).toBeDisabled();
  });
  test('Test that submit is enabled when passwords match', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <UpdateAccountInfocreen />
      </MockedProvider>
    );
    fireEvent.changeText(getByTestId('passwordInput1'), '123');
    fireEvent.changeText(getByTestId('passwordInput2'), '123');
    expect(getByTestId('passwordSaveButton')).not.toBeDisabled();
  });
});
