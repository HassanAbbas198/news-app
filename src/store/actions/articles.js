import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

import ENV from '../../../env';

export const fetchArticles = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `articlesearch.json?&api-key=${ENV.apiKey}`,
      );

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

      dispatch({
        type: actionTypes.SET_ARTICLES,
        articles: loadedArticles,
      });
    } catch (error) {
      throw new Error('Failed to fetch articles');
    }
  };
};

export const fetchMoreArticles = (page) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `articlesearch.json?&api-key=${ENV.apiKey}&page=${page}`,
      );

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

      dispatch({
        type: actionTypes.SET_MORE_ARTICLES,
        moreArticles: loadedArticles,
      });
    } catch (error) {
      throw new Error('Failed to fetch more articles');
    }
  };
};

export const getSelectedArticle = (id) => {
  return {
    type: actionTypes.GET_SINGLE_ARTICLE,
    id,
  };
};
