import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

import ENV from '../../../env';
import { formatData } from '../../shared/helper';

const fetchArticlesSuccess = (articles) => {
  return {
    type: actionTypes.SET_ARTICLES_SUCCESS,
    articles,
  };
};

const fetchArticlesStart = () => {
  return {
    type: actionTypes.SET_ARTICLES_START,
  };
};

const fetchArticlesFail = (error) => {
  return {
    type: actionTypes.SET_ARTICLES_FAIL,
    error,
  };
};

const fetchMoreArticlesStart = () => {
  return {
    type: actionTypes.FETCH_MORE_ARTICLES_START,
  };
};

const fetchFilteredArticles = (filteredArticles) => {
  return {
    type: actionTypes.FETCH_FILTERED_ARTICLES,
    filteredArticles,
  };
};

export const fetchArticles = (page, query) => {
  return async (dispatch) => {
    // to show a loading spinner on the first request only
    if (page === 0) {
      dispatch(fetchArticlesStart());
    } else {
      dispatch(fetchMoreArticlesStart());
    }

    let result;
    let articles;

    try {
      if (query) {
        dispatch(fetchArticlesStart());
        const response = await axios.get(
          `articlesearch.json?fq=${query}&api-key=${ENV.apiKey}&page=${page}`,
        );
        result = response.data.response.docs;
        articles = formatData(result);

        dispatch(fetchFilteredArticles(articles));
      } else {
        const response = await axios.get(
          `articlesearch.json?&api-key=${ENV.apiKey}&page=${page}`,
        );
        result = response.data.response.docs;
        articles = formatData(result);

        dispatch(fetchArticlesSuccess(articles));
      }
    } catch (error) {
      dispatch(fetchArticlesFail('Failed to fetch articles'));
    }
  };
};

export const getSelectedArticle = (id) => {
  return {
    type: actionTypes.GET_SINGLE_ARTICLE,
    id,
  };
};
