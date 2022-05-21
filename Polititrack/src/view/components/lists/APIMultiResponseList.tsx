import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import 'react-native-gesture-handler';

import {
  getBillSearchResults,
  BillSearchResults,
  BillSearchNode,
} from '../../../model/api/getBillSearchResults';
import { Status } from '../../../model/api/helpers';
import { OnPressActions } from './helpers/types';
import {
  findLegislatorsByLocation,
  LegislatorSearchNode,
  LegislatorSearchResults,
} from '../../../model/api/findLegislatorsByLocation';
import CustomSwipeRow from './helpers/CustomSwipeRow';

export type APIMultiRequest =
  | typeof getBillSearchResults
  | typeof findLegislatorsByLocation;
export type APIMultiResponse = BillSearchResults | LegislatorSearchResults;
export type APIMultiResponseNode = BillSearchNode | LegislatorSearchNode;

interface APIMultiListProps {
  getData: APIMultiRequest;
  requestParams: string[];
  onPressActions: OnPressActions;
}

/**
 * Performs an API call with an array response and displays this list
 * @param props - APIMultiListProps:
 *                -getData: the API function to call, must return an array of results
 *                -requestParams: the parameters for the API call
 *                -onPressActions: handles the clickability, addability, and deletability of each item in the list
 * @returns - the functional component representing the list
 */
const APIMultiResponseList: React.FC<APIMultiListProps> = (props) => {
  const response: APIMultiResponse = props.getData(props.requestParams);
  React.useEffect(() => {}, [response]);
  if (response.status === Status.Loading) {
    return <Text>Loading...</Text>;
  }
  if (response.status === Status.Error) {
    return <Text>{response.errorMessage}</Text>;
  }
  return (
    <ScrollView style={styles.container}>
      {response.data.map((dataItem: APIMultiResponseNode, i: number) => (
        <CustomSwipeRow
          key={i}
          onPressActions={props.onPressActions}
          data={dataItem}
          displayText={dataItem.name}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 30,
  },
});

export default APIMultiResponseList;
