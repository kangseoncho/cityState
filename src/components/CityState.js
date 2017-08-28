import React from 'react';
import { selection } from './../actions/ZipcodeActions';
//need onclick to trigger zipcode to pop up at input field

const CityState = (props) => {
  return (
    <li className={props.location['selected']} onClick={() => props.dispatch(selection(props.index))}>
      {props.cityState}
    </li>
  )
}

export default CityState;