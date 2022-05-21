import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { selectCurrentUser, useAppSelector } from '../../../redux/hooks';

import { UserInfo } from '../../../model/database/userInterfaces';
import { addContentToDatabase } from '../../../model/database/handleContent';
import {
  findLegislatorsByLocation,
  LegislatorSearchNode,
} from '../../../model/api/findLegislatorsByLocation';

import APIMultiResponseList from '../../components/lists/APIMultiResponseList';
import {
  OnPressActions,
  SwipeRowData,
} from '../../components/lists/helpers/types';

import text from '../../styles/text';

/**
 * Uses the user's current location and the API to find their representatives
 * @returns - the functional components representing the screen
 */
const FindMyLegislatorsScreen: React.FC = () => {
  const currentUser: UserInfo = useAppSelector(selectCurrentUser);
  const navigation = useNavigation();
  let initLocation: Location.LocationObject | undefined;
  const [location, setLocation] = React.useState(initLocation);
  const [errorMsg, setErrorMsg] = React.useState('');

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Location permissions not granted');
        return;
      }
      let location: Location.LocationObject = await Location.getCurrentPositionAsync(
        {}
      );
      setLocation(location);
    })();
  }, []);

  const onPressActions: OnPressActions = {
    clickable: true,
    onPress: (data: SwipeRowData, displayText: string) => {
      navigation.navigate('Legislator Details', {
        content: data as LegislatorSearchNode,
      });
    },
    addable: true,
    addOnPress: (data: SwipeRowData, displayText: string) => {
      addContentToDatabase(currentUser, 'legislators', {
        id: (data as LegislatorSearchNode).id,
        name: (data as LegislatorSearchNode).name,
        lastUpdated: new Date().getTime(),
      });
    },
    deletable: false,
    deleteOnPress: () => {},
  };
  return (
    <SafeAreaView>
      <View>
        {location !== undefined ? (
          <View>
            <Text style={text.largeText}>Your Legislators</Text>
            <APIMultiResponseList
              getData={findLegislatorsByLocation}
              requestParams={[
                String(location.coords.latitude),
                String(location.coords.longitude),
              ]}
              onPressActions={onPressActions}
            />
          </View>
        ) : errorMsg === '' ? (
          <Text style={text.mediumText}>Finding your location</Text>
        ) : (
          <Text style={text.mediumText}>{errorMsg}</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default FindMyLegislatorsScreen;
