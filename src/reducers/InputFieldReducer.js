
const inputFieldReducer = (state = '', action) => {
  switch(action.type) {
    case 'UPDATE_INPUT_FIELD':
      return action.payload;

    default:
      return state;
  }
}

export default inputFieldReducer;