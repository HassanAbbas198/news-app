import * as actionTypes from '../actions/actionTypes';

const initialState = {
  news: [],
  selectedNews: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_NEWS:
      return {
        ...state,
        news: action.news,
      };

    case actionTypes.GET_SINGLE_NEWS: {
      const selectedNews = state.news.find((n) => n.id === action.id);
      return {
        ...state,
        selectedNews,
      };
    }

    default:
      return state;
  }
};

export default reducer;
