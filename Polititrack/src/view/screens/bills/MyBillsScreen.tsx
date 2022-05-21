import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';

import CustomButton from '../../components/CustomButton';
import MyItemsList from '../../components/lists/MyItemsList';

/**
 * Displays a list of the user's current bills, with the ability to remove them.
 * Also displays buttons to update the user's favorite bill types and search for more bills
 * @returns - a functional components representing the screen
 */
const MyBillsScreen: React.FC = () => {
  return (
    <SafeAreaView>
      <View style={styles.buttonPanel}>
        <View style={styles.buttonContainer}>
          <CustomButton type="My Favorite Bill Types" />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton type="Bill Search" />
        </View>
      </View>
      <MyItemsList type="bills" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonPanel: {
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 3,
  },
  buttonContainer: {
    height: 90,
    flex: 1,
  },
});

export default MyBillsScreen;
