import * as actionTypes from '../actions/actionTypes';

const initialState = {
  articles: [],
  selectedArticle: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ARTICLES:
      return {
        ...state,
        articles: action.articles,
      };

    case actionTypes.SET_MORE_ARTICLES:
      return {
        ...state,
        articles: [...state.articles, ...action.moreArticles],
      };

    case actionTypes.GET_SINGLE_ARTICLE: {
      const selectedArticle = state.articles.find(
        (article) => article.id === action.id,
      );
      return {
        ...state,
        selectedArticle,
      };
    }

    default:
      return state;
  }
};

export default reducer;
