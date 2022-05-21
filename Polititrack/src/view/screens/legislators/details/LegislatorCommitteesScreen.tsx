/**
 * Placeholder for legislator committee details
 * Will complete later
 */
import React from 'react';
import { Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { StackParams } from '../../../../navigation/StackParams';

type Props = StackScreenProps<StackParams, 'Legislator Committees'>;

/**
 * Displays the legislator committee details screen
 * @returns - the functional components of the legislator committee details screen
 */
const LegislatorCommitteesScreen: React.FC<Props> = ({ route, navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontSize: 20 }}>legislator committee details</Text>
    </View>
  );
};

export default LegislatorCommitteesScreen;
