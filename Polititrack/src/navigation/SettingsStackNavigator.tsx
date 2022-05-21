import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { StackParams } from './StackParams';
import SettingsScreen from '../view/screens/SettingsScreen';
import UpdateAccountInfoScreen from '../view/screens/UpdateAccountInfoScreen';

const SettingsStack = createStackNavigator<StackParams>();
/**
 * Creates the navigator which allows the Settings screen to connect with its children
 * @returns - the navigator representing this stack
 */
const SettingsStackNavigator: React.FC = () => {
  return (
    <SettingsStack.Navigator initialRouteName="Settings">
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen
        name="Update Account Information"
        component={UpdateAccountInfoScreen}
      />
    </SettingsStack.Navigator>
  );
};

export default SettingsStackNavigator;
