import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { StackParams } from './StackParams';
import MyBillsScreen from '../view/screens/bills/MyBillsScreen';
import MyFavoriteBillTypesScreen from '../view/screens/bills/MyFavoriteBillTypesScreen';
import BillSearchScreen from '../view/screens/bills/BillSearchScreen';
import BillDetailsScreen from '../view/screens/bills/BillDetailsScreen';
import BillAbstractScreen from '../view/screens/bills/details/BillAbstractScreen';
import BillSponsorsScreen from '../view/screens/bills/details/BillSponsorsScreen';
import BillVersionsScreen from '../view/screens/bills/details/BillVersionsScreen';
import BillVotesScreen from '../view/screens/bills/details/BillVotesScreen';

const MyBillsStack = createStackNavigator<StackParams>();
/**
 * Creates the navigator which allows the My Bills screen to communicate with other screens
 * Necessary because it is separate in the bottom tabs
 * @returns - the navigator representing this stack
 */
const BillsStackNavigator: React.FC = () => {
  return (
    <MyBillsStack.Navigator initialRouteName="My Bills">
      <MyBillsStack.Screen name="My Bills" component={MyBillsScreen} />
      <MyBillsStack.Screen
        name="My Favorite Bill Types"
        component={MyFavoriteBillTypesScreen}
      />
      <MyBillsStack.Screen name="Bill Search" component={BillSearchScreen} />
      <MyBillsStack.Screen name="Bill Details" component={BillDetailsScreen} />
      <MyBillsStack.Screen
        name="Bill Abstract"
        component={BillAbstractScreen}
      />
      <MyBillsStack.Screen
        name="Bill Sponsors"
        component={BillSponsorsScreen}
      />
      <MyBillsStack.Screen
        name="Bill Versions"
        component={BillVersionsScreen}
      />
      <MyBillsStack.Screen
        name="Bill Vote History"
        component={BillVotesScreen}
      />
    </MyBillsStack.Navigator>
  );
};

export default BillsStackNavigator;
