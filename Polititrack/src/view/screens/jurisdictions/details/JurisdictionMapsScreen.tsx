/**
 * Placeholder for jurisdiction district maps
 * Will complete later
 */
import React from 'react';
import { Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { StackParams } from '../../../../navigation/StackParams';

type Props = StackScreenProps<StackParams, 'Jurisdiction District Maps'>;

/**
 * Displays the jurisdiction district maps screen
 * @returns - the functional components of the jurisdiction district maps screen
 */
const JurisdictionMapsScreen: React.FC<Props> = ({ route, navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontSize: 20 }}>jurisdiction district maps</Text>
    </View>
  );
};

export default JurisdictionMapsScreen;
