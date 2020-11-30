import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';

import Colors from '../../constants/Colors';

const Search = (props) => {
  const [value, setValue] = useState(null);

  return (
    <View style={styles.searchContainer}>
      <TextInput
        placeholder="Search..."
        placeholderTextColor="black"
        style={styles.input}
        value={value}
        onChangeText={setValue}
      />
      <Button
        title="search"
        color={Colors.secondary}
        onPress={() => {
          props.clicked(value);
        }}
      />
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
    width: '45%',
  },

  button: {
    color: 'red',
  },
});

export default Search;
