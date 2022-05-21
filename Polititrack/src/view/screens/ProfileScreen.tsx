import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Alert,
} from 'react-native';
import 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';

import CustomButton from '../components/CustomButton';
import text from '../styles/text';

import { signOut, deleteAccount } from '../../redux/actions';
import {
  selectCurrentUser,
  useAppSelector,
  useAppDispatch,
} from '../../redux/hooks';

import { UserInfo } from '../../model/database/userInterfaces';
import { Dispatch, Action } from 'redux';
import { ThunkDispatchType } from '../../redux/types';

/**
 * Displays the profile screen, inluding the signOut button
 * @returns - the functional component representing the Profile screen
 */
const ProfileScreen: React.FC = () => {
  const dispatch: Dispatch<Action> & ThunkDispatchType = useAppDispatch();
  const currentUser: UserInfo = useAppSelector(selectCurrentUser);
  const focused = useIsFocused();
  React.useEffect(() => {}, [focused]);

  const deleteAccountAlert = () =>
    Alert.alert('Are you sure?', 'This cannot be undone', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      { text: 'OK', onPress: () => dispatch(deleteAccount(currentUser.id)) },
    ]);
  return (
    <SafeAreaView>
      <View style={{ flexDirection: 'column' }}>
        <View style={{ height: '20%', padding: 5 }}>
          <Text style={text.largeText}>Hi, {currentUser.name}!</Text>
          <Text style={text.mediumText}>Email: {currentUser.email}</Text>
        </View>
        <View style={styles.buttonPanelAndLogoutContainer}>
          <View style={styles.buttonPanel}>
            {['My Bills', 'My Legislators', 'My Jurisdictions'].map(
              (item: string, key: number) => (
                <View style={styles.buttonContainer} key={key}>
                  <CustomButton type={item}></CustomButton>
                </View>
              )
            )}
          </View>
          <View style={styles.signOutButtonContainer}>
            <Button
              testID={'signOutButton'}
              title="Sign Out"
              onPress={() => dispatch(signOut())}
            ></Button>
            <Button
              testID={'deleteAccountButton'}
              title="Delete Account"
              onPress={() => deleteAccountAlert()}
            ></Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonPanelAndLogoutContainer: {
    height: '80%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  buttonPanel: {
    flexShrink: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    alignItems: 'center',
    height: '33%',
    width: '100%',
  },
  signOutButtonContainer: {
    paddingTop: 60,
    paddingBottom: 20,
    justifyContent: 'flex-end',
  },
});
export default ProfileScreen;
