import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import 'react-native-gesture-handler';
import CustomButton from '../../components/CustomButton';
import MyItemsList from '../../components/lists/MyItemsList';

/**
 * Displays a list of the user's legislators
 * @returns - the functional components representing the screen
 */
const MyLegislatorsScreen: React.FC = () => {
  return (
    <SafeAreaView>
      <View style={{ height: 90, borderBottomWidth: 3 }}>
        <CustomButton type="Find My Legislators" />
      </View>
      <MyItemsList type="legislators" />
    </SafeAreaView>
  );
};

export default MyLegislatorsScreen;
