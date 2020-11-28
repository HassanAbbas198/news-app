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
import Share from 'react-native-share';
import moment from 'moment';

import Colors from '../../constants/Colors';

import Modal from 'react-native-modal';
import Card from './Card';

const CustomModal = (props) => {
  const [isVisible, setIsVisible] = useState(true);
  const selectedNews = useSelector((state) => state.news.selectedNews);

  const formatedDate = moment(selectedNews.date).format('ddd, MMMM DD, YYYY');
  const url = selectedNews.url;

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
                source={{ uri: selectedNews.imageUrl }}
                style={styles.image}
              />
            </View>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>{selectedNews.category}</Text>
              <Text style={styles.headerText}>{formatedDate}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{selectedNews.title}</Text>
              <Text style={styles.description}>{selectedNews.description}</Text>
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

export default CustomModal;
