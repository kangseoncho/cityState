import React from 'react';
import { connect } from 'react-redux';
import { findCityState } from './../actions/ZipcodeActions';

let ZipcodeInput = ({ dispatch }) => {
  let zipcode;

  return (
    <div>
      <input type="text" placeholder="enter zipcode" ref={input => zipcode = input} />
      <button onClick={() => dispatch(findCityState(zipcode.value))}> Find City,State </button>
    </div>
  )
}

ZipcodeInput = connect()(ZipcodeInput);

export default ZipcodeInput;