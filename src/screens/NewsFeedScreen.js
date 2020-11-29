import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../constants/Colors';
import * as actions from '../store/actions/index';
import { useNYTimes } from '../hooks/useNYTimes';

import NewsCard from '../components/news/NewsCard';
import Search from '../components/news/Search';
import Modal from '../components/UI/Modal';

const NewsFeedScreen = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const articles = useSelector((state) => state.articles.articles);
  const dispatch = useDispatch();

  // custom hook
  const [fetchMore] = useNYTimes();

  const loadArticles = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      await dispatch(actions.fetchArticles());
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

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
        onEndReachedThreshold={0.6}
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
