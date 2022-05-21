import React from 'react';
import TestRenderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from '../src/view/screens/LoginScreen';
import * as actions from '../src/redux/actions';
const signInMock = jest.spyOn(actions, 'signIn');
const signUpMock = jest.spyOn(actions, 'signUp');

/**
 * Tests the login screen, pressing the sign in and sign up buttons
 */
describe('Login tests', () => {
  afterEach(() => {
    jest.resetModules();
  });
  test('Mock user has not been logged in', () => {
    const { toJSON } = render(<LoginScreen />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('Test pressing the login button', () => {
    const { getByTestId } = render(<LoginScreen />);
    fireEvent(getByTestId('loginButton'), 'onPress');
    expect(signInMock).toHaveBeenCalled();
  });
  test('Test pressing the sign up button', () => {
    const { getByTestId } = render(<LoginScreen />);
    fireEvent(getByTestId('signUpButton'), 'onPress');
    expect(signUpMock).toHaveBeenCalled();
  });
});
