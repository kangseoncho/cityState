
// how a state should look with 2 entries.
// const initialState = [
//   {90701:'Artesia, CA', selected: "notSelected"},
//   {91101:'Pasadena, CA', selected: "notSelected"}
// ];

const initialState = [];

const newLocationObject = (action) => {
  const payload = {};

  payload[action.payloadZipcode] = action.payloadCityState;
  payload['selected'] = action.payloadClass;

  return payload;
}

const filterExistingZipcode = (state, action) => {
   let alreadyExist = state.find(location => {
     return Object.keys(location)[0] === action.payloadZipcode
   });

  if(alreadyExist === undefined) {
    return state.concat([newLocationObject(action)])
  };

  alert('Zipcode already present!');
  return state;
}

const changeSelectedClassName = (state, action) => {
  if (action.payloadIndex === undefined) {
    return state.map(location => {
      if(location['selected'] === 'selected') location['selected'] = 'notSelected';
      return location;
    })
  } else {
    return state.map((location, index) => {
      if(index === action.payloadIndex) {
        if(location['selected'] === action.payload) location['selected'] = 'notSelected';
        else location['selected'] = action.payload;
      } else if (index !== action.payloadIndex) {
        location['selected'] = 'notSelected';
      }
      return location;
    })
  }
}

const zipcodeReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FIND_CITYSTATE_FULFILLED':
      return filterExistingZipcode(changeSelectedClassName(state,action), action);

    case 'FIND_CITYSTATE_REJECTED':
      return state;

    case 'SELECT_LOCATION':
      return changeSelectedClassName(state, action);

    default:
      return state;
  }
}

export default zipcodeReducer;