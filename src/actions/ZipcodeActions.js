
export const findCityState = (zipcode) => {
  return (dispatch) => {
    fetch(`https://api.zippopotam.us/us/${zipcode}`)
      .then(res => res.json())
      .then(json => `${json.places[0]['place name']}, ${json.places[0]['state abbreviation']}`)
      .then(cityState => dispatch({
        type: 'FIND_CITYSTATE_FULFILLED',
        payloadCityState: cityState,
        payloadZipcode: zipcode,
        payloadClass: 'selected'
      }))
      .catch(err => {
        alert(`${zipcode} is not a valid zipcode!`);
        return dispatch({
          type: 'FIND_CITYSTATE_REJECTED'
        })}
      )
  }
}

export const selection = (index) => {
  return {
    type: 'SELECT_LOCATION',
    payload: 'selected',
    payloadIndex: index
  }
}
