import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { StackParams } from './StackParams';
import ProfileScreen from '../view/screens/ProfileScreen';
import MyBillsScreen from '../view/screens/bills/MyBillsScreen';
import MyFavoriteBillTypesScreen from '../view/screens/bills/MyFavoriteBillTypesScreen';
import BillSearchScreen from '../view/screens/bills/BillSearchScreen';
import BillDetailsScreen from '../view/screens/bills/BillDetailsScreen';
import MyJurisdictionsScreen from '../view/screens/jurisdictions/MyJurisdictionsScreen';
import JurisdictionSearchScreen from '../view/screens/jurisdictions/JurisdictionSearchScreen';
import JurisdictionDetailsScreen from '../view/screens/jurisdictions/JurisdictionDetailsScreen';
import MyLegislatorsScreen from '../view/screens/legislators/MyLegislatorsScreen';
import FindMyLegislatorsScreen from '../view/screens/legislators/FindMyLegislatorsScreen';
import LegislatorDetailsScreen from '../view/screens/legislators/LegislatorDetailsScreen';
import BillAbstractScreen from '../view/screens/bills/details/BillAbstractScreen';
import BillSponsorsScreen from '../view/screens/bills/details/BillSponsorsScreen';
import BillVersionsScreen from '../view/screens/bills/details/BillVersionsScreen';
import BillVotesScreen from '../view/screens/bills/details/BillVotesScreen';
import JurisdictionCommitteesScreen from '../view/screens/jurisdictions/details/JurisdictionCommitteesScreen';
import JurisdictionMapsScreen from '../view/screens/jurisdictions/details/JurisdictionMapsScreen';
import JurisdictionMembersScreen from '../view/screens/jurisdictions/details/JurisdictionMembersScreen';
import LegislatorCommitteesScreen from '../view/screens/legislators/details/LegislatorCommitteesScreen';
import LegislatorVotingScreen from '../view/screens/legislators/details/LegislatorVotingScreen';

const ProfileStack = createStackNavigator<StackParams>();
/**
 * Creates the navigator which allows the Profile screen to connect with the
 * Jurisdiction, Bill, and Legislator screens
 * @returns - the navigator representing this stack
 */
const ProfileStackNavigator: React.FC = () => {
  return (
    <ProfileStack.Navigator initialRouteName="Profile">
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="My Bills" component={MyBillsScreen} />
      <ProfileStack.Screen
        name="My Favorite Bill Types"
        component={MyFavoriteBillTypesScreen}
      />
      <ProfileStack.Screen name="Bill Search" component={BillSearchScreen} />
      <ProfileStack.Screen name="Bill Details" component={BillDetailsScreen} />
      <ProfileStack.Screen
        name="My Jurisdictions"
        component={MyJurisdictionsScreen}
      />
      <ProfileStack.Screen
        name="Add Jurisdictions"
        component={JurisdictionSearchScreen}
      />
      <ProfileStack.Screen
        name="Jurisdiction Details"
        component={JurisdictionDetailsScreen}
      />
      <ProfileStack.Screen
        name="My Legislators"
        component={MyLegislatorsScreen}
      />
      <ProfileStack.Screen
        name="Find My Legislators"
        component={FindMyLegislatorsScreen}
      />
      <ProfileStack.Screen
        name="Legislator Details"
        component={LegislatorDetailsScreen}
      />
      <ProfileStack.Screen
        name="Bill Abstract"
        component={BillAbstractScreen}
      />
      <ProfileStack.Screen
        name="Bill Sponsors"
        component={BillSponsorsScreen}
      />
      <ProfileStack.Screen
        name="Bill Versions"
        component={BillVersionsScreen}
      />
      <ProfileStack.Screen
        name="Bill Vote History"
        component={BillVotesScreen}
      />
      <ProfileStack.Screen
        name="Jurisdiction Committees"
        component={JurisdictionCommitteesScreen}
      />
      <ProfileStack.Screen
        name="Jurisdiction District Maps"
        component={JurisdictionMapsScreen}
      />
      <ProfileStack.Screen
        name="Jurisdiction Members"
        component={JurisdictionMembersScreen}
      />
      <ProfileStack.Screen
        name="Legislator Committees"
        component={LegislatorCommitteesScreen}
      />
      <ProfileStack.Screen
        name="Legislator Voting History"
        component={LegislatorVotingScreen}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;
