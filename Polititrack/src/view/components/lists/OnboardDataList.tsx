import React from 'react';
import { View } from 'react-native';

import { OnboardContent } from '../../../model/database/userInterfaces';
import CustomSwipeRow from './helpers/CustomSwipeRow';

import { OnPressActions } from './helpers/types';

export interface OnboardDataListProps {
  data: OnboardContent[];
  onPressActions: OnPressActions;
}

/**
 * Displays a list of the precomputed (onboard) data
 * @param props - ListProps:
 *                -data: the data to display in the list
 *                -onPressActions: handles the clickability, addability, and deletability of each item in the list
 * @returns - a functional component representing the list
 */
const OnboardDataList: React.FC<OnboardDataListProps> = (props) => {
  return (
    <View style={{ marginBottom: 180 }}>
      {props.data.map((dataItem: OnboardContent, i: number) => (
        <CustomSwipeRow
          key={i}
          onPressActions={props.onPressActions}
          data={dataItem}
          displayText={dataItem.name}
        />
      ))}
    </View>
  );
};

export default OnboardDataList;
