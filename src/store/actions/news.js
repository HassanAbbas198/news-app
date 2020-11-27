import * as actionTypes from './actionTypes';

const fetchNews = () => {
  return async (dispatch) => {
    return {
      type: actionTypes.SET_NEWS,
    };
  };
};
