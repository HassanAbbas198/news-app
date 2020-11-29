import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';

import Card from '../UI/Card';

const NewsCard = (props) => {
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <Card styles={{ ...props.styles, ...styles.news }}>
      <View>
        <TouchableComponent onPress={props.onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image source={{ uri: props.image }} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{props.title}</Text>
              <Text numberOfLines={2}>{props.description}</Text>
            </View>
          </View>
        </TouchableComponent>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  news: {
    height: 300,
    margin: 10,
  },

  touchable: {
    overflow: 'hidden',
    borderRadius: 10,
  },

  imageContainer: {
    width: '100%',
    height: '70%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  textContainer: {
    alignItems: 'flex-start',
    height: '23%',
    padding: 11,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 6,
  },
});

NewsCard.propTypes = {
  onSelect: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
  styles: PropTypes.object,
};

export default NewsCard;
