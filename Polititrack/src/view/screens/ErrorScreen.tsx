import React from 'react';
import { Text, View } from 'react-native';

import text from '../styles/text';

interface ErrorProps {
  message: string;
}

/**
 * Displays the Error screen on network or user input based errors.
 * @param Props - the error message
 * @returns - the functional components to display the Error screen
 */
const ErrorScreen: React.FC<ErrorProps> = (props) => {
  return (
    <View>
      <Text style={text.smallText}>Error: {props.message}</Text>
    </View>
  );
};

export default ErrorScreen;
