import { blankUserInfo } from '../model/database/userInterfaces';
import { Actions, LOGIN, LOGOUT, StateWrapper } from './types';

const initialState: StateWrapper = {
  loggedIn: false,
  currentUser: blankUserInfo,
};

const reducer = (
  state: StateWrapper = initialState,
  action: Actions
): StateWrapper => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
        currentUser: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
      };
    default:
      return state;
  }
};

export default reducer;
