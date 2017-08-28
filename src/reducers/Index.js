import { combineReducers } from 'redux';
import zipcodeReducer from './ZipcodeReducer';
import inputFieldReducer from './InputFieldReducer';

const reducers = combineReducers({
  zipcode: zipcodeReducer,
  inputField: inputFieldReducer
});

export default reducers;