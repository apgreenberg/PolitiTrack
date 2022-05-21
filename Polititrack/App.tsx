import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import { Provider } from 'react-redux';
import { store } from './src/redux/store';

import LandingScreen from './src/view/screens/LandingScreen';
import { initializeTasks } from './src/model/background/tasks';

initializeTasks();
/**
 * Displays the landing page of the app
 * If the user has previously signed in
 * eg there is a currentUserInfo record for the user in AsyncStorage
 * Then the "My Bills" page is displayed
 * Otherwise the login/sign up page is displayed
 * @returns - the functional components representing the landing page
 */

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <LandingScreen />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
