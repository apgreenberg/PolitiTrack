/**
 * Placeholder for jurisdiction members
 * Will complete later
 */
import React from 'react';
import { Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { StackParams } from '../../../../navigation/StackParams';

type Props = StackScreenProps<StackParams, 'Jurisdiction Members'>;

/**
 * Displays the jurisdiction members screen
 * @returns - the functional components of the jurisdiction members screen
 */
const JurisdictionMembersScreen: React.FC<Props> = ({ route, navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontSize: 20 }}>jurisdiction members</Text>
    </View>
  );
};

export default JurisdictionMembersScreen;
