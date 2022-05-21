/**
 * Placeholder for bill vote history
 * Will complete later
 */
import React from 'react';
import { Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { StackParams } from '../../../../navigation/StackParams';

type Props = StackScreenProps<StackParams, 'Bill Vote History'>;

/**
 * Displays the bill vote history screen
 * @returns - the functional components of the bill vote history screen
 */
const BillVotesScreen: React.FC<Props> = ({ route, navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontSize: 20 }}>bill vote history</Text>
    </View>
  );
};

export default BillVotesScreen;
