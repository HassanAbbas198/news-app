import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

const App = () => {
  return (
    <View style={styles.screen}>
      <Text>Hello from react native</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
