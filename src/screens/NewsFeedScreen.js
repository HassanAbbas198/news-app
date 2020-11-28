import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../axios-orders';

import withErrorHandler from '../hoc/withErrorHandler';
import * as actions from '../store/actions/index';

import NewsCard from '../components/news/NewsCard';

const NewsFeedScreen = (props) => {
  const news = useSelector((state) => state.news.news);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchNews());
  }, []);

  return (
    <FlatList
      data={news}
      renderItem={(itemData) => (
        <NewsCard
          image={itemData.item.imageUrl}
          title={itemData.item.headline}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  screen: {
    width: '93%',
    height: '95%',
    alignItems: 'center',
  },
});

export default withErrorHandler(NewsFeedScreen, axios);
