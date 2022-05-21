import React from 'react';
import { View, SafeAreaView } from 'react-native';
import 'react-native-gesture-handler';

import CustomButton from '../../components/CustomButton';
import MyItemsList from '../../components/lists/MyItemsList';

/**
 * Displays a list of the user's jurisdictions
 * @returns - the functional components representing the screen
 */
const MyJurisdictionsScreen: React.FC = () => {
  return (
    <SafeAreaView>
      <View style={{ alignItems: 'center', height: 90, borderBottomWidth: 3 }}>
        <CustomButton type="Add Jurisdictions" />
      </View>
      <MyItemsList type="jurisdictions" />
    </SafeAreaView>
  );
};

export default MyJurisdictionsScreen;
