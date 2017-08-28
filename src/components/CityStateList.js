import React from 'react';
import CityState from './CityState';

const CityStateList = (props) => {
  return (
    <ul>
      {props.location.map(((location, i) => {
        let cityState = location[Object.keys(location)[0]];
        let zipcode = Object.keys(location)[0];
        return <CityState
                  key={i}
                  index={i}
                  {...props}
                  location={location}
                  zipcode={zipcode}
                  cityState={cityState}
                />
        })
      )}
    </ul>
  )
}

export default CityStateList;