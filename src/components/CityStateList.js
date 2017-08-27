import React from 'react';
import CityState from './CityState';

const CityStateList = (props) => {
  // console.log('props from CityStateList: ', props)
  return (
    <ul>
      {props.location.map(((location, index) => {
        return <CityState key={index} {...props} location={location} cityState={location[Object.keys(location)[0]]} index={index}/>
        })
      )}
    </ul>
  )
}

export default CityStateList;