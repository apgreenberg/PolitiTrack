import React from 'react';
import { StyleSheet, Button, View, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import 'react-native-gesture-handler';

import { addContentToDatabase } from '../../../model/database/handleContent';
import { UserInfo, UserContent } from '../../../model/database/userInterfaces';

import { selectCurrentUser, useAppSelector } from '../../../redux/hooks';

import { states, state, stateIdMap } from '../../../assets/states';

/**
 * Displays the jurisdiction search screen and adds the user's choice to the database
 * @returns - the functional components representing the screen
 */
const JurisdictionSearchScreen: React.FC = () => {
  const currentUser: UserInfo = useAppSelector(selectCurrentUser);
  const [selectedState, setSelectedState] = React.useState('Alabama');

  return (
    <SafeAreaView>
      <View style={styles.pageContainer}>
        <Picker
          selectedValue={selectedState}
          onValueChange={(itemValue: string) => setSelectedState(itemValue)}
        >
          {states.map((state: string, key: number) => (
            <Picker.Item label={state} value={state} key={key}></Picker.Item>
          ))}
        </Picker>
      </View>
      <View>
        <Button
          title={'Add ' + selectedState}
          onPress={() =>
            addContentToDatabase(currentUser, 'jurisdictions', {
              id: stateIdMap[selectedState as state],
              name: selectedState,
              lastUpdated: new Date().getTime(),
            })
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    height: '80%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
export default JurisdictionSearchScreen;
