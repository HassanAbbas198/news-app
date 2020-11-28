import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

import ENV from '../../../env';

export const fetchNews = () => {
  return async (dispatch) => {
    const response = await axios.get(
      `articlesearch.json?q=health&api-key=${ENV.apiKey}`,
    );

    const news = response.data.response.docs;
    const loadedNews = [];

    let imageUrl;
    for (const key in news) {
      for (const x in news[key].multimedia) {
        if (news[key].multimedia[x].subtype === 'popup') {
          imageUrl = `https://www.nytimes.com/${news[key].multimedia[x].url}`;
        }
      }

      loadedNews.push({
        id: news[key]._id,
        headline: news[key].headline.main,
        snippet: news[key].snippet,
        imageUrl,
      });
    }

    dispatch({
      type: actionTypes.SET_NEWS,
      news: loadedNews,
    });
  };
};
