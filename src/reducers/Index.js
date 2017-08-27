import { combineReducers } from 'redux';
import zipcodeReducer from './ZipcodeReducer';

const reducers = combineReducers({
  zipcode: zipcodeReducer
});

export default reducers;