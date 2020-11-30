import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { useNYTimes } from '../hooks/useNYTimes';
import Colors from '../constants/Colors';
import * as actions from '../store/actions/index';

import NewsCard from '../components/news/NewsCard';
import Search from '../components/news/Search';
import Modal from '../components/UI/Modal';

const NewsFeedScreen = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articles);
  const isLoading = useSelector((state) => state.articles.loading);
  const error = useSelector((state) => state.articles.error);

  // custom hook
  const [fetchMore] = useNYTimes();

  const selectItemHandler = (id) => {
    dispatch(actions.getSelectedArticle(id));
    setModalVisible(true);
  };

  const closeModalHandler = () => {
    setModalVisible(false);
  };

  if (error) {
    Alert.alert('Oops!', error, [
      {
        text: 'Cancel',
      },
      {
        text: 'Try again',
        onPress: () => {
          fetchMore();
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

  const searchHandler = async (value) => {
    if (!value) {
      return;
    }

    await dispatch(actions.fetchArticles(0, value));
  };

  return (
    <View>
      <Search clicked={searchHandler} />
      <FlatList
        data={articles}
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
        contentContainerStyle={styles.contentContainer}
        onEndReachedThreshold={0.1}
        onEndReached={fetchMore}
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

  contentContainer: {
    paddingBottom: 70,
  },
});

export default NewsFeedScreen;
