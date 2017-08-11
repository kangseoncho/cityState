import React from 'react';

const View = (props) => {
  const displayCityState = props.zipCodeList.map((zipCodeObj, index) => {
    let zipCode = Object.keys(zipCodeObj)[0];
    let cssClass = Object.keys(zipCodeObj)[1];

    return (
      <div key={index}
        onClick={() => props.highlightCityState(zipCode)}
        className={zipCodeObj[cssClass]}
        >
        {zipCodeObj[Object.keys(zipCodeObj)[0]]}
      </div>
    )
  })

  return (
    <div className="App">
      <h2>Find Cities by Zipcode</h2>

      <div id="location">
        {displayCityState}
      </div>

      <div id="formDiv">
        <input type="text" placeholder="Zip Code" onChange={props.updateZipCodeInput} value={props.zipCodeInput}></input>
        <button
          type='submit'
          onClick={() => {
            props.addZipCodeToList(props.zipCodeInput);
            props.highlightCityState(props.zipCodeinput)}
        }>
          enter zipcode
        </button>
      </div>
    </div>
  )
}

export default View;