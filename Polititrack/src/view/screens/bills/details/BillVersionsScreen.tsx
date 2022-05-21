/**
 * Placeholder for bill versions
 * Will complete later
 */
import React from 'react';
import { Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { StackParams } from '../../../../navigation/StackParams';

type Props = StackScreenProps<StackParams, 'Bill Versions'>;

/**
 * Displays the bill versions screen
 * @returns - the functional components of the bill versions screen
 */
const BillVersionsScreen: React.FC<Props> = ({ route, navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontSize: 20 }}>bill versions</Text>
    </View>
  );
};

export default BillVersionsScreen;
