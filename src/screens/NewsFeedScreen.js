import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from '../store/actions/index';
import Colors from '../constants/Colors';

import NewsCard from '../components/news/NewsCard';
import Search from '../components/news/Search';
import Modal from '../components/UI/Modal';

const NewsFeedScreen = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news);

  const loadNews = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      await dispatch(actions.fetchNews());
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  const selectItemHandler = (id) => {
    dispatch(actions.getSelectedNews(id));
    setModalVisible(true);
  };

  const closeModalHandler = () => {
    setModalVisible(false);
  };

  if (error) {
    Alert.alert('Oops!', error, [
      {
        text: 'Cancel',
        onPress: () => {
          setError(null);
        },
      },
      {
        text: 'Try again',
        onPress: () => {
          loadNews();
        },
      },
    ]);
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View>
      <Search />
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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewsFeedScreen;
