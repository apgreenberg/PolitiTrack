import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import text from '../styles/text';
import colors from '../styles/colors';
import { OnboardContent } from '../../model/database/userInterfaces';

/*
If a destination is a provided then the button will use that for navigation, 
otherwise it will use the type to determine destination
*/
interface CustomButtonProps {
  type: string;
  destination?: string;
  params?: OnboardContent;
}

/**
 * Displays a custom button.
 * CustomButton is used to navigate between screens
 * @param props - type - the button label and destination
 * @returns - a functional component representing the button
 */
const CustomButton: React.FC<CustomButtonProps> = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      testID={'customButton'}
      style={styles.followButton}
      onPress={() => {
        if (props.destination && !props.params) {
          navigation.navigate(props.destination);
        }
        if (props.destination && props.params) {
          navigation.navigate(props.destination, {
            content: props.params,
          });
        }
        if (!props.destination && !props.params) {
          navigation.navigate(props.type);
        }
        if (!props.destination && props.params) {
          navigation.navigate(props.type, {
            content: props.params,
          });
        }
      }}
    >
      <Text style={text.largeText}>{props.type}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  followButton: {
    width: '90%',
    height: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryColor,
    borderRadius: 5,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.secondaryColor,
  },
});

export default CustomButton;
