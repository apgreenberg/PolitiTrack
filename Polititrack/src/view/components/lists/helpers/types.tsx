import { OnboardContent } from '../../../../model/database/userInterfaces';
import { APISingleResponseNode } from '../APISingleResponseListItem';
import { APIMultiResponseNode } from '../APIMultiResponseList';

export type SwipeRowData =
  | OnboardContent
  | APISingleResponseNode
  | APIMultiResponseNode;

export interface OnPressActions {
  clickable: boolean;
  onPress: (data: SwipeRowData, displayText: string) => void;
  addable: boolean;
  addOnPress: (data: SwipeRowData, displayText: string) => void;
  deletable: boolean;
  deleteOnPress: (data: SwipeRowData, displayText: string) => void;
}
