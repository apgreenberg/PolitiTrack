import React from 'react';
import { Text, View } from 'react-native';

/**
 * Displays the loading screen.
 * @returns - the functional components of the loading screen
 */
const LoadingScreen: React.FC = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontSize: 20 }}>Loading</Text>
    </View>
  );
};

export default LoadingScreen;
