import * as actionTypes from '../actions/actionTypes';

const initialState = {
  news: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_NEWS:
      return {
        ...state,
        news: action.news,
      };

    default:
      return state;
  }
};

export default reducer;
