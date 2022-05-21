import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';

import { useAppDispatch } from '../../redux/hooks';
import { signIn, signUp } from '../../redux/actions';
import { Dispatch, Action } from 'redux';
import { ThunkDispatchType } from '../../redux/types';

import text from '../styles/text';

/**
 * Creates the Login/Sign up pages
 * @returns - the Functional Components for the Login/Sign up page
 */
const LoginScreen: React.FC = () => {
  const dispatch: Dispatch<Action> & ThunkDispatchType = useAppDispatch();
  const [loginData, setLoginData] = React.useState({
    email: '',
    password: '',
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={text.mediumText}>Email:</Text>
      <TextInput
        style={styles.inputBoxes}
        onChangeText={(text) => setLoginData({ ...loginData, email: text })}
      />
      <Text style={text.mediumText}>Password:</Text>
      <TextInput
        style={styles.inputBoxes}
        secureTextEntry={true}
        onChangeText={(text) => setLoginData({ ...loginData, password: text })}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Button
          testID={'loginButton'}
          title="Login"
          onPress={() => {
            dispatch(signIn(loginData.email, loginData.password));
          }}
        />
        <Text style={text.mediumText}> or </Text>
        <Button
          testID={'signUpButton'}
          title="Sign Up"
          onPress={() => {
            dispatch(signUp(loginData.email, loginData.password));
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBoxes: {
    borderWidth: 2,
    width: '60%',
    height: 40,
    fontSize: 20,
  },
});
export default LoginScreen;
