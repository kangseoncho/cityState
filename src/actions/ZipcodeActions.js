
export const findCityState = (zipcode) => {
  return {
    type: 'FIND_CITYSTATE',
    payloadZipcode: zipcode,
    payloadCityState: fetch(`https://api.zippopotam.us/us/${zipcode}`)
      .then(response => response.json())
      .then(json => {
        console.log('json from findCityState action: ', json)
        return `${json.places[0]['place name']}, ${json.places[0]['state abbreviation']}`
    })
    // payloadClass: notSelected
  }
}

// export const enterZipcode = (zipcode) => {
//   return {
//     type: 'ENTER_ZIPCODE',
//     payload: zipcode
//   }
// }

