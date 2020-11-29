import React, { useState } from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Share from 'react-native-share';
import moment from 'moment';

import Colors from '../../constants/Colors';

import Modal from 'react-native-modal';
import Card from './Card';

const CustomModal = (props) => {
  const [isVisible, setIsVisible] = useState(true);
  const selectedArticle = useSelector(
    (state) => state.articles.selectedArticle,
  );

  const formatedDate = moment(selectedArticle.date).format(
    'ddd, MMMM DD, YYYY',
  );
  const url = selectedArticle.url;

  const shareLink = async () => {
    const shareOptions = {
      title: 'Share via',
      url,
    };
    try {
      await Share.open(shareOptions);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Modal
          isVisible={isVisible}
          animationIn="zoomIn"
          animationOut="zoomOut"
          onBackdropPress={() => {
            setIsVisible(false);
            props.onClose();
          }}>
          <Card styles={styles.modal}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: selectedArticle.imageUrl }}
                style={styles.image}
              />
            </View>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>{selectedArticle.category}</Text>
              <Text style={styles.headerText}>{formatedDate}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{selectedArticle.title}</Text>
              <Text style={styles.description}>
                {selectedArticle.description}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Share link"
                color={Colors.secondary}
                onPress={shareLink}
              />
            </View>
          </Card>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    height: '70%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },

  imageContainer: {
    width: '100%',
    height: '50%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 4,
  },

  headerText: {
    color: '#888',
    fontSize: 16,
    marginHorizontal: 10,
  },

  textContainer: {
    alignItems: 'flex-start',
    height: '20%',
    padding: 9,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  description: {
    marginVertical: 4,
    fontSize: 16,
  },

  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: 5,
    bottom: 5,
  },
});

CustomModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CustomModal;
