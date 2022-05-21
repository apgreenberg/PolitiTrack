/**
 * Placeholder for legislator voting history
 * Will complete later
 */
import React from 'react';
import { Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { StackParams } from '../../../../navigation/StackParams';

type Props = StackScreenProps<StackParams, 'Legislator Voting History'>;

/**
 * Displays the legislator voting history screen
 * @returns - the functional components of the legislator voting history screen
 */
const LegislatorVotingScreen: React.FC<Props> = ({ route, navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontSize: 20 }}>legislator voting details</Text>
    </View>
  );
};

export default LegislatorVotingScreen;
