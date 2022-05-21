/**
 * Placeholder for bill abstract
 * Will complete later
 */
import React from 'react';
import { Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { StackParams } from '../../../../navigation/StackParams';

type Props = StackScreenProps<StackParams, 'Bill Abstract'>;

/**
 * Displays the bill abstract screen
 * @returns - the functional components of the bill abstract screen
 */
const BillAbstractScreen: React.FC<Props> = ({ route, navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontSize: 20 }}>bill abstract</Text>
    </View>
  );
};

export default BillAbstractScreen;
