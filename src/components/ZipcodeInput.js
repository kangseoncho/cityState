import React from 'react';
import { connect } from 'react-redux';
import { findCityState } from './../actions/ZipcodeActions';
import { updateInputZipcode } from './../actions/InputFieldActions';

const mapStateToProps = (state) => {
  return {
    location: state.zipcode,
    inputField: state.inputField
  }
}

let ZipcodeInput = ({ inputField, location, dispatch }) => {
  let zipcode;

  return (
    <div>
      <input
        type="text"
        onChange={e => dispatch(updateInputZipcode(e.target.value))}
        value={inputField}
        placeholder="enter zipcode"
        ref={input => zipcode = input}
      />
      <button onClick={() => dispatch(findCityState(zipcode.value))}> Find City,State </button>
    </div>
  )
}

ZipcodeInput = connect(mapStateToProps)(ZipcodeInput);

export default ZipcodeInput;