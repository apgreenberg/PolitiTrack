import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { selectCurrentUser, useAppSelector } from '../../../redux/hooks';

import {
  getJurisdictionDetails,
  JurisdictionDetailNode,
} from '../../../model/api/getJurisdictionDetails';
import {
  BillSearchNode,
  getBillSearchResults,
} from '../../../model/api/getBillSearchResults';
import { addContentToDatabase } from '../../../model/database/handleContent';
import {
  OnboardContent,
  UserInfo,
} from '../../../model/database/userInterfaces';

import {
  OnPressActions,
  SwipeRowData,
} from '../../components/lists/helpers/types';
import APISingleResponseListItem from '../../components/lists/APISingleResponseListItem';
import APIMultiResponseList from '../../components/lists/APIMultiResponseList';
import OnboardDataList from '../../components/lists/OnboardDataList';

import text from '../../styles/text';

/**
 * Handles the user choosing their search parameters, first a jurisdiction and legislative session
 * (user is alerted is their chosen jurisidiction is not currently in session), then a bill type,
 * displays the results of their search, and adds any selected bills to the user's library
 * @returns - the functional components representing the screen
 */
const BillSearchScreen: React.FC = () => {
  const currentUser: UserInfo = useAppSelector(selectCurrentUser);
  const navigation = useNavigation();

  //Handle the user's jurisdiction and session choice
  const [jurisdictionAndSession, setJurisdisctionAndSession] = React.useState({
    jurisdiction: '',
    session: '',
    isComplete: false,
  });

  const jasOnPressActions: OnPressActions = {
    clickable: true,
    onPress: (data: SwipeRowData, displayText: string) => {
      if (!(data as JurisdictionDetailNode).inSession) {
        alert(displayText + "'s legislatures are not in session");
      } else {
        setJurisdisctionAndSession({
          jurisdiction: displayText as string,
          session: (data as JurisdictionDetailNode).identifier,
          isComplete: true,
        });
      }
    },
    addable: false,
    addOnPress: () => {},
    deletable: false,
    deleteOnPress: () => {},
  };

  //Handle the user's bill type choice
  const [billType, setBillType] = React.useState({
    billType: '',
    isComplete: false,
  });
  const billTypeOnPressActions: OnPressActions = {
    clickable: true,
    onPress: (data: SwipeRowData, displayText: string) => {
      setBillType({
        billType: (data as OnboardContent).name,
        isComplete: true,
      });
    },
    addable: false,
    addOnPress: () => {},
    deletable: false,
    deleteOnPress: () => {},
  };

  //Handle the search results
  const billSearchResultOnPressActions: OnPressActions = {
    clickable: true,
    onPress: (data: SwipeRowData, displayText: string) => {
      navigation.navigate('Bill Details', {
        content: {
          id: (data as BillSearchNode).id,
          name: (data as BillSearchNode).name,
        },
      });
    },
    addable: true,
    addOnPress: (data: SwipeRowData, displayText: string) => {
      addContentToDatabase(currentUser, 'bills', {
        id: (data as BillSearchNode).id,
        name: (data as BillSearchNode).name,
        lastUpdated: new Date().getTime(),
      });
    },
    deletable: false,
    deleteOnPress: () => {},
  };

  if (!jurisdictionAndSession.isComplete) {
    return (
      <SafeAreaView>
        <Text style={text.largeText}>Select a jurisdiction:</Text>
        {currentUser.data.jurisdictions.map(
          (jurisdiction: OnboardContent, i: number) => (
            <APISingleResponseListItem
              key={i}
              getData={getJurisdictionDetails}
              requestParams={[jurisdiction.id]}
              onPressActions={jasOnPressActions}
              displayText={jurisdiction.name}
            />
          )
        )}
      </SafeAreaView>
    );
  }
  if (!billType.isComplete) {
    return (
      <SafeAreaView>
        <Text style={text.largeText}>Select a bill type:</Text>
        <OnboardDataList
          data={currentUser.data.billTypes}
          onPressActions={billTypeOnPressActions}
        />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView>
        <Text style={text.largeText}>Search results:</Text>
        <APIMultiResponseList
          getData={getBillSearchResults}
          requestParams={[
            jurisdictionAndSession.jurisdiction,
            jurisdictionAndSession.session,
            billType.billType,
          ]}
          onPressActions={billSearchResultOnPressActions}
        />
      </SafeAreaView>
    );
  }
};
export default BillSearchScreen;
