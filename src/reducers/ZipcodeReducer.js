const initialState = [
  {90701:'Artesia, CA', selected: "notSelected"},
  {91101:'Pasadena, CA', selected: "notSelected"}
];

const payloadToObject = (action) => {
  const payload = {};
  console.log(action.payloadZipcode)
  payload[action.payloadZipcode] = action.payloadCityState;
  payload['selected'] = action.payloadClass;

  return payload;
}

const zipcodeReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FIND_CITYSTATE':
      return [...state, payloadToObject(action)];

    // case 'ENTER_ZIPCODE':
      // return [...state, action.payload];

    default:
      return state;
  }
}

export default zipcodeReducer;