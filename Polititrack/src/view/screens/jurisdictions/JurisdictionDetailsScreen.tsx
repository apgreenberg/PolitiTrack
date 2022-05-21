import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';

import { StackParams } from '../../../navigation/StackParams';
import { getJurisdictionDetails } from '../../../model/api/getJurisdictionDetails';
import { Status } from '../../../model/api/helpers';
import { updateLastUpdated } from '../../../model/database/handleContent';

import CustomButton from '../../components/CustomButton';
import LoadingScreen from '../LoadingScreen';
import ErrorScreen from '../ErrorScreen';

import text from '../../styles/text';

type Props = StackScreenProps<StackParams, 'Jurisdiction Details'>;

/**
 * Displayes the jurisdiction details for a given state
 * @param - the jurisdiction name and id to request the details for
 * @returns - the functional components representing the screen
 */
const JurisdictionDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  React.useEffect(() => {
    (async () => updateLastUpdated(route.params.content))();
  }, []);

  const jurisdictionDetails = getJurisdictionDetails([route.params.content.id]);

  if (jurisdictionDetails.status === Status.Loading) {
    return <LoadingScreen />;
  }
  if (jurisdictionDetails.status === Status.Error) {
    return <ErrorScreen message={jurisdictionDetails.errorMessage} />;
  }
  return (
    <SafeAreaView>
      <Text style={text.largeText}>
        {route.params.content.name}: Current Session
      </Text>
      <View style={{ borderBottomWidth: 2, padding: 5 }}>
        <Text style={text.mediumText}>{jurisdictionDetails.data.name}</Text>
        <Text style={text.mediumText}>
          Start Date: {jurisdictionDetails.data.startDate}
        </Text>
        <Text style={text.mediumText}>
          End Date: {jurisdictionDetails.data.endDate}
        </Text>
      </View>
      <View style={styles.buttonPanelContainer}>
        <View style={styles.buttonContainer}>
          <CustomButton
            type="Members"
            destination="Jurisdiction Members"
            params={route.params.content}
          ></CustomButton>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            type="Committees"
            destination="Jurisdiction Committees"
            params={route.params.content}
          ></CustomButton>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            type="District Maps"
            destination="Jurisdiction District Maps"
            params={route.params.content}
          ></CustomButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    height: '33%',
    width: '100%',
  },
  buttonPanelContainer: {
    padding: 20,
    justifyContent: 'space-around',
    height: '70%',
  },
});

export default JurisdictionDetailsScreen;
