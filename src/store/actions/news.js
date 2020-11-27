import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

import ENV from '../../../env';

export const fetchNews = () => {
  return async (dispatch) => {
    const response = await axios.get(
      `articlesearch.json?q=election&api-key=${ENV.apiKey}`,
    );

    const news = response.data.response.docs;
    const loadedNews = [];

    for (const key in news) {
      loadedNews.push({
        id: news[key]._id,
        headline: news[key].headline.main,
        snippet: news[key].snippet,
      });
    }

    dispatch({
      type: actionTypes.SET_NEWS,
      news: loadedNews,
    });
  };
};
