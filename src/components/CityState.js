import React from 'react';
import { selection } from './../actions/ZipcodeActions';
import { updateInputZipcode } from './../actions/InputFieldActions';

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