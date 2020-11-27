import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../axios-orders';

import withErrorHandler from '../hoc/withErrorHandler';
import * as actions from '../store/actions/index';

const NewsFeedScreen = (props) => {
  const news = useSelector((state) => state.news.news);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchNews());
  }, []);

  return (
    <View style={styles.screen}>
      <Text>hello from news feed</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: '93%',
    height: '95%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default withErrorHandler(NewsFeedScreen, axios);
