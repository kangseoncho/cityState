const initialState = [
  {90701:'Artesia, CA', selected: "notSelected"},
  {91101:'Pasadena, CA', selected: "notSelected"}
];

const newLocationObject = (action) => {
  const payload = {};

  payload[action.payloadZipcode] = action.payloadCityState;
  payload['selected'] = action.payloadClass;

  return payload;
}

const zipcodeReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FIND_CITYSTATE_FULFILLED':
      return state.map(location => {
        if(location['selected'] === 'selected') location['selected'] = 'notSelected';
        return location;
      }).concat([newLocationObject(action)]);

    case 'FIND_CITYSTATE_REJECTED':
      return state;

    case 'SELECT_LOCATION':
      return state.map((location, index) => {
        if(index === action.payloadIndex) {
          if(location['selected'] === action.payload) location['selected'] = 'notSelected';
          else location['selected'] = action.payload;
        } else if (index !== action.payloadIndex) {
          location['selected'] = 'notSelected'
        }
        return location;
      })

    default:
      return state;
  }
}

export default zipcodeReducer;