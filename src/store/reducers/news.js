// import * as actionTypes from '../actions/actionTypes';

const initialState = {
  news: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'hi':
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default reducer;