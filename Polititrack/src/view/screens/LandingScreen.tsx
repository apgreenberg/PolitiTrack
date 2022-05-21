import React from 'react';
import 'react-native-gesture-handler';
import { ApolloProvider } from '@apollo/client';
import * as Notifications from 'expo-notifications';
import { Linking } from 'react-native';

import client from '../../model/api/Client';
import LoginScreen from '../../view/screens/LoginScreen';
import BottomTabsNavigator from '../../navigation/BottomTabsNavigator';

import { updateInternalDatabase } from '../../model/database/userHelpers';
import { retrievePastUser } from '../../redux/actions';
import { selectLoginState, useAppSelector } from '../../redux/hooks';
import { useAppDispatch } from '../../redux/hooks';
import { Dispatch, Action } from 'redux';
import { ThunkDispatchType } from '../../redux/types';

/**
 * Displays the landing page of the app
 * If the user has previously signed in
 * eg there is a currentUserInfo record for the user in AsyncStorage
 * Then the "My Bills" page is displayed
 * Otherwise the login/sign up page is displayed
 * @returns - the functional components representing the landing page
 */

const LandingScreen: React.FC = () => {
  /*const lastNotificationResponse = Notifications.useLastNotificationResponse();
  React.useEffect(() => {
    if (
      lastNotificationResponse &&
      lastNotificationResponse.notification.request.content.data.url &&
      lastNotificationResponse.actionIdentifier ===
        Notifications.DEFAULT_ACTION_IDENTIFIER
    ) {
      Linking.openURL(
        lastNotificationResponse.notification.request.content.data.url as string
      );
    }
  }, [lastNotificationResponse]);
  */

  const dispatch: Dispatch<Action> & ThunkDispatchType = useAppDispatch();
  const isLoggedIn: boolean = useAppSelector(selectLoginState);
  React.useEffect(() => {
    updateInternalDatabase();
    dispatch(retrievePastUser());
  }, []);

  if (isLoggedIn) {
    return (
      <ApolloProvider client={client}>
        <BottomTabsNavigator />
      </ApolloProvider>
    );
  } else {
    return <LoginScreen />;
  }
};

export default LandingScreen;
