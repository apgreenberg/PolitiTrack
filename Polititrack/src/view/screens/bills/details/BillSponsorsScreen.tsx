/**
 * Placeholder for bill sponsors
 * Will complete later
 */
import React from 'react';
import { Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { StackParams } from '../../../../navigation/StackParams';

type Props = StackScreenProps<StackParams, 'Bill Sponsors'>;

/**
 * Displays the bill sponsors screen
 * @returns - the functional components of the bill sponsors screen
 */
const BillSponsorsScreen: React.FC<Props> = ({ route, navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontSize: 20 }}>bill sponsors</Text>
    </View>
  );
};

export default BillSponsorsScreen;
