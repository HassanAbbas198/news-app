import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../axios-orders';

import * as actions from '../store/actions/index';
import withErrorHandler from '../hoc/withErrorHandler';

import NewsCard from '../components/news/NewsCard';
import Modal from '../components/UI/Modal';

const NewsFeedScreen = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news);

  useEffect(() => {
    dispatch(actions.fetchNews());
  }, []);

  const selectItemHandler = (id) => {
    dispatch(actions.getSelectedNews(id));
    setModalVisible(true);
  };

  const closeModalHandler = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <FlatList
        data={news}
        renderItem={(itemData) => (
          <NewsCard
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            description={itemData.item.description}
            onSelect={() => {
              selectItemHandler(itemData.item.id);
            }}
          />
        )}
      />
      {modalVisible && <Modal onClose={closeModalHandler} />}
    </View>
  );
};

// const styles = StyleSheet.create({
//   screen: {
//     width: '93%',
//     height: '95%',
//     alignItems: 'center',
//   },
// });

export default withErrorHandler(NewsFeedScreen, axios);
