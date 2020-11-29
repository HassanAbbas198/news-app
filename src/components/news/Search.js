import React from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';

import Colors from '../../constants/Colors';

const Search = (props) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        placeholder="e.g. Politics, Health, .."
        placeholderTextColor="black"
        style={styles.input}
      />
      <Button title="search" color={Colors.secondary} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },

  input: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    height: 43,
  },

  button: {
    color: 'red',
  },
});

export default Search;
