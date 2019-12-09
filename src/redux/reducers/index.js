import { combineReducers } from 'redux';
import BlockedReducer from './BlockedReducer';
import User from './UserReducer';

export default combineReducers({
  BlockedReducer,
  User,
});
