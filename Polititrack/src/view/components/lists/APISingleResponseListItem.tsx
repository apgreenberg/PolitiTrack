import React from 'react';
import { TouchableOpacity, TouchableHighlight, View, Text } from 'react-native';
import { SwipeRow } from 'react-native-swipe-list-view';
import 'react-native-gesture-handler';

import {
  getJurisdictionDetails,
  JurisdictionDetailNode,
  JurisdictionDetails,
} from '../../../model/api/getJurisdictionDetails';

import text from '../../styles/text';
import { OnPressActions } from './helpers/types';
import { Status } from '../../../model/api/helpers';
import CustomSwipeRow from './helpers/CustomSwipeRow';

export type APISingleRequest = typeof getJurisdictionDetails;
export type APISingleResponse = JurisdictionDetails;
export type APISingleResponseNode = JurisdictionDetailNode;

interface APISingleListItemProps {
  getData: APISingleRequest;
  requestParams: string[];
  onPressActions: OnPressActions;
  displayText: string;
}

/**
 * Displays an item/element of an API Single-Response List
 * In this list, each item performs a unique API call for its data
 * For this reason is was not necessary to have a separate APISingleResponseList component
 * @param props - APISingleListItemProps:
 *                -getData: the API function to call, must return a single result
 *                -requestParams: the parameters for the API call
 *                -onPressActions: handles the clickability, addability, and deletability of the item
 *                -displayText: the text to display for the item (optional),
 *                              will default to the name field of the response
 * @returns - the functional components representing an item/element of an APIMultiResponseList
 */
const APISingleResponseListItem: React.FC<APISingleListItemProps> = (props) => {
  const response: APISingleResponse = props.getData(props.requestParams);
  React.useEffect(() => {}, [response]);
  if (response.status === Status.Loading) {
    return <Text>Loading</Text>;
  }
  if (response.status === Status.Error) {
    return <Text>{response.errorMessage}</Text>;
  }
  return (
    <CustomSwipeRow
      onPressActions={props.onPressActions}
      data={response.data}
      displayText={props.displayText}
    />
  );
};

export default APISingleResponseListItem;
