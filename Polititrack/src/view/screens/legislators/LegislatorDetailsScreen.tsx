import React from 'react';
import { StyleSheet, Image, Text, View, SafeAreaView } from 'react-native';
import 'react-native-gesture-handler';
import * as Linking from 'expo-linking';
import { StackScreenProps } from '@react-navigation/stack';

import { StackParams } from '../../../navigation/StackParams';
import { getLegislatorDetails } from '../../../model/api/getLegislatorDetails';

import CustomButton from '../../components/CustomButton';
import LoadingScreen from '../LoadingScreen';
import ErrorScreen from '../ErrorScreen';

import text from '../../styles/text';
import { Status } from '../../../model/api/helpers';
import { updateLastUpdated } from '../../../model/database/handleContent';

type Props = StackScreenProps<StackParams, 'Legislator Details'>;

/**
 * Displayes the legislator details for a given state
 * @param - the legislator name and id to request the details for
 * @returns - the functional component representing the screen
 */
const LegislatorDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  React.useEffect(() => {
    (async () => updateLastUpdated(route.params.content))();
  }, []);
  const legislatorDetails = getLegislatorDetails([route.params.content.id]);

  if (legislatorDetails.status === Status.Loading) {
    return <LoadingScreen />;
  }
  if (legislatorDetails.status === Status.Error) {
    return <ErrorScreen message={legislatorDetails.errorMessage} />;
  }

  return (
    <SafeAreaView>
      <Text style={text.largeText}>{route.params.content.name}</Text>
      <View style={{ borderBottomWidth: 2, padding: 5, flexDirection: 'row' }}>
        <Image
          style={{ width: 70, height: 70 }}
          source={{
            uri: legislatorDetails.data.image,
          }}
        />
        <View style={{ justifyContent: 'center', flex: 1 }}>
          <Text style={text.mediumText}>
            Party: {legislatorDetails.data.party}
          </Text>
          <Text
            style={[text.mediumText, { color: 'blue' }]}
            onPress={() => {
              Linking.openURL('mailto:' + legislatorDetails.data.email);
            }}
          >
            {legislatorDetails.data.email}
          </Text>
        </View>
      </View>
      <View style={styles.buttonPanelContainer}>
        <View style={styles.buttonContainer}>
          <CustomButton
            type="Committees"
            destination="Legislator Committees"
            params={route.params.content}
          ></CustomButton>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            type="Voting History"
            destination="Legislator Voting History"
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
    height: '50%',
    width: '100%',
  },
  buttonPanelContainer: {
    padding: 20,
    justifyContent: 'space-around',
    height: '70%',
  },
});

export default LegislatorDetailsScreen;
