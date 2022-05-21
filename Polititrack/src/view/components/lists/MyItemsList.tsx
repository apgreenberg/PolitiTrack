import React from 'react';
import { View } from 'react-native';
import 'react-native-gesture-handler';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import {
  OnboardContent,
  UserContent,
  UserInfo,
} from '../../../model/database/userInterfaces';
import { removeContentFromDatabase } from '../../../model/database/handleContent';
import { selectCurrentUser, useAppSelector } from '../../../redux/hooks';

import { OnPressActions, SwipeRowData } from './helpers/types';
import OnboardDataList from './OnboardDataList';

export interface MyItemsListProps {
  type: keyof UserContent;
}

/**
 * A wrapper on an OnboardDataList to handle all of the hook logic, since this is shared between content types
 * @param props - the content type to create a list for (bills, legislators, jurisdictions)
 * @returns - the functional component represneting the list
 */
const MyItemsList: React.FC<MyItemsListProps> = (props) => {
  const formattedType: string = (
    props.type[0].toUpperCase() + props.type.slice(1)
  ).slice(0, -1);

  const currentUser: UserInfo = useAppSelector(selectCurrentUser);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = React.useState({ id: '', name: '' });
  const [deletedItem, setDeletedItem] = React.useState({ id: '', name: '' });

  const onPressActions: OnPressActions = {
    clickable: true,
    onPress: (data: SwipeRowData, displayText: string) => {
      setSelectedItem(data as OnboardContent);
    },
    addable: false,
    addOnPress: () => {},
    deletable: true,
    deleteOnPress: (data: SwipeRowData, displayText: string) => {
      setDeletedItem(data as OnboardContent);
    },
  };

  React.useEffect(() => {}, [isFocused]);

  React.useEffect(() => {
    const deleteItem = async () => {
      await removeContentFromDatabase(currentUser, props.type, deletedItem.id);
      setDeletedItem({ id: '', name: '' });
    };
    if (deletedItem.id !== '') {
      deleteItem();
    }
  }, [deletedItem]);

  React.useEffect(() => {
    if (selectedItem.id !== '') {
      navigation.navigate(formattedType + ' Details', {
        content: selectedItem,
      });
    }
  }, [selectedItem]);

  return (
    <View>
      {currentUser.data[props.type].length !== 0 && (
        <OnboardDataList
          data={currentUser.data[props.type]}
          onPressActions={onPressActions}
        />
      )}
    </View>
  );
};

export default MyItemsList;
