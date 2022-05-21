import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Share,
  Button,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParams } from '../../../navigation/StackParams';

import { BillDetails, getBillDetails } from '../../../model/api/getBillDetails';
import { updateLastUpdated } from '../../../model/database/handleContent';
import { Status } from '../../../model/api/helpers';

import CustomButton from '../../components/CustomButton';
import LoadingScreen from '../LoadingScreen';
import ErrorScreen from '../ErrorScreen';

import text from '../../styles/text';

type Props = StackScreenProps<StackParams, 'Bill Details'>;

/**
 * Displays the bill details for a given bill id
 * @param - the state to request the bill details for
 * @returns - the functional components representing the screen
 */
const BillDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  React.useEffect(() => {
    (async () => updateLastUpdated(route.params.content))();
  }, []);

  const onShare = async (message: string, url: string): Promise<void> => {
    try {
      await Share.share({
        message: message + ' ' + url,
      });
    } catch (error) {
      alert(error.message);
    }
  };
  const billDetails: BillDetails = getBillDetails([route.params.content.id]);

  if (billDetails.status === Status.Loading) {
    return <LoadingScreen />;
  }
  if (billDetails.status === Status.Error) {
    return <ErrorScreen message={billDetails.errorMessage} />;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, paddingBottom: 100 }}>
        <Text style={text.largeText}>{billDetails.data.title}</Text>
        <View style={{ borderBottomWidth: 2, padding: 5 }}>
          <Text style={text.mediumText}>
            Introduced in: {billDetails.data.from}
          </Text>
        </View>
        <View style={styles.buttonPanelContainer}>
          <View style={styles.buttonContainer}>
            <CustomButton
              type="Abstract"
              destination="Bill Abstract"
              params={route.params.content}
            ></CustomButton>
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton
              type="Sponsors"
              destination="Bill Sponsors"
              params={route.params.content}
            ></CustomButton>
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton
              type="Vote History"
              destination="Bill Vote History"
              params={route.params.content}
            ></CustomButton>
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton
              type="Versions"
              destination="Bill Versions"
              params={route.params.content}
            ></CustomButton>
          </View>
          <View style={{ marginTop: 20 }}>
            <Button
              onPress={() =>
                onShare(billDetails.data.title, billDetails.data.openstatesUrl)
              }
              title="Share"
            />
          </View>
        </View>
        <View style={{ borderBottomWidth: 2, padding: 10 }}>
          <Text
            style={[text.mediumText, { color: 'blue' }]}
            onPress={() =>
              WebBrowser.openBrowserAsync(billDetails.data.openstatesUrl)
            }
          >
            {billDetails.data.openstatesUrl}
          </Text>
          <Text style={text.mediumText}>
            Updated at {billDetails.data.updatedAt}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    height: '25%',
    width: '100%',
  },
  buttonPanelContainer: {
    padding: 20,
    justifyContent: 'space-around',
    height: 350,
  },
});

export default BillDetailsScreen;
