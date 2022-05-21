/**
 * Placeholder for jurisdiction committees
 * Will complete later
 */
import React from 'react';
import { Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { StackParams } from '../../../../navigation/StackParams';

type Props = StackScreenProps<StackParams, 'Jurisdiction Committees'>;

/**
 * Displays the jurisdiction committees screen
 * @returns - the functional components of the jurisdiction committees screen
 */
const JurisdictionCommitteesScreen: React.FC<Props> = ({
  route,
  navigation,
}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontSize: 20 }}>jurisdiction committees</Text>
    </View>
  );
};

export default JurisdictionCommitteesScreen;
