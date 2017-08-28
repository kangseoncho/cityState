import React from 'react';
import CityState from './CityState';

const CityStateList = (props) => {
  // console.log('props from CityStateList: ', props)
  return (
    <ul>
      {props.location.map(((location, i) => {
        let cityState = location[Object.keys(location)[0]];
        return <CityState key={i} {...props} location={location} cityState={cityState} index={i}/>
        })
      )}
    </ul>
  )
}

export default CityStateList;