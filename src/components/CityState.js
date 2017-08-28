import React from 'react';
import { selection } from './../actions/ZipcodeActions';
import { updateInputZipcode } from './../actions/InputFieldActions';
//need onclick to trigger zipcode to pop up at input field

const CityState = (props) => {
  return (
    <li
      className={props.location['selected']}
      onClick={() => {
        props.dispatch(selection(props.index));
        props.dispatch(updateInputZipcode(props.zipcode));
      }}
    >
      {props.cityState}
    </li>
  )
}

export default CityState;