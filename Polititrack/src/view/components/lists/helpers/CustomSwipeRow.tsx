import React from 'react';
import {
  TouchableOpacity,
  TouchableHighlight,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { SwipeRow } from 'react-native-swipe-list-view';
import 'react-native-gesture-handler';

import { OnPressActions, SwipeRowData } from './types';

import colors from '../../../styles/colors';
import text from '../../../styles/text';

interface SwipeRowProps {
  onPressActions: OnPressActions;
  data: SwipeRowData;
  displayText: string;
}

const CustomSwipeRow: React.FC<SwipeRowProps> = (props) => {
  return (
    <SwipeRow
      leftOpenValue={!props.onPressActions.addable ? 0 : 75}
      rightOpenValue={!props.onPressActions.deletable ? 0 : -75}
    >
      <View style={styles.rowBack}>
        {props.onPressActions.addable && (
          <TouchableOpacity
            testID={'addSwipeButton'}
            style={styles.backLeftBtn}
            onPress={() =>
              props.onPressActions.addOnPress(props.data, props.displayText)
            }
          >
            <Text style={styles.backTextWhite}>Add</Text>
          </TouchableOpacity>
        )}
        {props.onPressActions.deletable && (
          <TouchableOpacity
            testID={'deleteSwipeButton'}
            style={styles.backRightBtn}
            onPress={() =>
              props.onPressActions.deleteOnPress(props.data, props.displayText)
            }
          >
            <Text style={styles.backTextWhite}>Delete</Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableHighlight
        testID={'mainSwipeButton'}
        disabled={!props.onPressActions.clickable}
        onPress={() =>
          props.onPressActions.onPress(props.data, props.displayText)
        }
        style={styles.rowFront}
        underlayColor={'#dbdbdb'}
      >
        <View>
          <Text style={text.mediumText}>{props.displayText}</Text>
        </View>
      </TouchableHighlight>
    </SwipeRow>
  );
};

export const styles = StyleSheet.create({
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderBottomColor: colors.secondaryColor,
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 60,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: colors.secondaryColor,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backLeftBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    backgroundColor: colors.highlightedSecondaryColor,
    left: 0,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    backgroundColor: 'red',
    right: 0,
  },
});

export default CustomSwipeRow;
