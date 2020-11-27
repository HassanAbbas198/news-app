import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const NewsFeedScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>hello from news feed</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    margin: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default NewsFeedScreen;
