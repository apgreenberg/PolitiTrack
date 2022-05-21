import React from 'react';
import {
  Button,
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import 'react-native-gesture-handler';
import { addContentToDatabase } from '../../../model/database/handleContent';
import {
  OnboardContent,
  UserInfo,
} from '../../../model/database/userInterfaces';
import { removeContentFromDatabase } from '../../../model/database/handleContent';

import {
  OnPressActions,
  SwipeRowData,
} from '../../components/lists/helpers/types';
import { selectCurrentUser, useAppSelector } from '../../../redux/hooks';
import OnboardDataList from '../../components/lists/OnboardDataList';
import text from '../../styles/text';

/**
 * Allows the user to add and remove their favorite bill types
 * @returns - the functional components representing the screen
 */

const MyFavoriteBillTypesScreen: React.FC = () => {
  const currentUser: UserInfo = useAppSelector(selectCurrentUser);
  const [deletedItem, setDeletedItem] = React.useState({ id: '', name: '' });
  const onPressActions: OnPressActions = {
    clickable: false,
    onPress: () => {},
    addable: false,
    addOnPress: () => {},
    deletable: true,
    deleteOnPress: (data: SwipeRowData, displayText: string) => {
      setDeletedItem(data as OnboardContent);
    },
  };
  React.useEffect(() => {
    const deleteItem = async () => {
      await removeContentFromDatabase(currentUser, 'billTypes', deletedItem.id);
      setDeletedItem({ id: '', name: '' });
    };
    if (deletedItem.id !== '') {
      deleteItem();
    }
  }, [deletedItem]);
  const [billType, setBillType] = React.useState('');
  const addBillType = (): void => {
    addContentToDatabase(currentUser, 'billTypes', {
      id: billType,
      name: billType,
      lastUpdated: new Date().getTime(),
    });
    setBillType('');
  };
  React.useEffect(() => {}, [billType]);
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        <Text style={text.mediumText}>Add bill type:</Text>
        <TextInput
          style={styles.inputBoxes}
          onChangeText={(text) => setBillType(text)}
        />
      </View>
      <Button
        testID={'loginButton'}
        title={'Add ' + billType}
        onPress={() => {
          addBillType();
        }}
      />
      {billType === '' && (
        <OnboardDataList
          data={currentUser.data.billTypes}
          onPressActions={onPressActions}
        />
      )}
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

export default MyFavoriteBillTypesScreen;
