const initialState = [
  {90701:'Artesia, CA', selected: "notSelected"},
  {91101:'Pasadena, CA', selected: "notSelected"}
];

const payloadToObject = (action) => {
  // console.log('payloadCityState from object creator: ', action.payloadCityState)
  const zipcode = action.payloadZipcode;
  const cityState = action.payloadCityState;
  const selected = action.payloadClass
  return {
    zipcode: cityState,
    selected
  }
}

const zipcodeReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FIND_CITYSTATE':
      console.log('from FIND_CITYSTATE reducer: ', action.payloadCityState)
      return [...state, payloadToObject(action)];

    // case 'ENTER_ZIPCODE':
      // return [...state, action.payload];

    default:
      return state;
  }
}

export default zipcodeReducer;