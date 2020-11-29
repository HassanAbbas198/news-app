import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

import ENV from '../../../env';

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

export const fetchArticles = (page) => {
  return async (dispatch) => {
    // to show a loading spinner on the first request only
    if (page === 0) {
      dispatch(fetchArticlesStart());
    } else {
      dispatch(fetchMoreArticlesStart());
    }

    try {
      const url = `articlesearch.json?&api-key=${ENV.apiKey}&page=${page}`;

      const response = await axios.get(url);
      const articles = response.data.response.docs;

      const loadedArticles = [];
      let imageUrl;
      let title;
      for (const key in articles) {
        for (const x in articles[key].multimedia) {
          if (articles[key].multimedia[x].subtype === 'popup') {
            imageUrl = `https://www.nytimes.com/${articles[key].multimedia[x].url}`;
          }
        }

        if (articles[key].headline.print_headline) {
          title = articles[key].headline.print_headline;
        } else {
          title = articles[key].headline.main;
        }

        loadedArticles.push({
          id: articles[key]._id,
          title,
          imageUrl,
          description: articles[key].snippet,
          category: articles[key].subsection_name,
          date: articles[key].pub_date,
          url: articles[key].web_url,
        });
      }
      dispatch(fetchArticlesSuccess(loadedArticles));
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
