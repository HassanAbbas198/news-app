import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

import ENV from '../../../env';

export const fetchNews = () => {
  return async (dispatch) => {
    const response = await axios.get(
      `articlesearch.json?q=politics&api-key=${ENV.apiKey}`,
    );

    const news = response.data.response.docs;
    const loadedNews = [];

    let imageUrl;
    let title;
    for (const key in news) {
      for (const x in news[key].multimedia) {
        if (news[key].multimedia[x].subtype === 'popup') {
          imageUrl = `https://www.nytimes.com/${news[key].multimedia[x].url}`;
        }
      }

      if (news[key].headline.print_headline) {
        title = news[key].headline.print_headline;
      } else {
        title = news[key].headline.main;
      }

      loadedNews.push({
        id: news[key]._id,
        title,
        imageUrl,
        description: news[key].snippet,
        category: news[key].subsection_name,
      });
    }

    dispatch({
      type: actionTypes.SET_NEWS,
      news: loadedNews,
    });
  };
};

export const getSelectedNews = (id) => {
  return {
    type: actionTypes.GET_SINGLE_NEWS,
    id,
  };
};
