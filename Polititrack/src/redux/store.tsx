import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import { ThunkDispatchType, StateWrapper } from './types';

export const store = createStore(
  reducer,
  applyMiddleware<ThunkDispatchType, StateWrapper>(thunk)
);
