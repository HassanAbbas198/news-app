import * as actionTypes from '../actions/actionTypes';

const initialState = {
  articles: [],
  selectedArticle: null,
  error: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: [...state.articles, ...action.articles],
        loading: false,
        error: null,
      };

    case actionTypes.SET_ARTICLES_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionTypes.SET_ARTICLES_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    case actionTypes.FETCH_MORE_ARTICLES_START:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case actionTypes.GET_SINGLE_ARTICLE: {
      const selectedArticle = state.articles.find(
        (article) => article.id === action.id,
      );
      return {
        ...state,
        selectedArticle,
        error: null,
      };
    }

    default:
      return state;
  }
};

export default reducer;
