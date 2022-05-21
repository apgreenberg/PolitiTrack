import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import SettingsStackNavigator from './SettingsStackNavigator';
import MyBillsStackNavigator from './BillsStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';

import colors from '../view/styles/colors';

const Tab = createBottomTabNavigator();

/**
 * Creates the navigator which allows navigation between Settings, My Bills, and Profile screen
 * @returns - the navigator representing this tab
 */
const BottomTabsNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Profile') {
            iconName = focused ? 'user' : 'user';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'cog' : 'cog';
          } else if (route.name === 'My Bills') {
            iconName = focused ? 'files-o' : 'files-o';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.highlightedSecondaryColor,
        inactiveTintColor: colors.secondaryColor,
      }}
      initialRouteName="My Bills"
    >
      <Tab.Screen name="Settings" component={SettingsStackNavigator} />
      <Tab.Screen name="My Bills" component={MyBillsStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};
export default BottomTabsNavigator;
