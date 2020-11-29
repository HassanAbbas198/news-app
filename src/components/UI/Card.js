import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.styles }}>{props.children}</View>
  );
};
const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});

Card.propTypes = {
  styles: PropTypes.object,
};

export default Card;
