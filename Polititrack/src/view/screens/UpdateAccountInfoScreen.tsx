/**
 * Placeholder to allow the user to update their account info
 * Will complete later
 */
import React from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  SafeAreaView,
  StyleSheet,
  Alert,
} from 'react-native';

import { selectCurrentUser, useAppSelector } from '../../redux/hooks';

import { UserInfo } from '../../model/database/userInterfaces';
import { updateProfile } from '../../model/database/handleProfile';

import text from '../styles/text';

/**
 * Displays the update account information screen
 * @returns - the functional components of the update account information screen
 */
const UpdateAccountInfoScreen: React.FC = () => {
  const currentUser: UserInfo = useAppSelector(selectCurrentUser);
  const [newName, setNewName] = React.useState('');
  const [newEmail, setNewEmail] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [newPasswordVerification, setNewPasswordVerification] = React.useState(
    ''
  );
  return (
    <SafeAreaView>
      <View style={{ paddingLeft: 10, paddingRight: 10 }}>
        <View
          style={{ paddingTop: 10, paddingBottom: 10, borderBottomWidth: 3 }}
        >
          <Text style={[text.largeText, { textAlign: 'left' }]}>Name</Text>
        </View>
        <View style={styles.rowContainer}>
          <TextInput
            testID={'nameInput'}
            style={styles.textInput}
            placeholder={currentUser.name}
            onChangeText={(text) => setNewName(text)}
          />
          <View style={{ paddingLeft: 10, paddingRight: 10 }}>
            <Button
              testID={'nameSaveButton'}
              title={'Save'}
              disabled={newName === ''}
              onPress={() => {
                updateProfile(currentUser, 'name', newName);
                Alert.alert('Name successfully upated', 'Name is ' + newName);
              }}
            />
          </View>
        </View>
        <View
          style={{ paddingTop: 10, paddingBottom: 10, borderBottomWidth: 3 }}
        >
          <Text style={[text.largeText, { textAlign: 'left' }]}>Email</Text>
        </View>
        <View style={styles.rowContainer}>
          <TextInput
            testID={'emailInput'}
            style={styles.textInput}
            placeholder={currentUser.email}
            onChangeText={(text) => setNewEmail(text)}
          />
          <View style={{ paddingLeft: 10, paddingRight: 10 }}>
            <Button
              testID={'emailSaveButton'}
              title={'Save'}
              disabled={newEmail === ''}
              onPress={() => {
                updateProfile(currentUser, 'email', newEmail);
                Alert.alert(
                  'Email successfully updated',
                  'Email is ' + newEmail
                );
              }}
            />
          </View>
        </View>
        <View
          style={{ paddingTop: 10, paddingBottom: 10, borderBottomWidth: 3 }}
        >
          <Text style={[text.largeText, { textAlign: 'left' }]}>Password</Text>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.passwordContainer}>
            <TextInput
              testID={'passwordInput1'}
              style={[styles.textInput, { marginBottom: 10 }]}
              secureTextEntry={true}
              onChangeText={(text) => setNewPassword(text)}
            />
            <TextInput
              testID={'passwordInput2'}
              style={styles.textInput}
              secureTextEntry={true}
              onChangeText={(text) => setNewPasswordVerification(text)}
            />
            {newPassword !== newPasswordVerification || newPassword === '' ? (
              <Text>Passwords do not match.</Text>
            ) : (
              <Text>Passwords match!</Text>
            )}
          </View>
          <View style={{ paddingLeft: 10, paddingRight: 10, flexShrink: 1 }}>
            <Button
              testID={'passwordSaveButton'}
              title={'Save'}
              disabled={
                newPassword !== newPasswordVerification || newPassword === ''
              }
              onPress={() => {
                updateProfile(currentUser, 'password', newPassword);
                Alert.alert('Password successfully updated');
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textInput: {
    flexGrow: 1,
    borderWidth: 2,
    height: 40,
    fontSize: 20,
  },
  passwordContainer: {
    flexDirection: 'column',
    flexGrow: 1,
    alignContent: 'space-between',
  },
});
export default UpdateAccountInfoScreen;
