import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import CustomButton from '../src/view/components/CustomButton';
import { mockedNavigate } from '../test_setup';

/**
 * Tests the custom button component
 */
describe('Custom button tests', () => {
  test('fire changeText event', () => {
    const { getByTestId } = render(<CustomButton type={'TESTNAVIGATE'} />);
    fireEvent(getByTestId('customButton'), 'onPress');
    expect(mockedNavigate).toHaveBeenCalledWith('TESTNAVIGATE');
  });
});
