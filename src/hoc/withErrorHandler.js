import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import useHttp from '../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, show, clearError] = useHttp(axios);

    const showAlert = () => {
      Alert.alert('Oops!', error ? error : 'An error occured', [
        {
          text: 'Okay',
          onPress: () => {
            clearError();
          },
        },
      ]);
    };

    return (
      <View style={styles.centeredView}>
        {show && showAlert()}
        <WrappedComponent {...props} />
      </View>
    );
  };
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});

export default withErrorHandler;
